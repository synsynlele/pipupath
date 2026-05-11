"use client";

import { motion } from "framer-motion";
import {
  Compass,
  BookOpen,
  Wrench,
  Rocket,
  Crown,
  ArrowRight,
  Flame,
  Trophy,
  TrendingUp
} from "lucide-react";

const levels = [
  {
    icon: Compass,
    level: "Explorer",
    xp: "0 → 100 XP",
    text: "Discover strengths, blindspots, and behavioral patterns."
  },

  {
    icon: BookOpen,
    level: "Learner",
    xp: "100 → 300 XP",
    text: "Build foundational skills, discipline, and execution habits."
  },

  {
    icon: Wrench,
    level: "Builder",
    xp: "300 → 700 XP",
    text: "Turn knowledge into output, systems, and measurable progress."
  },

  {
    icon: Rocket,
    level: "Operator",
    xp: "700 → 1500 XP",
    text: "Develop leverage, momentum, and high-performance consistency."
  },

  {
    icon: Crown,
    level: "Architect",
    xp: "1500+ XP",
    text: "Design systems, lead intelligently, and compound long-term impact."
  }
];

const stats = [
  {
    icon: Flame,
    value: "91%",
    label: "Momentum Retention"
  },

  {
    icon: Trophy,
    value: "142K+",
    label: "Completed Missions"
  },

  {
    icon: TrendingUp,
    value: "9.4M",
    label: "Growth XP Tracked"
  }
];

export default function Progression() {

  return (

    <section
  id="progression"
id="progression"
className="relative py-32 bg-[#050816] text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0">

        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-[#7C3AED]/10 blur-3xl rounded-full" />

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
            border-[#D4A43B]/20
            bg-[#D4A43B]/10
            text-[#D4A43B]
            text-sm
            mb-6
            "
          >

            HumanOS Progression Engine

          </div>

          <h2 className="text-4xl md:text-6xl font-black leading-[1.05] tracking-tight">

            Growth Should Feel
            <br />

            Structured,
            <span className="text-[#D4A43B]">
              {" "}Visible,
            </span>

            <br />

            And Compounding.

          </h2>

          <p className="mt-8 text-xl leading-relaxed text-white/65 max-w-2xl">

            HumanOS transforms growth into a measurable journey
            through XP systems, missions, proof tracking,
            recovery intelligence, and long-term progression.

          </p>

        </motion.div>

        {/* STATS */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">

          {stats.map((item, i) => {

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
                rounded-[28px]
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                p-8
                "
              >

                <div
                  className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-[#D4A43B]/10
                  border
                  border-[#D4A43B]/10
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

                <div className="mt-8 text-5xl font-black tracking-tight">

                  {item.value}

                </div>

                <div className="mt-3 text-white/60 text-lg">

                  {item.label}

                </div>

              </motion.div>

            );

          })}

        </div>

        {/* LEVELS */}
        <div className="mt-24 space-y-8">

          {levels.map((item, i) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08
                }}
                viewport={{ once: true }}
                className="
                group
                relative
                overflow-hidden
                rounded-[32px]
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                p-8
                hover:border-[#D4A43B]/30
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
                  bg-gradient-to-r
                  from-[#D4A43B]/5
                  via-transparent
                  to-[#7C3AED]/5
                  "
                />

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

                  {/* LEFT */}
                  <div className="flex items-start gap-6">

                    <div
                      className="
                      w-16
                      h-16
                      rounded-2xl
                      bg-[#D4A43B]/10
                      border
                      border-[#D4A43B]/10
                      flex
                      items-center
                      justify-center
                      shrink-0
                      "
                    >

                      <Icon
                        size={30}
                        className="text-[#D4A43B]"
                      />

                    </div>

                    <div>

                      <div className="text-sm uppercase tracking-[0.2em] text-white/40">

                        {item.xp}

                      </div>

                      <h3 className="mt-2 text-3xl font-black tracking-tight">

                        {item.level}

                      </h3>

                      <p className="mt-4 text-white/65 leading-relaxed text-lg max-w-2xl">

                        {item.text}

                      </p>

                    </div>

                  </div>

                  {/* RIGHT */}
                  <div
                    className="
                    flex
                    items-center
                    gap-3
                    text-[#D4A43B]
                    font-semibold
                    shrink-0
                    "
                  >

                    Continue Evolution

                    <ArrowRight
                      size={18}
                      className="
                      group-hover:translate-x-1
                      transition-all
                      duration-300
                      "
                    />

                  </div>

                </div>

              </motion.div>

            );

          })}

        </div>

        {/* BOTTOM PANEL */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="
          mt-28
          rounded-[40px]
          border
          border-white/10
          bg-gradient-to-br
          from-[#D4A43B]/10
          to-[#7C3AED]/10
          backdrop-blur-xl
          p-10
          md:p-16
          "
        >

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* LEFT */}
            <div>

              <div className="text-sm uppercase tracking-[0.3em] text-white/40 mb-6">

                Compounding Psychology

              </div>

              <h3 className="text-3xl md:text-5xl font-black leading-tight">

                People stay committed
                <br />

                when progress becomes
                <span className="text-[#D4A43B]">
                  {" "}visible.
                </span>

              </h3>

            </div>

            {/* RIGHT */}
            <div className="space-y-6 text-lg text-white/70 leading-relaxed">

              <p>

                HumanOS transforms growth from vague ambition
                into measurable momentum.

              </p>

              <p>

                Missions, XP, streaks, recovery systems,
                and proof tracking create a compounding feedback loop
                that keeps users evolving long-term.

              </p>

            </div>

          </div>

        </motion.div>

      </div>

    </section>

  );

}