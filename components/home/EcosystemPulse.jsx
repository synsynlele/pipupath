"use client";

import { motion } from "framer-motion";

import {
  Brain,
  Target,
  ShieldAlert,
  GraduationCap,
  TrendingUp,
  Users
} from "lucide-react";

const events = [
  {
    icon: Target,
    title: "Mission Completed",
    text: "A founder completed a 14-day execution streak.",
    color: "text-[#D4A43B]"
  },

  {
    icon: Brain,
    title: "Identity Insight Generated",
    text: "A student discovered their dominant learning pattern.",
    color: "text-[#A78BFA]"
  },

  {
    icon: ShieldAlert,
    title: "Recovery Alert Triggered",
    text: "Momentum decline detected before burnout escalation.",
    color: "text-[#F87171]"
  },

  {
    icon: GraduationCap,
    title: "School Growth Session",
    text: "A school tracked leadership progression metrics.",
    color: "text-[#4ADE80]"
  },

  {
    icon: TrendingUp,
    title: "Momentum Increased",
    text: "Weekly consistency score improved by 23%.",
    color: "text-[#FBBF24]"
  },

  {
    icon: Users,
    title: "Guide Session Booked",
    text: "A mentorship session was scheduled successfully.",
    color: "text-[#60A5FA]"
  }
];

export default function EcosystemPulse() {

  return (

    <section
      className="
      relative
      py-20
      md:py-24
      bg-[#050816]
      overflow-hidden
      border-y
      border-white/10
      "
    >

      {/* BACKGROUND */}
      <div className="absolute inset-0">

        <div
          className="
          absolute
          top-0
          left-0
          w-full
          h-full
          opacity-40
          bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.12),transparent_45%)]
          "
        />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-6">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

          <div className="max-w-3xl">

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
              text-white/70
              text-xs
              sm:text-sm
              mb-6
              "
            >

              Ecosystem Activity

            </div>

            <h2
              className="
              text-4xl
              sm:text-5xl
              md:text-6xl
              font-black
              leading-[1.05]
              tracking-tight
              text-white
              "
            >

              A Living
              <span className="text-[#D4A43B]">
                {" "}Growth Ecosystem.
              </span>

            </h2>

          </div>

          {/* STATUS */}
          <div
            className="
            inline-flex
            items-center
            gap-3
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            px-5
            py-4
            text-white/70
            w-fit
            "
          >

            <div className="relative flex items-center justify-center">

              <span
                className="
                absolute
                inline-flex
                h-full
                w-full
                rounded-full
                bg-green-400
                opacity-75
                animate-ping
                "
              />

              <span
                className="
                relative
                inline-flex
                rounded-full
                h-3
                w-3
                bg-green-400
                "
              />

            </div>

            <span className="text-sm sm:text-base">

              Systems operational

            </span>

          </div>

        </div>

        {/* FEED */}
        <div
          className="
          mt-14
          grid
          md:grid-cols-2
          xl:grid-cols-3
          gap-5
          md:gap-6
          "
        >

          {events.map((event, i) => {

            const Icon = event.icon;

            return (

              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -4
                }}
                className="
                group
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                p-5
                sm:p-6
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
                  from-white/[0.03]
                  to-transparent
                  "
                />

                {/* TOP */}
                <div className="relative z-10 flex items-start justify-between gap-4">

                  <div
                    className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-black/20
                    border
                    border-white/10
                    flex
                    items-center
                    justify-center
                    shrink-0
                    "
                  >

                    <Icon
                      size={22}
                      className={event.color}
                    />

                  </div>

                  {/* LIVE */}
                  <div
                    className="
                    flex
                    items-center
                    gap-2
                    text-[11px]
                    uppercase
                    tracking-[0.2em]
                    text-white/30
                    "
                  >

                    <div className="w-2 h-2 rounded-full bg-green-400" />

                    Live

                  </div>

                </div>

                {/* CONTENT */}
                <div className="relative z-10 mt-6">

                  <h3
                    className="
                    text-xl
                    sm:text-2xl
                    font-black
                    tracking-tight
                    text-white
                    "
                  >

                    {event.title}

                  </h3>

                  <p
                    className="
                    mt-4
                    text-white/65
                    leading-relaxed
                    text-base
                    "
                  >

                    {event.text}

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