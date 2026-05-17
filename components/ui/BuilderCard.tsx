"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

interface Props {
  children: ReactNode
  className?: string
}

export default function BuilderCard({
  children,
  className = "",
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        rounded-[28px]
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        shadow-2xl
        p-5
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}