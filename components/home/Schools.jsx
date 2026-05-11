"use client";

import { motion } from "framer-motion";

import {
  School,
  GraduationCap,
  BrainCircuit,
  LineChart,
  Users,
  ShieldCheck,
  ArrowRight
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "Student Intelligence",
    text: "Understand learning patterns, strengths, behavior trends, and growth bottlenecks."
  },

  {
    icon: GraduationCap,
    title: "Mission-Based Learning",
    text: "Replace passive learning with projects, missions, execution systems, and measurable growth."
  },

  {
    icon: LineChart,
    title: "Growth Analytics",
    text: "Track consistency, momentum, recovery patterns, and long-term evolution."
  },

  {
    icon: Users,
    title: "Leadership Development",
    text: "Develop confidence, execution, communication, responsibility, and entrepreneurial thinking."
  },

  {
    icon: ShieldCheck,
    title: "Early Risk Detection",
    text: "Identify disengagement, burnout, collapse patterns, and hidden student struggles early."
  },

  {
    icon: School,
    title: "School Infrastructure",
    text: "Build systems for accountability, culture, execution, and human development."
  }
];

export default function Schools() {

  return (

    <section
      id="schools"
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

        <div className="absolute top-[10%] right-[-120px] w-[320px] md:w-[500px] h-[320px] md:h-[500px] bg-[#22C55E]/10 blur-3xl rounded-full" />

        <div className="absolute bottom-[10%] left-[-120px] w-[320px] md:w-[500px] h-[320px] md:h-[500px] bg-[#D4A43B]/10 blur-3xl rounded-full" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-6">

        {/* TOP */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-14 md:gap-20 items-center"
        >

          {/* LEFT */}
          <div>

            <div
              className="
              inline-flex
              items-center
              px-4
              py-2
              rounded-full
              border
              border-[#22C55E]/20
              bg-[#22C55E]/10
              text-[#86EFAC]
              text-xs
              sm:text-sm
              mb-6
              "
            >

              PipuPath For Schools

            </div>

            <h2
              className="
              text-4xl
              sm:text-5xl
              md:text-6xl
              font-black
              leading-[1.05]
              tracking-tight
              "
            >

              Education Needs
              Better
              <span className="text-[#D4A43B]">
                {" "}Infrastructure.
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
              max-w-2xl
              "
            >

              Schools were designed for information delivery.

              PipuPath is designed for adaptive human development.

            </p>

            <div
              className="
              mt-8
              space-y-5
              text-base
              md:text-lg
              text-white/70
              leading-relaxed
              "
            >

              <p>

                PipuPath helps schools build systems for:
                leadership, execution, accountability,
                behavioral growth, entrepreneurship,
                and long-term student evolution.

              </p>

              <p>

                Instead of measuring students only by grades,
                schools can understand momentum, learning behavior,
                recovery patterns, and hidden potential.

              </p>

            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">

              <button
                className="
                group
                w-full
                sm:w-auto
                inline-flex
                items-center
                justify-center
                gap-2
                px-7
                py-4
                rounded-2xl
                bg-[#D4A43B]
                text-black
                font-semibold
                hover:scale-[1.02]
                transition-all
                duration-300
                "
              >

                Explore School Infrastructure

                <ArrowRight
                  size={18}
                  className="
                  group-hover:translate-x-1
                  transition-all
                  duration-300
                  "
                />

              </button>

              <button
                className="
                w-full
                sm:w-auto
                px-7
                py-4
                rounded-2xl
                border
                border-white/10
                bg-white/5
                text-white
                font-semibold
                hover:bg-white/10
                transition-all
                duration-300
                "
              >

                Book Demo

              </button>

            </div>

          </div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="
            relative
            rounded-[28px]
            md:rounded-[36px]
            border
            border-white/10
            bg-white/[0.04]
            backdrop-blur-xl
            p-5
            sm:p-6
            md:p-8
            overflow-hidden
            "
          >

            {/* HEADER */}
            <div className="flex items-center justify-between mb-8 md:mb-10">

              <div>

                <div className="text-xs sm:text-sm text-white/40">

                  SCHOOL OPERATING SYSTEM

                </div>

                <div className="text-xl sm:text-2xl font-black mt-2">

                  Development Dashboard

                </div>

              </div>

              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse shrink-0" />

            </div>

            {/* MOCK DASHBOARD */}
            <div className="space-y-5 md:space-y-6">

              {/* STUDENT CARD */}
              <div
                className="
                rounded-2xl
                border
                border-white/10
                bg-black/20
                p-5
                md:p-6
                "
              >

                <div className="flex items-center justify-between gap-4">

                  <div>

                    <div className="text-xs sm:text-sm text-white/40">

                      Student Momentum

                    </div>

                    <div className="mt-2 text-2xl md:text-3xl font-black">

                      87%

                    </div>

                  </div>

                  <div
                    className="
                    px-3
                    py-2
                    rounded-xl
                    bg-[#22C55E]/10
                    text-[#86EFAC]
                    text-xs
                    sm:text-sm
                    whitespace-nowrap
                    "
                  >
                    Improving
                  </div>

                </div>

                <div
                  className="
                  mt-5
                  h-3
                  rounded-full
                  bg-white/10
                  overflow-hidden
                  "
                >

                  <div
                    className="
                    h-full
                    w-[87%]
                    bg-gradient-to-r
                    from-[#22C55E]
                    to-[#D4A43B]
                    rounded-full
                    "
                  />

                </div>

              </div>

              {/* METRICS */}
              <div className="grid grid-cols-2 gap-4 md:gap-5">

                <div
                  className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/20
                  p-4
                  md:p-5
                  "
                >

                  <div className="text-white/40 text-xs sm:text-sm">

                    Leadership Index

                  </div>

                  <div className="mt-3 text-2xl md:text-3xl font-black">

                    74%

                  </div>

                </div>

                <div
                  className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/20
                  p-4
                  md:p-5
                  "
                >

                  <div className="text-white/40 text-xs sm:text-sm">

                    Execution Score

                  </div>

                  <div className="mt-3 text-2xl md:text-3xl font-black">

                    91%

                  </div>

                </div>

              </div>

              {/* ALERTS */}
              <div
                className="
                rounded-2xl
                border
                border-red-500/20
                bg-red-500/10
                p-5
                "
              >

                <div className="text-red-300 font-semibold text-sm sm:text-base">

                  Early Recovery Alert

                </div>

                <div
                  className="
                  mt-3
                  text-sm
                  sm:text-base
                  text-white/70
                  leading-relaxed
                  "
                >

                  12 students showing declining momentum
                  and behavioral inconsistency patterns.

                </div>

              </div>

            </div>

          </motion.div>

        </motion.div>

        {/* FEATURES */}
        <div
          className="
          mt-20
          md:mt-28
          grid
          md:grid-cols-2
          xl:grid-cols-3
          gap-5
          md:gap-8
          "
        >

          {features.map((item, i) => {

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
                md:rounded-[30px]
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                p-5
                sm:p-6
                md:p-8
                hover:border-[#22C55E]/30
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
                  from-[#22C55E]/5
                  via-transparent
                  to-[#D4A43B]/5
                  "
                />

                {/* ICON */}
                <div
                  className="
                  relative
                  z-10
                  w-12
                  h-12
                  md:w-14
                  md:h-14
                  rounded-2xl
                  bg-[#22C55E]/10
                  border
                  border-[#22C55E]/10
                  flex
                  items-center
                  justify-center
                  "
                >

                  <Icon
                    size={24}
                    className="text-[#86EFAC]"
                  />

                </div>

                {/* CONTENT */}
                <div className="relative z-10 mt-6 md:mt-8">

                  <h3
                    className="
                    text-xl
                    sm:text-2xl
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
                    text-base
                    md:text-lg
                    "
                  >

                    {item.text}

                  </p>

                </div>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>

  );

}