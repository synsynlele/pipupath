"use client";

import { motion }
from "framer-motion";

import type {
  ReactNode,
} from "react";

import type {
  HTMLMotionProps,
} from "framer-motion";

interface GlowButtonProps
  extends HTMLMotionProps<"button"> {

  children:
    ReactNode;
}

export default function GlowButton({

  children,

  className = "",

  disabled = false,

  ...props

}: GlowButtonProps) {

  return (

    <motion.button

      whileTap={
        disabled
          ? {}
          : { scale: 0.98 }
      }

      disabled={disabled}

      className={`
        relative
        overflow-hidden
        rounded-2xl
        bg-gradient-to-r
        from-blue-500
        to-violet-500
        px-6
        py-4
        text-base
        font-semibold
        text-white
        shadow-lg
        shadow-blue-500/20
        transition-all
        hover:scale-[1.01]
        disabled:cursor-not-allowed
        disabled:opacity-50

        ${className}
      `}

      {...props}
    >

      <span className="relative z-10">

        {children}

      </span>

      <div
        className="
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-300
          hover:opacity-100
        "
      >

        <div
          className="
            absolute
            inset-0
            bg-white/10
          "
        />

      </div>

    </motion.button>
  );
}