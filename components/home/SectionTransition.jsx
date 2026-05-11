"use client";

import { motion } from "framer-motion";

export default function SectionTransition({

  flip = false

}) {

  return (

    <div className="relative h-32 overflow-hidden">

      {/* MAIN GRADIENT */}
      <motion.div
        animate={{
          x: [0, 40, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`
        absolute
        inset-0
        blur-3xl
        opacity-40

        ${
          flip
          ? "bg-gradient-to-r from-[#7C3AED]/10 via-[#D4A43B]/10 to-[#22C55E]/10"
          : "bg-gradient-to-r from-[#22C55E]/10 via-[#7C3AED]/10 to-[#D4A43B]/10"
        }
        `}
      />

      {/* FADE */}
      <div
        className="
        absolute
        inset-0
        bg-gradient-to-b
        from-transparent
        via-[#050816]/40
        to-transparent
        "
      />

      {/* CENTER LINE */}
      <div className="absolute inset-0 flex items-center justify-center">

        <motion.div
          animate={{
            width: ["120px", "180px", "120px"]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="
          h-px
          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent
          "
        />

      </div>

    </div>

  );

}