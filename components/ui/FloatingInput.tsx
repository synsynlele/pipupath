"use client"

import { TextareaHTMLAttributes } from "react"

interface Props
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export default function FloatingInput({
  className = "",
  ...props
}: Props) {
  return (
    <textarea
      className={`
        min-h-[180px]
        w-full
        rounded-[28px]
        border border-white/10
        bg-white/5
        p-5
        text-base
        text-white
        placeholder:text-slate-400
        outline-none
        backdrop-blur-xl
        transition-all
        focus:border-blue-400/40
        focus:bg-white/[0.07]
        ${className}
      `}
      {...props}
    />
  )
}