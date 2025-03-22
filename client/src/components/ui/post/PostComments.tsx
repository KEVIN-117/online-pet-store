"use client"

import React, { useState, useRef } from "react"
import { motion, useInView } from "motion/react"
import Avvvatars from "avvvatars-react"
import type { Comment } from "@/app/todos/page"

// Componente de línea de tiempo futurista
const TimelineConnector = () => {
    return (
        <div className="absolute left-10 top-0 bottom-0 w-0.5 z-0 hidden sm:block">
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0"
                animate={{
                    opacity: [0.3, 0.7, 0.3],
                    boxShadow: [
                        "0 0 3px rgba(6, 182, 212, 0.3)",
                        "0 0 8px rgba(6, 182, 212, 0.7)",
                        "0 0 3px rgba(6, 182, 212, 0.3)",
                    ],
                }}
                transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                }}
            />
        </div>
    )
}

// Componente de nodo de tiempo
const TimelineNode = ({ active }: { active: boolean }) => {
    return (
        <motion.div
            className="absolute left-10 top-10 w-4 h-4 rounded-full bg-cyan-900 border border-cyan-400 z-10 -translate-x-1/2 hidden sm:block"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{
                scale: active ? [0.8, 1.2, 0.8] : 0.8,
                opacity: active ? 1 : 0.5,
                boxShadow: active
                    ? ["0 0 0px rgba(6, 182, 212, 0.3)", "0 0 10px rgba(6, 182, 212, 0.8)", "0 0 0px rgba(6, 182, 212, 0.3)"]
                    : "none",
            }}
            transition={{
                duration: 2,
                repeat: active ? Number.POSITIVE_INFINITY : 0,
                repeatType: "reverse",
            }}
        >
            <motion.div
                className="absolute inset-0.5 rounded-full bg-cyan-500"
                animate={{
                    opacity: active ? [0.5, 1, 0.5] : 0.5,
                }}
                transition={{
                    duration: 1.5,
                    repeat: active ? Number.POSITIVE_INFINITY : 0,
                    repeatType: "reverse",
                }}
            />
        </motion.div>
    )
}

// Efecto de texto de terminal para el cuerpo del comentario
const TerminalText = ({ text }: { text: string }) => {
    const [displayed, setDisplayed] = useState(false)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })

    React.useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => {
                setDisplayed(true)
            }, 300)
            return () => clearTimeout(timer)
        }
    }, [isInView])

    return (
        <motion.div
            ref={ref}
            className="font-mono text-sm relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.3 }}
        >
            {displayed ? (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-gray-300 leading-relaxed"
                >
                    {text}
                </motion.p>
            ) : (
                <motion.div
                    className="flex items-center space-x-1 text-cyan-400"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                >
                    <span className="text-cyan-500">{">"}</span>
                    <span className="h-4 w-2 bg-cyan-500 animate-pulse" />
                </motion.div>
            )}
        </motion.div>
    )
}

