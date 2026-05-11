"use client";

import {
  motion,
  useMotionValue,
  useSpring
} from "framer-motion";

import {
  useEffect,
  useRef
} from "react";

export default function InteractiveGlow({

  children,

  className = ""

}) {

  const ref = useRef(null);

  const mouseX = useMotionValue(0);

  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 120,
    damping: 20
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 120,
    damping: 20
  });

  useEffect(() => {

    const node = ref.current;

    if(!node) return;

    function handleMove(e){

      const rect = node.getBoundingClientRect();

      mouseX.set(e.clientX - rect.left);

      mouseY.set(e.clientY - rect.top);

    }

    node.addEventListener("mousemove", handleMove);

    return () =>
      node.removeEventListener("mousemove", handleMove);

  }, [mouseX, mouseY]);

  return (

    <div
      ref={ref}
      className={`
      relative
      overflow-hidden
      ${className}
      `}
    >

      {/* GLOW */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY
        }}
        className="
        hidden
        md:block
        pointer-events-none
        absolute
        w-[280px]
        h-[280px]
        rounded-full
        bg-[#D4A43B]/10
        blur-3xl
        -translate-x-1/2
        -translate-y-1/2
        z-0
        "
      />

      {/* CONTENT */}
      <div className="relative z-10">

        {children}

      </div>

    </div>

  );

}