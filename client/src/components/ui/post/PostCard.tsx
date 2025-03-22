"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, useMotionValue, useTransform, AnimatePresence } from "motion/react"

// Definición de la interfaz Post
interface Post {
    id: number
    title: string
    body: string
    userId: number
    commentsCount: number
}

// Componente de líneas de circuito
const CircuitLines = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Líneas horizontales */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={`h-${i}`}
                    className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
                    style={{ top: `${(i + 1) * 20}%` }}
                    animate={{
                        opacity: [0.2, 0.5, 0.2],
                        scaleX: [0.85, 1, 0.85],
                    }}
                    transition={{
                        duration: 4 + i,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                    }}
                />
            ))}

            {/* Líneas verticales */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={`v-${i}`}
                    className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-purple-500 to-transparent"
                    style={{ left: `${(i + 1) * 25}%` }}
                    animate={{
                        opacity: [0.2, 0.5, 0.2],
                        scaleY: [0.85, 1, 0.85],
                    }}
                    transition={{
                        duration: 5 + i,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        delay: i * 0.5,
                    }}
                />
            ))}
        </div>
    )
}

// Componente de botón futurista
const FuturisticButton = ({ children, href }: { children: React.ReactNode; href: string }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Link href={href}>
            <motion.div
                className="relative inline-flex items-center px-4 py-2 rounded-lg overflow-hidden group"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
            >
                {/* Fondo del botón */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-800 to-purple-900 rounded-lg z-0"
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: isHovered ? 1 : 0.8 }}
                />

                {/* Efecto de brillo */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-lg opacity-0 z-10"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                        opacity: isHovered ? [0, 0.3, 0] : 0,
                        scale: isHovered ? [0.9, 1.1, 0.9] : 0.9,
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                        repeatType: "loop",
                    }}
                />

                {/* Borde brillante */}
                <motion.div
                    className="absolute inset-0 rounded-lg border border-indigo-400 z-20"
                    initial={{ opacity: 0.3 }}
                    animate={{
                        opacity: isHovered ? [0.3, 0.8, 0.3] : 0.3,
                        boxShadow: isHovered
                            ? [
                                "0 0 5px rgba(99, 102, 241, 0.3), inset 0 0 5px rgba(99, 102, 241, 0.3)",
                                "0 0 10px rgba(99, 102, 241, 0.5), inset 0 0 10px rgba(99, 102, 241, 0.5)",
                                "0 0 5px rgba(99, 102, 241, 0.3), inset 0 0 5px rgba(99, 102, 241, 0.3)",
                            ]
                            : "none",
                    }}
                    transition={{
                        opacity: { duration: 1.5, repeat: isHovered ? Number.POSITIVE_INFINITY : 0, repeatType: "loop" },
                        boxShadow: { duration: 1.5, repeat: isHovered ? Number.POSITIVE_INFINITY : 0, repeatType: "loop" },
                    }}
                />

                {/* Texto */}
                <motion.span
                    className="relative z-30 text-sm font-medium text-white"
                    animate={{
                        textShadow: isHovered ? "0 0 8px rgba(255, 255, 255, 0.5)" : "0 0 0px rgba(255, 255, 255, 0)",
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.span>
            </motion.div>
        </Link>
    )
}

