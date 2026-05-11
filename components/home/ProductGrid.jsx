"use client";

import { motion } from "framer-motion";

import Reveal from "./Reveal";
import StaggerContainer from "./StaggerContainer";
import StaggerItem from "./StaggerItem";
import InteractiveGlow from "./InteractiveGlow";

import {
  Brain,
  Target,
  GraduationCap,
  BriefcaseBusiness,
  ShieldAlert,
  Vault,
  ArrowUpRight
} from "lucide-react";

const products = [
  {
    icon: Brain,
    title: "Identity Engine",
    subtitle: "Behavioral Intelligence",
    text: "Discover how you naturally think, execute, learn, and create leverage.",
    glow: "from-[#7C3AED]/20 to-[#7C3AED]/5"
  },

  {
    icon: Target,
    title: "Mission System",
    subtitle: "Execution Infrastructure",
    text: "Transform goals into weekly missions, momentum loops, and measurable progress.",
    glow: "from-[#D4A43B]/20 to-[#D4A43B]/5"
  },

  {
    icon: GraduationCap,
    title: "MagicPen",
    subtitle: "Exam Intelligence",
    text: "Diagnose exam readiness, identify weak zones, and optimize score improvement.",
    glow: "from-[#22C55E]/20 to-[#22C55E]/5"
  },

  {
    icon: BriefcaseBusiness,
    title: "SME OS",
    subtitle: "Business Growth Intelligence",
    text: "Help founders identify bottlenecks, growth levers, and execution priorities.",
    glow: "from-[#3B82F6]/20 to-[#3B82F6]/5"
  },

  {
    icon: ShieldAlert,
    title: "Nortnspoil",
    subtitle: "Recovery Intelligence",
    text: "Detect collapse patterns early and recover momentum before trajectories break.",
    glow: "from-[#EF4444]/20 to-[#EF4444]/5"
  },

  {
    icon: Vault,
    title: "Growth Vault",
    subtitle: "Proof Infrastructure",
    text: "Track evidence of progress, completed missions, and long-term evolution.",
    glow: "from-[#F97316]/20 to-[#F97316]/5"
  }
];

