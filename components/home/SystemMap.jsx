"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  ScanSearch,
  Target,
  TrendingUp,
  BriefcaseBusiness,
  Sparkles
} from "lucide-react";

const systems = [
  {
    icon: ScanSearch,
    title: "Human Audit",
    text: "Diagnose strengths, behavior patterns, blindspots, and growth constraints."
  },
  {
    icon: BrainCircuit,
    title: "Identity Intelligence",
    text: "Map how you naturally learn, execute, adapt, and create leverage."
  },
  {
    icon: Target,
    title: "Mission Engine",
    text: "Convert goals into weekly execution systems with measurable proof."
  },
  {
    icon: TrendingUp,
    title: "Momentum Tracking",
    text: "Track growth trajectories, consistency, recovery, and performance evolution."
  },
  {
    icon: BriefcaseBusiness,
    title: "Economic Positioning",
    text: "Align identity, skills, and opportunities into scalable economic outcomes."
  },
  {
    icon: Sparkles,
    title: "Compounding Growth",
    text: "Turn small consistent actions into long-term transformation and leverage."
  }
];

export default function SystemMap() {

  return (

    <section
id="systems"
className="relative py-32 bg-[#070B1A] text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0">

        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#7C3AED]/10 blur-3xl rounded-full" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* TOP */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >

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
            text-sm
            text-white/70
            mb-6
            "
          >

            HumanOS Architecture

          </div>

          <h2 className="text-4xl md:text-6xl font-black leading-[1.05] tracking-tight">

            Human Growth
            <br />

            Requires
            <span className="text-[#D4A43B]">
              {" "}Systems.
            </span>

          </h2>

          <p className="mt-8 text-xl leading-relaxed text-white/65 max-w-2xl">

            Most people fail because they rely on motivation,
            random advice, and disconnected tools.

            HumanOS creates a structured growth infrastructure
            that adapts to the individual.

          </p>

        </motion.div>

        {/* SYSTEM GRID */}
        <div className="mt-20 grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {systems.map((item, i) => {

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
                hover:border-[#D4A43B]/30
                transition-all
                duration-500
                "
              >

                {/* HOVER GLOW */}
                <div
                  className="
                  absolute
                  inset-0
                  bg-gradient-to-br
                  from-[#D4A43B]/0
                  via-[#D4A43B]/0
                  to-[#7C3AED]/0
                  opacity-0
                  group-hover:opacity-100
                  transition-all
                  duration-500
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

        {/* FLOW */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="
          mt-24
          rounded-[32px]
          border
          border-white/10
          bg-gradient-to-br
          from-white/[0.04]
          to-white/[0.02]
          backdrop-blur-xl
          p-10
          md:p-14
          "
        >

          <div className="text-sm uppercase tracking-[0.3em] text-white/40 mb-6">

            The HumanOS Loop

          </div>

          <div className="grid md:grid-cols-6 gap-6">

            {[
              "Diagnose",
              "Understand",
              "Execute",
              "Measure",
              "Adapt",
              "Compound"
            ].map((step, i) => (

              <div
                key={i}
                className="
                relative
                rounded-2xl
                border
                border-white/10
                bg-black/20
                p-6
                text-center
                "
              >

                <div className="text-[#D4A43B] text-sm font-semibold mb-3">

                  0{i + 1}

                </div>

                <div className="font-bold text-lg">

                  {step}

                </div>

              </div>

            ))}

          </div>

        </motion.div>

      </div>

    </section>

  );
}