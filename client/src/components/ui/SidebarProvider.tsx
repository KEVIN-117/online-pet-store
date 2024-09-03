/* eslint-disable @next/next/no-img-element */
"use client";
import { cn } from "@/lib/utils"
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState } from "react"
import { Sidebar, SidebarBody, SidebarLink } from "./SideNab";
import Link from "next/link";
import { Logo as LogoEthereum } from "@/components/icons/Logo";

export function SidebarProviderDemo({ children }: { children?: React.ReactNode }) {
    const links = [
        {
            label: "Dashboard",
            href: "#",
            icon: (
                <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Profile",
            href: "#",
            icon: (
                <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Settings",
            href: "#",
            icon: (
                <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Logout",
            href: "#",
            icon: (
                <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
    ];
    const [open, setOpen] = useState(false)
    return (
        <div
            className={cn(
                "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
                "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
            )}
        >
            <Sidebar actions={{
                animate: true,
                isOpen: open,
                setOpen: setOpen
            }} >
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        <div className='fill-current flex justify-center items-center'>
                            <Logo open={open} />
                        </div>
                        <div className="mt-8 flex flex-col gap-2">
                            {
                                links.map((link, index) => (
                                    <SidebarLink
                                        key={index}
                                        link={link}
                                        animate={true}
                                    />
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: "Dashboard",
                                href: "#",
                                icon: (
                                    <img
                                        src="https://assets.aceternity.com/manu.png"
                                        className="h-7 w-7 flex-shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                )
                            }}
                            animate={false}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
            <Dashboard>
                {children}
            </Dashboard>
        </div>
    )
}


export const Logo = ({ open }: { open: boolean }) => {
    return (
        <Link
            href="#"
            className="font-normal flex flex-col space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <LogoEthereum width={!open ? 80 : 100} height={!open ? 80 : 100} />
            {open && <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black dark:text-white whitespace-pre"
            >
                Acet Labs
            </motion.span>}
        </Link>
    );
};


function Dashboard({ children }: { children?: React.ReactNode }) {
    return (
        <div className="flex flex-1">
            <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
                {children}
            </div>
        </div>
    );
} 