// Componente principal de la tarjeta
export const PostCard: React.FC<{ post: Post; isLink: boolean }> = ({
    post: { body, commentsCount, id, title, userId },
    isLink,
}) => {
    const [isHovered, setIsHovered] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Efecto de seguimiento del ratón para el brillo
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            mouseX.set(x)
            mouseY.set(y)
        }
    }

    // Transformar la posición del ratón para el efecto de brillo
    const spotlightX = useTransform(mouseX, (val) => {
        if (!cardRef.current) return "50%"
        return `${(val / cardRef.current.clientWidth) * 100}%`
    })

    const spotlightY = useTransform(mouseY, (val) => {
        if (!cardRef.current) return "50%"
        return `${(val / cardRef.current.clientHeight) * 100}%`
    })

    // Variantes para las animaciones
    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.9,
            rotateX: 10,
        },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            transition: {
                type: "spring",
                bounce: 0.3,
                duration: 0.8,
                delayChildren: 0.3,
                staggerChildren: 0.1,
            },
        },
        hover: {
            scale: 1.02,
            rotateX: 0,
            boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2), 0 0 20px rgba(79, 70, 229, 0.4)",
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 0.5,
            },
        },
    }

    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                bounce: 0.3,
                duration: 0.6,
            },
        },
    }

    // Renderizado condicional basado en isLink
    const renderCard = () => (
        <motion.div
            ref={cardRef}
            className={`relative bg-black/70 backdrop-filter backdrop-blur-xl rounded-xl p-6 overflow-hidden
                 border-2 transition-all duration-300 transform-gpu
                 ${isHovered ? "border-indigo-500/70" : "border-gray-700/50"}`}
            variants={cardVariants}
            // initial="hidden"
            // whileInView="show"
            whileHover="hover"
            viewport={{ once: false, amount: 0.3 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            style={{
                boxShadow: isHovered
                    ? "0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(79, 70, 229, 0.4), inset 0 0 10px rgba(79, 70, 229, 0.2)"
                    : "0 10px 20px rgba(0, 0, 0, 0.2)",
            }}
        >
            {/* Efecto de spotlight que sigue al cursor */}
            <motion.div
                className="absolute inset-0 opacity-0 bg-gradient-radial from-indigo-500/20 to-transparent rounded-xl pointer-events-none"
                style={{
                    opacity: isHovered ? 0.7 : 0,
                    background: `radial-gradient(circle at ${spotlightX} ${spotlightY}, rgba(99, 102, 241, 0.15), transparent 70%)`,
                }}
                transition={{ duration: 0.2 }}
            />

            {/* Elementos decorativos futuristas */}
            <CircuitLines />

            {/* Contenido de la tarjeta */}
            <div className="relative z-10">
                {/* Título con efecto de glitch */}
                <motion.div variants={contentVariants} className="mb-4">
                    <AnimatePresence mode="wait">
                        <motion.h1
                            className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                textShadow: "0 0 10px rgba(79, 70, 229, 0.5)",
                            }}
                        >
                            {title}
                        </motion.h1>
                    </AnimatePresence>
                </motion.div>

                {/* Metadatos */}
                <motion.div variants={contentVariants} className="flex items-center mb-4 space-x-3">
                    <div className="px-2 py-1 text-xs bg-gray-800/70 rounded-md border border-gray-700/50 text-gray-400">
                        Post ID: {id}
                    </div>
                    <div className="px-2 py-1 text-xs bg-gray-800/70 rounded-md border border-gray-700/50 text-gray-400">
                        User ID: {userId}
                    </div>
                    <motion.div
                        className="ml-auto h-2 w-2 rounded-full bg-cyan-500"
                        animate={{
                            scale: [1, 1.2, 1],
                            boxShadow: [
                                "0 0 0px rgba(6, 182, 212, 0.5)",
                                "0 0 10px rgba(6, 182, 212, 0.8)",
                                "0 0 0px rgba(6, 182, 212, 0.5)",
                            ],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                        }}
                    />
                </motion.div>

                {/* Cuerpo del post */}
                <motion.div variants={contentVariants} className="relative">
                    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-indigo-500/0 via-indigo-500/30 to-indigo-500/0" />
                    <p className="text-gray-300 whitespace-pre-line mb-6 pl-3 text-sm leading-relaxed">{body}</p>
                </motion.div>

                {/* Pie de la tarjeta */}
                <motion.div
                    variants={contentVariants}
                    className="flex items-center justify-between mt-6 pt-4 border-t border-gray-800/50"
                >
                    {/* Contador de comentarios */}
                    <div className="flex items-center space-x-2">
                        <motion.div className="relative flex items-center" whileHover={{ scale: 1.05 }}>
                            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                />
                            </svg>
                            <motion.span
                                className="ml-2 text-sm text-indigo-300"
                                animate={{
                                    textShadow: isHovered ? "0 0 8px rgba(99, 102, 241, 0.5)" : "none",
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                {commentsCount}
                            </motion.span>

                            {/* Pulso de notificación */}
                            <motion.div
                                className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.7, 1, 0.7],
                                    boxShadow: [
                                        "0 0 0px rgba(99, 102, 241, 0.5)",
                                        "0 0 10px rgba(99, 102, 241, 0.8)",
                                        "0 0 0px rgba(99, 102, 241, 0.5)",
                                    ],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "loop",
                                }}
                            />
                        </motion.div>
                    </div>

                    {/* Botón de acción */}
                    {isLink ? (
                        <FuturisticButton href={`/todo/${id}`}>View Post</FuturisticButton>
                    ) : (
                        <FuturisticButton href="/fake">View Error Page</FuturisticButton>
                    )}
                </motion.div>
            </div>
        </motion.div>
    )

    // Renderizado final
    return <div className="relative">{renderCard()}</div>
}

