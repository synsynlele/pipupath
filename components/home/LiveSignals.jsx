"use client";

import { motion } from "framer-motion";

import {
  Brain,
  Flame,
  ShieldAlert,
  GraduationCap,
  Users
} from "lucide-react";

const signals = [
  {
    icon: Flame,
    label: "Active Missions",
    value: "14,291",
    color: "text-orange-300"
  },

  {
    icon: Brain,
    label: "Identity Analyses",
    value: "3,842",
    color: "text-violet-300"
  },

  {
    icon: GraduationCap,
    label: "Student Growth Sessions",
    value: "892",
    color: "text-green-300"
  },

  {
    icon: ShieldAlert,
    label: "Recovery Alerts Prevented",
    value: "1,124",
    color: "text-red-300"
  },

  {
    icon: Users,
    label: "Guides Active",
    value: "281",
    color: "text-blue-300"
  }
];

export default function LiveSignals() {

  return (

    <section className="relative py-8 overflow-hidden bg-[#050816]">

      {/* BORDERS */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />

      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />

      {/* LIGHT */}
      <div
        className="
        absolute
        inset-0
        opacity-40
        bg-gradient-to-r
        from-[#7C3AED]/5
        via-transparent
        to-[#D4A43B]/5
        "
      />

      {/* CONTENT */}
      <div className="relative z-10">

        <motion.div
          animate={{
            x: ["0%", "-40%"]
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex gap-4 md:gap-6 w-max px-5"
        >

          {[...signals, ...signals].map((item, i) => {

            const Icon = item.icon;

            return (

              <div
                key={i}
                className="
                flex
                items-center
                gap-4
                px-5
                py-4
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-md
                min-w-[240px]
                md:min-w-[280px]
                "
              >

                {/* ICON */}
                <div
                  className="
                  relative
                  w-11
                  h-11
                  rounded-2xl
                  bg-black/30
                  flex
                  items-center
                  justify-center
                  shrink-0
                  "
                >

                  <Icon
                    size={20}
                    className={item.color}
                  />

                </div>

                {/* TEXT */}
                <div>

                  <div className="text-white/40 text-xs sm:text-sm">

                    {item.label}

                  </div>

                  <div className="text-lg sm:text-xl font-black text-white mt-1">

                    {item.value}

                  </div>

                </div>

                {/* STATUS */}
                <div className="ml-auto">

                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />

                </div>

              </div>

            );

          })}

        </motion.div>

      </div>

    </section>

  );

}