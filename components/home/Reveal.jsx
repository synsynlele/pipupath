"use client";

import { motion } from "framer-motion";

export default function Reveal({

  children,

  delay = 0,

  y = 40,

  x = 0,

  duration = 0.7,

  once = true,

  className = ""

}) {

  return (

    <motion.div

      initial={{
        opacity: 0,
        y,
        x
      }}

      whileInView={{
        opacity: 1,
        y: 0,
        x: 0
      }}

      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}

      viewport={{
        once,
        amount: 0.15
      }}

      className={className}

    >

      {children}

    </motion.div>

  );

}