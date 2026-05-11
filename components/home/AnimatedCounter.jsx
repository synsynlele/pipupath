"use client";

import { motion, useInView, animate } from "framer-motion";

import { useEffect, useRef, useState } from "react";

export default function AnimatedCounter({
  from = 0,
  to = 100,
  duration = 2,
  suffix = "",
  prefix = ""
}) {

  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true
  });

  const [count, setCount] = useState(from);

  useEffect(() => {

    if(!isInView) return;

    const controls = animate(from, to, {
      duration,
      onUpdate(value) {
        setCount(Math.floor(value));
      }
    });

    return () => controls.stop();

  }, [isInView, from, to, duration]);

  return (

    <motion.span ref={ref}>

      {prefix}

      {count.toLocaleString()}

      {suffix}

    </motion.span>

  );

}