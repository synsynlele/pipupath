"use client";

import { motion } from "framer-motion";

export default function LogoMark({

  size = "md",

  animated = true,

  showText = true

}) {

  const sizes = {

    sm: {
      wrapper: "w-10 h-10",
      text: "text-lg"
    },

    md: {
      wrapper: "w-12 h-12",
      text: "text-xl"
    },

    lg: {
      wrapper: "w-16 h-16",
      text: "text-2xl"
    }

  };

  const current = sizes[size];

  return (

    <div className="flex items-center gap-4">

      {/* SYMBOL */}
      <motion.div

        animate={
          animated
          ? {
              rotate: [0, 2, -2, 0]
            }
          : {}
        }

        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}

        className={`
        relative
        ${current.wrapper}
        rounded-2xl
        overflow-hidden
        shadow-[0_0_40px_rgba(124,58,237,0.25)]
        `}
      >

        {/* BACKGROUND */}
        <div
          className="
          absolute
          inset-0
          bg-gradient-to-br
          from-[#7C3AED]
          via-[#D4A43B]
          to-[#22C55E]
          "
        />

        {/* INNER GLOW */}
        <div
          className="
          absolute
          inset-[1px]
          rounded-2xl
          bg-[#050816]
          "
        />

        {/* CENTER SHAPE */}
        <div
          className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          "
        >

          <motion.div

            animate={
              animated
              ? {
                  scale: [1, 1.06, 1]
                }
              : {}
            }

            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}

            className="
            relative
            w-[55%]
            h-[55%]
            rounded-xl
            bg-gradient-to-br
            from-[#7C3AED]
            via-[#D4A43B]
            to-[#22C55E]
            "
          >

            {/* INNER CORE */}
            <div
              className="
              absolute
              inset-[2px]
              rounded-[10px]
              bg-[#050816]
              "
            />

            {/* CENTER DOT */}
            <div
              className="
              absolute
              top-1/2
              left-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-2
              h-2
              rounded-full
              bg-[#D4A43B]
              shadow-[0_0_12px_rgba(212,164,59,0.8)]
              "
            />

          </motion.div>

        </div>

      </motion.div>

      {/* TEXT */}
      {showText && (

        <div>

          <div
            className={`
            font-black
            tracking-tight
            ${current.text}
            `}
          >

            PipuPath

          </div>

          <div className="text-xs text-white/40">

            HumanOS Infrastructure

          </div>

        </div>

      )}

    </div>

  );

}