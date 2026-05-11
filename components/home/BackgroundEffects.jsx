"use client";

import { motion } from "framer-motion";

export default function BackgroundEffects() {

  return (

    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">

      {/* TOP LEFT */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0]
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="
        absolute
        top-[-120px]
        left-[-120px]
        w-[500px]
        h-[500px]
        rounded-full
        bg-[#7C3AED]/10
        blur-3xl
        "
      />

      {/* TOP RIGHT */}
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="
        absolute
        top-[10%]
        right-[-140px]
        w-[520px]
        h-[520px]
        rounded-full
        bg-[#D4A43B]/10
        blur-3xl
        "
      />

      {/* BOTTOM */}
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="
        absolute
        bottom-[-180px]
        left-[20%]
        w-[600px]
        h-[600px]
        rounded-full
        bg-[#22C55E]/5
        blur-3xl
        "
      />

      {/* GRID OVERLAY */}
      <div
        className="
        absolute
        inset-0
        opacity-[0.03]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "80px 80px"
        }}
      />

    </div>

  );

}