"use client";

import { motion } from "framer-motion";

import {
  ArrowRight,
  Sparkles,
  Brain,
  Target,
  ShieldCheck
} from "lucide-react";

export default function FinalCTA() {

  return (

    <section
      className="
      relative
      py-24
      md:py-32
      bg-[#050816]
      text-white
      overflow-hidden
      "
    >

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">

        {/* MAIN GLOW */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.25, 0.4, 0.25]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[500px]
          md:w-[900px]
          h-[500px]
          md:h-[900px]
          rounded-full
          bg-gradient-to-r
          from-[#7C3AED]/20
          via-[#D4A43B]/15
          to-[#22C55E]/15
          blur-3xl
          "
        />

      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-6">

        {/* PANEL */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="
          relative
          overflow-hidden
          rounded-[32px]
          md:rounded-[48px]
          border
          border-white/10
          bg-gradient-to-br
          from-white/[0.06]
          to-white/[0.02]
          backdrop-blur-2xl
          p-6
          sm:p-8
          md:p-16
          "
        >

          {/* TOP BADGE */}
          <div
            className="
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            border
            border-white/10
            bg-white/5
            text-xs
            sm:text-sm
            text-white/70
            "
          >

            <Sparkles
              size={15}
              className="text-[#D4A43B]"
            />

            Adaptive Human Infrastructure

          </div>

          {/* HEADLINE */}
          <h2
            className="
            mt-8
            text-4xl
            sm:text-5xl
            md:text-7xl
            font-black
            leading-[0.95]
            tracking-tight
            max-w-5xl
            "
          >

            Build A Life
            <br />

            That
            <span className="text-[#D4A43B]">
              {" "}Compounds.
            </span>

          </h2>

          {/* SUBTEXT */}
          <p
            className="
            mt-8
            text-base
            sm:text-lg
            md:text-xl
            leading-relaxed
            text-white/70
            max-w-3xl
            "
          >

            PipuPath helps ambitious humans discover clarity,
            execute consistently, recover intelligently,
            and evolve through adaptive behavioral systems.

          </p>

          {/* FEATURE STRIP */}
          <div
            className="
            mt-10
            grid
            sm:grid-cols-3
            gap-4
            "
          >

            {/* ITEM */}
            <div
              className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-white/10
              bg-black/20
              p-4
              "
            >

              <div
                className="
                w-11
                h-11
                rounded-xl
                bg-[#7C3AED]/10
                flex
                items-center
                justify-center
                shrink-0
                "
              >

                <Brain
                  size={20}
                  className="text-[#C4B5FD]"
                />

              </div>

              <div>

                <div className="font-semibold text-sm sm:text-base">

                  Identity Intelligence

                </div>

                <div className="text-xs sm:text-sm text-white/45 mt-1">

                  Understand how you naturally grow

                </div>

              </div>

            </div>

            {/* ITEM */}
            <div
              className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-white/10
              bg-black/20
              p-4
              "
            >

              <div
                className="
                w-11
                h-11
                rounded-xl
                bg-[#D4A43B]/10
                flex
                items-center
                justify-center
                shrink-0
                "
              >

                <Target
                  size={20}
                  className="text-[#FCD34D]"
                />

              </div>

              <div>

                <div className="font-semibold text-sm sm:text-base">

                  Execution Systems

                </div>

                <div className="text-xs sm:text-sm text-white/45 mt-1">

                  Turn goals into measurable momentum

                </div>

              </div>

            </div>

            {/* ITEM */}
            <div
              className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-white/10
              bg-black/20
              p-4
              "
            >

              <div
                className="
                w-11
                h-11
                rounded-xl
                bg-[#22C55E]/10
                flex
                items-center
                justify-center
                shrink-0
                "
              >

                <ShieldCheck
                  size={20}
                  className="text-[#86EFAC]"
                />

              </div>

              <div>

                <div className="font-semibold text-sm sm:text-base">

                  Recovery Infrastructure

                </div>

                <div className="text-xs sm:text-sm text-white/45 mt-1">

                  Recover momentum before collapse

                </div>

              </div>

            </div>

          </div>

          {/* CTA BUTTONS */}
          <div
            className="
            mt-12
            flex
            flex-col
            sm:flex-row
            gap-4
            "
          >

            {/* PRIMARY */}
           <motion.button
  onClick={() => window.dispatchEvent(new Event("openIdentityModal"))}
  whileHover={{
                scale: 1.02,
                y: -2
              }}
              whileTap={{
                scale: 0.98
              }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 18
              }}
              className="
              group
              w-full
              sm:w-auto
              inline-flex
              items-center
              justify-center
              gap-3
              px-8
              py-5
              rounded-2xl
              bg-[#D4A43B]
              text-black
              font-bold
              text-base
              sm:text-lg
              shadow-[0_0_40px_rgba(212,164,59,0.25)]
              "
            >

              Start Your Human Audit

              <ArrowRight
                size={20}
                className="
                group-hover:translate-x-1
                transition-all
                duration-300
                "
              />

            </motion.button>

            {/* SECONDARY */}
            <motion.button
              whileHover={{
                scale: 1.01
              }}
              whileTap={{
                scale: 0.98
              }}
              className="
              w-full
              sm:w-auto
              px-8
              py-5
              rounded-2xl
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              text-white
              font-semibold
              text-base
              sm:text-lg
              hover:bg-white/10
              transition-all
              duration-300
              "
            >

              Explore Ecosystem

            </motion.button>

          </div>

          {/* BOTTOM TRUST */}
          <div
            className="
            mt-10
            pt-8
            border-t
            border-white/10
            flex
            flex-wrap
            items-center
            gap-x-6
            gap-y-3
            text-xs
            sm:text-sm
            text-white/40
            "
          >

            <span>Behavioral Intelligence</span>

            <span>Execution Infrastructure</span>

            <span>Adaptive Growth Systems</span>

            <span>HumanOS Framework</span>

          </div>

        </motion.div>

      </div>

    </section>

  );

}