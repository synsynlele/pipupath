"use client";

import { motion } from "framer-motion";
import {
  Brain,
  BatteryLow,
  Compass,
  Layers3,
  Repeat,
  ShieldAlert
} from "lucide-react";

const problems = [
  {
    icon: Compass,
    title: "No Clear Direction",
    text: "Most people are working hard without understanding how they naturally create leverage."
  },
  {
    icon: Repeat,
    title: "Inconsistent Execution",
    text: "Motivation fades. Without systems, progress becomes emotional instead of repeatable."
  },
  {
    icon: Brain,
    title: "Generic Advice",
    text: "Most growth advice ignores personality, behavior patterns, and cognitive differences."
  },
  {
    icon: Layers3,
    title: "Disconnected Tools",
    text: "People juggle apps, courses, planners, and hacks with no unified operating system."
  },
  {
    icon: BatteryLow,
    title: "Burnout Cycles",
    text: "Without recovery intelligence, people collapse before momentum compounds."
  },
  {
    icon: ShieldAlert,
    title: "Invisible Blindspots",
    text: "Most people cannot see the hidden behaviors quietly sabotaging their growth."
  }
];

export default function ProblemSection() {

  return (

    <section className="relative py-32 bg-[#050816] text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0">

        <div className="absolute right-[-120px] top-[20%] w-[500px] h-[500px] bg-[#D4A43B]/10 blur-3xl rounded-full" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >

          <div
            className="
            inline-flex
            items-center
            px-4
            py-2
            rounded-full
            border
            border-red-500/20
            bg-red-500/10
            text-red-300
            text-sm
            mb-6
            "
          >

            Why Most People Stay Stuck

          </div>

          <h2 className="text-4xl md:text-6xl font-black leading-[1.05] tracking-tight">

            Human Potential
            <br />

            Is Being
            <span className="text-[#D4A43B]">
              {" "}Wasted.
            </span>

          </h2>

          <p className="mt-8 text-xl leading-relaxed text-white/65 max-w-2xl">

            Most people do not fail because they are lazy.

            They fail because they are navigating growth
            without personalized systems, feedback loops,
            behavioral intelligence, or execution structure.

          </p>

        </motion.div>

        {/* GRID */}
        <div className="mt-20 grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {problems.map((item, i) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08
                }}
                viewport={{ once: true }}
                className="
                group
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                p-8
                hover:border-red-400/30
                transition-all
                duration-500
                "
              >

                {/* GLOW */}
                <div
                  className="
                  absolute
                  inset-0
                  opacity-0
                  group-hover:opacity-100
                  transition-all
                  duration-500
                  bg-gradient-to-br
                  from-red-500/5
                  via-transparent
                  to-[#D4A43B]/5
                  "
                />

                {/* ICON */}
                <div
                  className="
                  relative
                  z-10
                  w-14
                  h-14
                  rounded-2xl
                  bg-red-500/10
                  border
                  border-red-500/10
                  flex
                  items-center
                  justify-center
                  "
                >

                  <Icon
                    size={26}
                    className="text-red-300"
                  />

                </div>

                {/* CONTENT */}
                <div className="relative z-10 mt-8">

                  <h3 className="text-2xl font-bold tracking-tight">

                    {item.title}

                  </h3>

                  <p className="mt-4 text-white/65 leading-relaxed">

                    {item.text}

                  </p>

                </div>

                {/* NUMBER */}
                <div
                  className="
                  absolute
                  bottom-6
                  right-6
                  text-5xl
                  font-black
                  text-white/[0.04]
                  "
                >

                  0{i + 1}

                </div>

              </motion.div>

            );

          })}

        </div>

        {/* BOTTOM STATEMENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="
          mt-24
          rounded-[36px]
          border
          border-white/10
          bg-gradient-to-br
          from-[#D4A43B]/10
          to-[#7C3AED]/10
          backdrop-blur-xl
          p-10
          md:p-16
          text-center
          "
        >

          <div className="max-w-4xl mx-auto">

            <div className="text-sm uppercase tracking-[0.3em] text-white/40 mb-6">

              HumanOS Thesis

            </div>

            <h3 className="text-3xl md:text-5xl font-black leading-tight">

              Humans do not rise
              <br />

              by information alone.

            </h3>

            <p className="mt-8 text-xl leading-relaxed text-white/70">

              They rise through identity clarity,
              execution systems, feedback loops,
              recovery intelligence, and consistent compounding.

            </p>

          </div>

        </motion.div>

      </div>

    </section>

  );

}