export default function ProductGrid() {

  return (

    <section
      id="systems"
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

        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="
          absolute
          left-[-120px]
          top-[20%]
          w-[320px]
          md:w-[500px]
          h-[320px]
          md:h-[500px]
          bg-[#7C3AED]/10
          blur-3xl
          rounded-full
          "
        />

        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="
          absolute
          right-[-120px]
          bottom-[10%]
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
        <Reveal className="max-w-3xl">

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

            PipuPath Ecosystem

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

            One Platform.
            <br />

            Multiple
            <span className="text-[#D4A43B]">
              {" "}Intelligence Systems.
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

            PipuPath combines behavioral intelligence,
            execution infrastructure, recovery systems,
            and economic positioning into one adaptive ecosystem.

          </p>

        </Reveal>

        {/* GRID */}
        <StaggerContainer
          className="
          mt-16
          md:mt-20
          grid
          md:grid-cols-2
          xl:grid-cols-3
          gap-5
          md:gap-8
          "
        >

          {products.map((item, i) => {

            const Icon = item.icon;

            return (

              <StaggerItem key={i}>

                <InteractiveGlow>

                  <motion.div
                    whileHover={{
                      y: -8
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 18
                    }}
                    className="
                    group
                    relative
                    overflow-hidden
                    rounded-[28px]
                    md:rounded-[32px]
                    border
                    border-white/10
                    bg-white/[0.03]
                    backdrop-blur-xl
                    p-5
                    sm:p-6
                    md:p-8
                    hover:border-white/20
                    transition-all
                    duration-500
                    h-full
                    "
                  >

                    {/* GLOW */}
                    <motion.div
                      className={`
                      absolute
                      inset-0
                      opacity-0
                      group-hover:opacity-100
                      transition-all
                      duration-700
                      bg-gradient-to-br
                      ${item.glow}
                      `}
                    />

                    {/* TOP */}
                    <div className="relative z-10 flex items-start justify-between">

                      <motion.div
                        whileHover={{
                          scale: 1.05
                        }}
                        className="
                        w-14
                        h-14
                        md:w-16
                        md:h-16
                        rounded-2xl
                        border
                        border-white/10
                        bg-black/20
                        flex
                        items-center
                        justify-center
                        shrink-0
                        "
                      >

                        <Icon
                          size={24}
                          className="text-[#D4A43B]"
                        />

                      </motion.div>

                      <ArrowUpRight
                        size={20}
                        className="
                        text-white/30
                        group-hover:text-white
                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                        transition-all
                        duration-300
                        "
                      />

                    </div>

                    {/* CONTENT */}
                    <div className="relative z-10 mt-8 md:mt-10">

                      <div
                        className="
                        text-[11px]
                        sm:text-xs
                        uppercase
                        tracking-[0.2em]
                        text-white/40
                        "
                      >

                        {item.subtitle}

                      </div>

                      <h3
                        className="
                        mt-3
                        text-2xl
                        sm:text-3xl
                        font-black
                        tracking-tight
                        "
                      >

                        {item.title}

                      </h3>

                      <p
                        className="
                        mt-4
                        md:mt-5
                        text-white/65
                        leading-relaxed
                        text-base
                        md:text-lg
                        "
                      >

                        {item.text}

                      </p>

                    </div>

                    {/* BOTTOM */}
                    <div
                      className="
                      relative
                      z-10
                      mt-8
                      md:mt-10
                      pt-5
                      md:pt-6
                      border-t
                      border-white/10
                      flex
                      items-center
                      justify-between
                      "
                    >

                      <span className="text-white/40 text-xs sm:text-sm">

                        PipuPath Module

                      </span>

                      <motion.span
                        whileHover={{ x: 2 }}
                        className="
                        text-[#D4A43B]
                        font-semibold
                        text-sm
                        "
                      >

                        Explore

                      </motion.span>

                    </div>

                  </motion.div>

                </InteractiveGlow>

              </StaggerItem>

            );

          })}

        </StaggerContainer>

        {/* BOTTOM PANEL */}
        <Reveal delay={0.1} className="mt-20 md:mt-28">

          <motion.div
            whileHover={{
              y: -4
            }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 18
            }}
            className="
            rounded-[30px]
            md:rounded-[36px]
            border
            border-white/10
            bg-gradient-to-br
            from-white/[0.04]
            to-white/[0.02]
            backdrop-blur-xl
            p-6
            sm:p-8
            md:p-16
            "
          >

            <div className="grid lg:grid-cols-2 gap-10 md:gap-14 items-center">

              {/* LEFT */}
              <div>

                <div
                  className="
                  text-[11px]
                  sm:text-sm
                  uppercase
                  tracking-[0.3em]
                  text-white/40
                  mb-5
                  md:mb-6
                  "
                >

                  Platform Thesis

                </div>

                <h3
                  className="
                  text-3xl
                  sm:text-4xl
                  md:text-5xl
                  font-black
                  leading-tight
                  "
                >

                  PipuPath is building
                  adaptive infrastructure
                  for human growth.

                </h3>

              </div>

              {/* RIGHT */}
              <div
                className="
                space-y-5
                md:space-y-6
                text-base
                md:text-lg
                text-white/70
                leading-relaxed
                "
              >

                <p>

                  Most platforms optimize tasks.

                  PipuPath optimizes the human behind the tasks.

                </p>

                <p>

                  By combining identity intelligence,
                  execution systems, recovery loops,
                  and growth tracking, PipuPath becomes
                  a long-term operating ecosystem for ambitious humans.

                </p>

              </div>

            </div>

          </motion.div>

        </Reveal>

      </div>

    </section>

  );

}