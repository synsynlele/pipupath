"use client";

import { motion } from "framer-motion";

export default function MagneticButton({
  children,
  className = "",
  onClick
}) {

  return (

    <motion.button
      onClick={onClick}
      whileHover={{
        scale: 1.03,
        y: -2
      }}
      whileTap={{
        scale: 0.98
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 18
      }}
      className={className}
    >

      {children}

    </motion.button>

  );

}