// Componente principal de comentarios
export const FuturisticPostComments: React.FC<{ comments: Comment[] }> = ({ comments }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, { once: true, amount: 0.1 })

    return (
        <motion.div
            ref={containerRef}
            className="space-y-8 relative py-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 30,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <motion.h2
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400"
                style={{ textShadow: "0 0 15px rgba(6, 182, 212, 0.5)" }}
                initial={{ opacity: 0, y: -20 }}
                animate={{
                    opacity: isInView ? 1 : 0,
                    y: isInView ? 0 : -20,
                }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Neural Feedback
            </motion.h2>

            {/* Línea de tiempo futurista */}
            <TimelineConnector />

            {/* Lista de comentarios */}
            <div className="space-y-10 relative">
                {comments.map((comment, index) => (
                    <div key={comment.id} className="relative">
                        <TimelineNode active={activeIndex === index} />
                        <FuturisticPostCommentCard
                            comment={comment}
                            index={index}
                            isActive={activeIndex === index}
                            onHover={(isHovered) => setActiveIndex(isHovered ? index : null)}
                        />
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

// Componente de tarjeta de comentario individual
export const FuturisticPostCommentCard: React.FC<{
    comment: Comment
    index: number
    isActive: boolean
    onHover: (isHovered: boolean) => void
}> = ({ comment: { body, email, id, name }, index, isActive, onHover }) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(cardRef, { once: true, amount: 0.3 })

    // Generar un color aleatorio pero consistente basado en el ID
    const getColorScheme = () => {
        const schemes = [
            { border: "cyan-500", glow: "cyan", gradient: "from-cyan-500 to-blue-600" },
            { border: "indigo-500", glow: "indigo", gradient: "from-indigo-500 to-violet-600" },
            { border: "fuchsia-500", glow: "fuchsia", gradient: "from-fuchsia-500 to-purple-600" },
            { border: "blue-500", glow: "blue", gradient: "from-blue-500 to-indigo-600" },
        ]
        return schemes[id % schemes.length]
    }

    const colorScheme = getColorScheme()

    return (
        <motion.div
            ref={cardRef}
            className={`relative bg-black/60 backdrop-filter backdrop-blur-lg rounded-xl p-5 shadow-lg 
                 border-2 transition-all duration-300 transform-gpu overflow-hidden
                 sm:ml-8 md:ml-10`}
            initial={{
                opacity: 0,
                x: -20,
                borderColor: "rgb(55, 65, 81, 0.5)", // gray-700 with opacity
            }}
            animate={{
                opacity: isInView ? 1 : 0,
                x: isInView ? 0 : -20,
            }}
            transition={{
                duration: 0.5,
                delay: index * 0.1 + 0.3,
                borderColor: { duration: 0.3 },
            }}
            onHoverStart={() => onHover(true)}
            onHoverEnd={() => onHover(false)}
            style={{
                boxShadow: isActive
                    ? `0 0 20px rgba(var(--${colorScheme.glow}-500-rgb), 0.3), inset 0 0 8px rgba(var(--${colorScheme.glow}-500-rgb), 0.2)`
                    : "none",
            }}
        >

            {/* Efecto de resplandor en el borde */}
            <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{
                    opacity: isActive ? 0.5 : 0,
                    boxShadow: isActive ? `inset 0 0 15px rgba(var(--${colorScheme.glow}-500-rgb), 0.3)` : "none",
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Línea de energía superior */}
            <motion.div
                className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${colorScheme.gradient}`}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                    scaleX: isActive ? 1 : 0,
                    opacity: isActive ? 1 : 0,
                }}
                transition={{ duration: 0.4 }}
            />

            {/* Contenido del comentario */}
            <div className="relative z-10">
                {/* Cabecera con avatar y datos del usuario */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                    {/* Avatar con efectos */}
                    <motion.div className="relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        {/* Halo detrás del avatar */}
                        <motion.div
                            className={`absolute -inset-1 rounded-full bg-gradient-to-r ${colorScheme.gradient} opacity-70`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: isActive ? [0.4, 0.7, 0.4] : 0,
                                scale: isActive ? [0.9, 1, 0.9] : 0.8,
                                boxShadow: isActive
                                    ? [
                                        `0 0 5px rgba(var(--${colorScheme.glow}-500-rgb), 0.3)`,
                                        `0 0 15px rgba(var(--${colorScheme.glow}-500-rgb), 0.6)`,
                                        `0 0 5px rgba(var(--${colorScheme.glow}-500-rgb), 0.3)`,
                                    ]
                                    : "none",
                            }}
                            transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                            }}
                        />

                        {/* Avatar */}
                        <Avvvatars
                            value={email + name + id}
                            style="shape"
                            radius={50}
                            border={true}
                            borderSize={3}
                            borderColor={`#${isActive ? "38bdf8" : "4b5563"}`}
                            size={50}
                            shadow={true}
                        />

                        {/* Indicador de estado */}
                        <motion.div
                            className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-green-500 border border-black"
                            animate={{
                                scale: [1, 1.2, 1],
                                boxShadow: [
                                    "0 0 0px rgba(34, 197, 94, 0.5)",
                                    "0 0 8px rgba(34, 197, 94, 0.8)",
                                    "0 0 0px rgba(34, 197, 94, 0.5)",
                                ],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "loop",
                            }}
                        />
                    </motion.div>

                    {/* Información del usuario */}
                    <div className="flex flex-col">
                        <motion.h3
                            className="font-medium text-white"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{
                                opacity: isInView ? 1 : 0,
                                x: isInView ? 0 : -10,
                                textShadow: isActive ? `0 0 8px rgba(var(--${colorScheme.glow}-500-rgb), 0.5)` : "none",
                            }}
                            transition={{
                                duration: 0.4,
                                delay: index * 0.1 + 0.4,
                                textShadow: { duration: 0.3 },
                            }}
                        >
                            {name}
                        </motion.h3>

                        <motion.div
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{
                                opacity: isInView ? 1 : 0,
                                x: isInView ? 0 : -10,
                            }}
                            transition={{
                                duration: 0.4,
                                delay: index * 0.1 + 0.5,
                            }}
                        >
                            <span className={`text-sm text-${colorScheme.glow}-400`}>{email}</span>

                            {/* ID con estilo de código */}
                            <span className="text-xs px-1.5 py-0.5 rounded bg-gray-800/70 text-gray-400 font-mono">ID:{id}</span>
                        </motion.div>
                    </div>

                    {/* Timestamp futurista */}
                    <motion.div
                        className="ml-auto hidden sm:flex items-center gap-1.5 text-xs text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isInView ? 0.7 : 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.6 }}
                    >
                        <div className={`w-1.5 h-1.5 rounded-full bg-${colorScheme.glow}-500 animate-pulse`} />
                        <span className="font-mono">{new Date().toISOString().split("T")[0]}</span>
                    </motion.div>
                </div>

                {/* Cuerpo del comentario con efecto de terminal */}
                <div className="pl-0 sm:pl-2 mt-3">
                    <TerminalText text={body} />
                </div>

                {/* Acciones del comentario */}
                <motion.div
                    className="flex justify-end mt-4 pt-2 border-t border-gray-800/50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                        opacity: isInView ? 0.8 : 0,
                        y: isInView ? 0 : 10,
                    }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.7 }}
                >
                    <div className="flex gap-3">
                        {["Reply", "Share", "Report"].map((action, i) => (
                            <motion.button
                                key={action}
                                className={`text-xs text-${colorScheme.glow}-400 hover:text-${colorScheme.glow}-300 transition-colors`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 10 }}
                                transition={{ duration: 0.3, delay: index * 0.1 + 0.8 + i * 0.1 }}
                            >
                                {action}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

