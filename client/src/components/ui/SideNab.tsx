"use client";
import { cn } from "@/lib/utils";
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconMenu2, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
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
                    "h-full px-4 py-4 hidden md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[300px] flex-shrink-0",
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

export function SidebarLink({ link, animate: isAnimate, className, ...props }: { link: LinkProps, className?: string, props?: LinkProps, animate: boolean }) {
    const { href, icon, label } = link
    const { isOpen, animate } = useSidebar();
    return (
        <>
            {
                isAnimate ? (
                    <Link
                        href={href}
                        className={
                            cn(
                                "flex items-center relative justify-start gap-2 group group/sidebar py-2",
                                className
                            )
                        }
                        {...props}
                    >
                        <span className="group-hover:bg-sky-800 py-2 px-2 rounded-xl ml-4 group-hover:scale-105 transition duration-150">
                            {icon}
                        </span>

                        <span className="after:content-[''] after:absolute after:rounded-xl after:-left-4 after:top-0 after:w-5 after:h-full after:flex after:justify-center after:items-center after:bg-sky-800 after:opacity-0 after:transition-opacity after:group-hover:opacity-100">

                        </span>

                        <motion.span
                            animate={{
                                display: animate ? (isOpen ? "inline-block" : "none") : "inline-block",
                                opacity: animate ? (isOpen ? 1 : 0) : 1,
                            }}
                            className="text-neutral-700 dark:text-neutral-200 group-hover:bg-sky-800 py-2 px-4 rounded-xl text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block"
                        >
                            {label}
                        </motion.span>
                    </Link >
                ) : (
                    <Link
                        href={href}
                        className={cn(
                            "flex items-center relative justify-start gap-2 group group/sidebar py-2",
                            className
                        )}
                        {...props}
                    >
                        {icon}
                        <motion.span
                            animate={{
                                display: animate ? (isOpen ? "inline-block" : "none") : "inline-block",
                                opacity: animate ? (isOpen ? 1 : 0) : 1,
                            }}
                            className="text-neutral-700 dark:text-neutral-200 group-hover:bg-sky-800 py-2 px-4 rounded-xl text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block"
                        >
                            {label}
                        </motion.span>
                    </Link>
                )
            }
        </>
    );
};