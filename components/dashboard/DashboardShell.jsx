"use client";

import { motion } from "framer-motion";

import MissionBoard

from "@/components/dashboard/MissionBoard";

import { missions }

from "@/lib/missions";

import {
  Flame,
  Target,
  Brain,
  Shield,
  Sparkles
} from "lucide-react";

export default function DashboardShell({

  title,

  subtitle,

  identity

}) {

const activeMissions =

  missions[identity] || [];

  return (

    <main
      className="
      min-h-screen
      bg-[#050816]
      text-white
      flex
      "
    >

      {/* SIDEBAR */}
      <aside
        className="
        hidden
        lg:flex
        w-[280px]
        border-r
        border-white/10
        bg-black/20
        backdrop-blur-2xl
        flex-col
        p-6
        "
      >

        {/* LOGO */}
        <div>

          <div
            className="
            text-2xl
            font-black
            tracking-tight
            "
          >

            PipuPath

          </div>

          <div className="text-white/40 text-sm mt-1">

            Adaptive Human OS

          </div>

        </div>

        {/* NAV */}
        <div className="mt-12 flex flex-col gap-3">

          {[
            "Overview",
            "Missions",
            "Progress",
            "Recovery",
            "AI Systems"
          ].map((item, i) => (

            <button
              key={i}
              className="
              text-left
              px-4
              py-4
              rounded-2xl
              text-white/70
              hover:bg-white/[0.05]
              hover:text-white
              transition-all
              duration-300
              "
            >

              {item}

            </button>

          ))}

        </div>

        {/* XP */}
        <div
          className="
          mt-auto
          rounded-[28px]
          border
          border-[#D4A43B]/20
          bg-[#D4A43B]/5
          p-5
          "
        >

          <div className="text-white/40 text-sm">

            Current Momentum

          </div>

          <div
            className="
            mt-2
            text-4xl
            font-black
            text-[#FCD34D]
            "
          >

            78%

          </div>

          <div className="mt-2 text-white/60 text-sm">

            Momentum increasing steadily.

          </div>

        </div>

      </aside>

      {/* MAIN */}
      <div className="flex-1">

        {/* TOPBAR */}
        <div
          className="
          sticky
          top-0
          z-20
          border-b
          border-white/10
          bg-[#050816]/80
          backdrop-blur-2xl
          px-6
          md:px-10
          py-5
          "
        >

          <div
            className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-6
            "
          >

            {/* LEFT */}
            <div>

              <div className="text-white/40 text-sm">

                {identity}

              </div>

              <h1
                className="
                mt-2
                text-3xl
                md:text-5xl
                font-black
                tracking-tight
                "
              >

                {title}

              </h1>

              <p
                className="
                mt-3
                text-white/65
                max-w-2xl
                leading-relaxed
                "
              >

                {subtitle}

              </p>

            </div>

            {/* STREAK */}
            <motion.div
              whileHover={{
                y: -3
              }}
              className="
              rounded-[28px]
              border
              border-[#D4A43B]/20
              bg-[#D4A43B]/5
              px-6
              py-5
              min-w-[220px]
              "
            >

              <div className="flex items-center gap-3">

                <Flame
                  className="text-[#FBBF24]"
                />

                <div className="text-white/40 text-sm">

                  Execution Streak

                </div>

              </div>

              <div
                className="
                mt-3
                text-5xl
                font-black
                text-white
                "
              >

                12

              </div>

              <div className="text-white/50 text-sm mt-1">

                Days of momentum

              </div>

            </motion.div>

          </div>

        </div>

        {/* CONTENT */}
        <div className="p-6 md:p-10">

          {/* GRID */}
          <div
            className="
            grid
            xl:grid-cols-3
            gap-6
            "
          >

            {/* MAIN MISSION */}
            <motion.div
              whileHover={{
                y: -4
              }}
              className="
              xl:col-span-2
              rounded-[32px]
              border
              border-white/10
              bg-white/[0.03]
              p-8
              "
            >

              <div className="flex items-center gap-3">

                <Target
                  className="text-[#D4A43B]"
                />

                <div className="text-white/40 text-sm">

                  Primary Mission

                </div>

              </div>

              <h2
                className="
                mt-6
                text-4xl
                font-black
                leading-tight
                "
              >

                Build sustainable
                momentum this week.

              </h2>

              <p
                className="
                mt-5
                text-white/65
                leading-relaxed
                max-w-2xl
                "
              >

                Your current trajectory suggests
                strong potential but inconsistent
                execution rhythm.
                Focus on consistency before expansion.

              </p>

            </motion.div>

            {/* AI INSIGHT */}
            <motion.div
              whileHover={{
                y: -4
              }}
              className="
              rounded-[32px]
              border
              border-[#7C3AED]/20
              bg-[#7C3AED]/5
              p-7
              "
            >

              <div className="flex items-center gap-3">

                <Brain
                  className="text-[#C4B5FD]"
                />

                <div className="text-white/40 text-sm">

                  AI Insight

                </div>

              </div>

              <div
                className="
                mt-6
                text-2xl
                font-black
                leading-snug
                "
              >

                Your recovery rhythm
                affects execution more
                than motivation.

              </div>

            </motion.div>

          </div>

<MissionBoard
  missions={activeMissions}
/>

          {/* LOWER GRID */}
          <div
            className="
            mt-6
            grid
            md:grid-cols-2
            gap-6
            "
          >

            {/* RECOVERY */}
            <div
              className="
              rounded-[30px]
              border
              border-white/10
              bg-white/[0.03]
              p-7
              "
            >

              <div className="flex items-center gap-3">

                <Shield
                  className="text-[#F87171]"
                />

                <div className="text-white/40 text-sm">

                  Recovery System

                </div>

              </div>

              <div
                className="
                mt-5
                text-3xl
                font-black
                "
              >

                Nortnspoil Active

              </div>

              <p
                className="
                mt-4
                text-white/65
                leading-relaxed
                "
              >

                Your behavioral patterns indicate
                elevated burnout probability
                after prolonged intense execution.

              </p>

            </div>

            {/* AI */}
            <div
              className="
              rounded-[30px]
              border
              border-white/10
              bg-white/[0.03]
              p-7
              "
            >

              <div className="flex items-center gap-3">

                <Sparkles
                  className="text-[#D4A43B]"
                />

                <div className="text-white/40 text-sm">

                  AI Guidance

                </div>

              </div>

              <div
                className="
                mt-5
                text-3xl
                font-black
                "
              >

                Momentum Increasing

              </div>

              <p
                className="
                mt-4
                text-white/65
                leading-relaxed
                "
              >

                Maintain current execution rhythm
                for another 5 days before scaling workload.

              </p>

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}