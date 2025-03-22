"use client";
import { cn } from "@/lib/utils";
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconMenu2, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, JSX, Dispatch, SetStateAction, createContext, useContext, use, useState, ComponentProps } from "react"

interface LinkProps {
    href: string;
    label: string;
    icon: JSX.Element | ReactNode;
}

interface SidebarContextProps {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
    animate: boolean;
}


const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

function useSidebar() {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within SidebarProvider');
    }
    return context;
}


export function SidebarProvider({ children, actions }: { children: ReactNode, actions: SidebarContextProps }) {
    const { animate, isOpen, setOpen } = actions;
    const [openState, setOpenState] = useState<boolean>(false);

    const open = isOpen || openState;
    const setOpenAction = setOpen || setOpenState;
    const values = { isOpen: open, setOpen: setOpenAction, animate };
    return (
        <SidebarContext.Provider
            value={values}
        >
            {children}
        </SidebarContext.Provider>
    )
}

export function Sidebar({ children, actions }: { children: ReactNode, actions: SidebarContextProps }) {

    return (
        <SidebarProvider actions={actions}>
            {children}
        </SidebarProvider>
    )
}


export function SidebarBody(props: ComponentProps<typeof motion.div>) {
    return (
        <>
            <DesktopSidebar {...props} />
            <MobileSidebar {...(props as ComponentProps<"div">)} />
        </>
    )
}



export function DesktopSidebar({ className, children, ...props }: ComponentProps<typeof motion.div>) {
    const { isOpen, setOpen } = useSidebar();
    return (
        <>
            <motion.button
                className={`absolute z-50 h-10 px-2 py-2 my-2 rounded-xl bg-stone-900 md:flex justify-center items-center border border-blue-800 hidden ${isOpen ? "left-60" : "left-16"} transition-all`}
            >
                {isOpen && (<IconArrowNarrowLeft
                    className="text-neutral-800 dark:text-neutral-200"
                    onClick={() => setOpen(!isOpen)}
                />)}
                {!isOpen && (<IconArrowNarrowRight
                    className="text-neutral-800 dark:text-neutral-200"
                    onClick={() => setOpen(!isOpen)}
                />)}
            </motion.button>
            <motion.div
                className={cn(
                    "h-full px-4 py-4 hidden md:flex md:flex-col bg-gradient-to-br from-indigo-950 via-slate-800 to-slate-950 w-[300px] flex-shrink-0",
                    className
                )}
                animate={{
                    width: (isOpen ? "300px" : "80px")
                }}

                {...props}
            >
                {children}
            </motion.div>
        </>
    )
}


export function MobileSidebar({ className, children, ...props }: ComponentProps<"div">) {
    const { isOpen, setOpen } = useSidebar();
    return (
        <>
            <div
                className={cn(
                    "h-10 px-4 py-4 flex flex-row md:hidden  items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full"
                )}
                {...props}
            >
                <div className="flex justify-end z-20 w-full">
                    <IconMenu2
                        className="text-neutral-800 dark:text-neutral-200"
                        onClick={() => setOpen(!isOpen)}
                    />
                </div>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ x: "-100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "-100%", opacity: 0 }}
                            transition={{
                                duration: 0.3,
                                ease: "easeInOut"
                            }}
                            className={
                                cn(
                                    "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between",
                                    className
                                )
                            }
                        >
                            <div
                                className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
                                onClick={() => setOpen(!open)}
                            >
                                <IconX />
                            </div>
                            {children}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    )

}

export function SidebarLink({
    link,
    animate: isAnimate,
    className,
    ...props
}: {
    link: LinkProps
    className?: string
    props?: any
    animate: boolean
}) {
    const { href, icon, label } = link
    const { isOpen, animate } = useSidebar()
    const pathname = usePathname()
    const isActive = pathname === href

    // Variants for the icon container animation
    const iconContainerVariants = {
        hover: {
            scale: 1.1,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
        tap: {
            scale: 0.9,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
    }

    // Variants for the text animation
    const textVariants = {
        closed: {
            opacity: 0,
            width: 0,
            x: -10,
            transition: {
                duration: 0.2,
            },
        },
        open: {
            opacity: 1,
            width: "auto",
            x: 0,
            transition: {
                duration: 0.3,
                delay: 0.1,
            },
        },
    }

    // Variants for the active indicator
    const activeIndicatorVariants = {
        initial: {
            opacity: 0,
            height: 0,
        },
        animate: {
            opacity: 1,
            height: "60%",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
            },
        },
    }

    // Variants for the hover background
    const hoverBgVariants = {
        initial: {
            opacity: 0,
            scale: 0.85,
        },
        hover: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.2,
            },
        },
    }

    return (
        <motion.div className={cn("relative mx-2 my-1 group", className)} whileHover="hover" whileTap="tap">
            {/* Active indicator */}
            {isActive && (
                <motion.div
                    className="absolute left-0 top-1/2 w-1.5 bg-primary rounded-r-full -translate-y-1/2"
                    layoutId="activeIndicator"
                    initial="initial"
                    animate="animate"
                    variants={activeIndicatorVariants}
                />
            )}

            {/* Hover background */}
            <motion.div
                className={cn(
                    "absolute inset-0 rounded-xl",
                    isActive ? "bg-primary/10" : "bg-slate-700/30 dark:bg-slate-800/40",
                )}
                initial="initial"
                variants={hoverBgVariants}
            />

            <Link
                href={href}
                className={cn(
                    "flex items-center relative justify-start gap-3 py-2.5 px-3 rounded-xl z-10",
                    isActive ? "text-primary" : "text-slate-300 hover:text-white",
                )}
                {...props}
            >
                {/* Icon container with animations */}
                <motion.div
                    className={cn(
                        "flex items-center justify-center h-9 w-9 rounded-lg",
                        isActive
                            ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                            : "text-slate-300 group-hover:text-white",
                    )}
                    variants={iconContainerVariants}
                >
                    {icon}
                </motion.div>

                {/* Label with animations */}
                <motion.div
                    className="overflow-hidden"
                    initial={isOpen ? "open" : "closed"}
                    animate={animate ? (isOpen ? "open" : "closed") : "open"}
                    variants={textVariants}
                >
                    <motion.span
                        className={cn(
                            "text-sm font-medium whitespace-nowrap",
                            isActive ? "text-primary" : "text-slate-300 group-hover:text-white",
                        )}
                    >
                        {label}
                    </motion.span>
                </motion.div>

                {/* Subtle glow effect for active items */}
                {isActive && (
                    <motion.div
                        className="absolute inset-0 rounded-xl bg-primary/5 blur-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                    />
                )}
            </Link>

            {/* Subtle particle effect on hover */}
            <motion.div
                className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
            >
                {isActive && (
                    <div className="relative">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute h-1 w-1 rounded-full bg-primary"
                                initial={{
                                    x: 0,
                                    y: 0,
                                    opacity: 0.7,
                                }}
                                animate={{
                                    x: Math.random() * 20 - 10,
                                    y: Math.random() * 20 - 10,
                                    opacity: 0,
                                    scale: Math.random() * 0.5 + 0.5,
                                }}
                                transition={{
                                    duration: Math.random() * 1 + 0.5,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "loop",
                                    delay: i * 0.2,
                                }}
                            />
                        ))}
                    </div>
                )}
            </motion.div>
        </motion.div>
    )
}

