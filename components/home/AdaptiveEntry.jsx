"use client";

import { motion } from "framer-motion";

import {
  GraduationCap,
  BriefcaseBusiness,
  Brain,
  Sparkles,
  School,
  ArrowRight
} from "lucide-react";

const paths = [
  {
    icon: GraduationCap,
    title: "Student",
    text: "Build learning systems, momentum, confidence, and long-term growth.",
    glow: "from-[#22C55E]/20 to-transparent"
  },

  {
    icon: BriefcaseBusiness,
    title: "Founder",
    text: "Improve execution, focus, leverage, and business progression.",
    glow: "from-[#D4A43B]/20 to-transparent"
  },

  {
    icon: Brain,
    title: "Professional",
    text: "Upgrade consistency, strategic thinking, and career growth systems.",
    glow: "from-[#7C3AED]/20 to-transparent"
  },

  {
    icon: Sparkles,
    title: "Creator",
    text: "Develop creative momentum, identity clarity, and sustainable output.",
    glow: "from-[#3B82F6]/20 to-transparent"
  },

  {
    icon: School,
    title: "School Leader",
    text: "Build adaptive systems for student growth and institutional evolution.",
    glow: "from-[#EF4444]/20 to-transparent"
  }
];

export default function AdaptiveEntry() {

  return (

    <section
      className="
      relative
      py-24
      md:py-32
      bg-[#070B1A]
      text-white
      overflow-hidden
      "
    >

      {/* BACKGROUND */}
      <div className="absolute inset-0">

        <div
          className="
          absolute
          top-[10%]
          left-[-120px]
          w-[320px]
          md:w-[500px]
          h-[320px]
          md:h-[500px]
          bg-[#7C3AED]/10
          blur-3xl
          rounded-full
          "
        />

        <div
          className="
          absolute
          bottom-[10%]
          right-[-120px]
          w-[320px]
          md:w-[500px]
          h-[320px]
          md:h-[500px]
          bg-[#D4A43B]/10
          blur-3xl
          rounded-full
          "
        />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >

          <div
            className="
            inline-flex
            items-center
            px-4
            py-2
            rounded-full
            border
            border-white/10
            bg-white/5
            text-xs
            sm:text-sm
            text-white/70
            mb-6
            "
          >

            Adaptive Entry System

          </div>

          <h2
            className="
            text-4xl
            sm:text-5xl
            md:text-6xl
            font-black
            leading-[1.02]
            tracking-tight
            "
          >

            Every Human Needs
            <span className="text-[#D4A43B]">
              {" "}Different Infrastructure.
            </span>

          </h2>

          <p
            className="
            mt-7
            text-base
            sm:text-lg
            md:text-xl
            leading-relaxed
            text-white/65
            max-w-3xl
            "
          >

            PipuPath adapts onboarding, systems,
            missions, progression, and recovery
            based on who you are and where you are going.

          </p>

        </motion.div>

        {/* GRID */}
        <div
          className="
          mt-16
          md:mt-20
          grid
          md:grid-cols-2
          xl:grid-cols-5
          gap-5
          "
        >

          {paths.map((item, i) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.06
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -6
                }}
                className="
                group
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                p-6
                transition-all
                duration-500
                "
              >

                {/* GLOW */}
                <div
                  className={`
                  absolute
                  inset-0
                  opacity-0
                  group-hover:opacity-100
                  transition-all
                  duration-500
                  bg-gradient-to-br
                  ${item.glow}
                  `}
                />

                {/* ICON */}
                <div
                  className="
                  relative
                  z-10
                  w-14
                  h-14
                  rounded-2xl
                  bg-black/20
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                  "
                >

                  <Icon
                    size={26}
                    className="text-[#D4A43B]"
                  />

                </div>

                {/* CONTENT */}
                <div className="relative z-10 mt-8">

                  <h3
                    className="
                    text-2xl
                    font-black
                    tracking-tight
                    "
                  >

                    {item.title}

                  </h3>

                  <p
                    className="
                    mt-4
                    text-white/65
                    leading-relaxed
                    text-sm
                    sm:text-base
                    "
                  >

                    {item.text}

                  </p>

                </div>

                {/* CTA */}
                <div
                  className="
                  relative
                  z-10
                  mt-8
                  pt-5
                  border-t
                  border-white/10
                  flex
                  items-center
                  justify-between
                  "
                >

                  <span className="text-white/40 text-sm">

                    Enter Path

                  </span>

                  <ArrowRight
                    size={18}
                    className="
                    text-[#D4A43B]
                    group-hover:translate-x-1
                    transition-all
                    duration-300
                    "
                  />

                </div>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>

  );

}