"use client";

import { motion } from "framer-motion";

export default function StaggerContainer({

  children,

  stagger = 0.08,

  className = ""

}) {

  return (

    <motion.div

      initial="hidden"

      whileInView="show"

      viewport={{
        once: true,
        amount: 0.1
      }}

      variants={{

        hidden: {},

        show: {
          transition: {
            staggerChildren: stagger
          }
        }

      }}

      className={className}

    >

      {children}

    </motion.div>

  );

}