"use client"

import { useState } from "react"
import type { TreeItem } from "./types"
import TreeMenu from "./"
import { motion, AnimatePresence } from "motion/react"
import { ChevronRight, Folder, FolderOpen, File, FileJson, FileImage, ChartBarBig, Music, Video } from "lucide-react"

export function TreeNode({ treeData, level = 0 }: { treeData: TreeItem; level?: number }) {
    const [open, setOpen] = useState(false)

    const hasChildren = (item: TreeItem) => item.children && item.children.length > 0

    const handleClick = () => setOpen((prev) => !prev)

    const getIcon = () => {
        if (hasChildren(treeData)) {
            return open ? <FolderOpen className="size-4 text-amber-500" /> : <Folder className="size-4 text-amber-400" />
        }

        // pdf, json, js, ts, jsx, tsx, css, scss, html, htm, md, txt, xml, yml, yaml, sh, bash, zsh, fish, ps1, bat, cmd, php, py, rb, java, swift, go, c, cpp, h, hpp, cs, sql, pl, pm, t, r, png, jpg
        const regexFileExtencions = /\.(pdf|json|js|ts|jsx|tsx|css|scss|html|htm|md|txt|xml|yml|yaml|sh|bash|zsh|fish|ps1|bat|cmd|php|py|rb|java|swift|go|c|cpp|h|hpp|cs|sql|pl|pm|t|r|png|jpg|xlsx|csv|mp3|mp4|wav|avi|mov|mkv|flv|wmv|webm|zip|rar|7z|tar|gz|tgz|bz2|iso|apk|exe|dmg|deb|rpm|bin|jar|war|ear|dll|lib|so|a|o|obj|class|jar|war|ear|dll|lib|so|a|o|obj|class)$/i;
        const extencion = (treeData.label.includes('.') && treeData.label.match(regexFileExtencions)?.[1]) ?? null;

        switch (extencion) {
            case "pdf":
                return <File className="size-4 text-red-500" />;
            case "json":
                return <FileJson className="size-4 text-blue-500" />;
            case "js":
                return <FileJson className="size-4 text-yellow-500" />;
            // image types
            case "png":
                return <FileImage className="size-4 text-green-500" />;
            case "jpg":
                return <FileImage className="size-4 text-green-500" />;

            // excel types
            case "xlsx":
                return <ChartBarBig className="size-4 text-green-500" />;
            case "xls":
                return <ChartBarBig className="size-4 text-green-500" />;
            case "csv":
                return <ChartBarBig className="size-4 text-green-500" />;
            case "mp3":
                return <Music className="size-4 text-green-500" />;
            case "wav":
                return <Music className="size-4 text-green-500" />;
            case "avi":
                return <Music className="size-4 text-green-500" />;
            case "mov":
                return <Music className="size-4 text-green-500" />;
            case "mkv":
                return <Video className="size-4 text-green-500" />;
            case "mp4":
                return <Video className="size-4 text-green-500" />;
            default:
                return <File className="size-4 text-blue-400" />
        }
    }

    return (
        <li className="relative">
            <div
                className={`flex items-center py-1.5 px-2 rounded-md transition-colors ${hasChildren(treeData) ? "cursor-pointer" : "cursor-default"}hover:bg-gray-100 dark:hover:bg-gray-800 ${level === 0 ? "font-medium" : ""}
        `}
                onClick={hasChildren(treeData) ? handleClick : undefined}
            >
                <div className="flex items-center mr-1.5 text-gray-500">
                    {hasChildren(treeData) ? (
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: open ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="mr-1"
                        >
                            <ChevronRight className="size-4" />
                        </motion.div>
                    ) : (
                        <div className="w-5" />
                    )}
                </div>

                <div className="flex items-center gap-2">
                    {getIcon()}
                    <span className="text-sm text-gray-700 dark:text-gray-200">{treeData.label}</span>
                </div>
            </div>

            <AnimatePresence>
                {open && hasChildren(treeData) && (
                    <motion.ul
                        className="pl-6 border-l border-gray-200 dark:border-gray-700 ml-2.5 mt-1"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: "auto",
                            opacity: 1,
                            transition: {
                                height: {
                                    duration: 0.3,
                                },
                                opacity: {
                                    duration: 0.3,
                                    delay: 0.1,
                                },
                            },
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                                height: {
                                    duration: 0.3,
                                },
                                opacity: {
                                    duration: 0.2,
                                },
                            },
                        }}
                    >
                        {treeData.children && <TreeMenu treeData={treeData.children} level={level + 1} />}
                    </motion.ul>
                )}
            </AnimatePresence>
        </li>
    )
}

