"use client";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import IdentityQuestions from "./IdentityQuestions";

import {
  X,
  ArrowRight,
  GraduationCap,
  BriefcaseBusiness,
  Brain,
  Sparkles,
  School
} from "lucide-react";

const paths = [
  {
    icon: GraduationCap,
    title: "Student"
  },

  {
    icon: BriefcaseBusiness,
    title: "Founder"
  },

  {
    icon: Brain,
    title: "Professional"
  },

  {
    icon: Sparkles,
    title: "Creator"
  },

  {
    icon: School,
    title: "School Leader"
  }
];

export default function IdentityModal({

  open,

  setOpen

}) {

  const [selectedPath, setSelectedPath] = useState(null);

  return (

    <AnimatePresence>

      {open && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
fixed
inset-0
z-[200]
bg-black/70
backdrop-blur-xl
flex
items-start
md:items-center
justify-center
overflow-y-auto
p-4
md:p-6
"
        >

          {/* PANEL */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.96
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.96
            }}
            transition={{
              duration: 0.35
            }}
            className="
relative
w-full
max-w-3xl
max-h-[90vh]
overflow-y-auto
rounded-[32px]
border
border-white/10
bg-[#070B1A]
overflow-x-hidden
"
          >

            {/* BACKGROUND */}
            <div className="absolute inset-0 overflow-hidden">

              <div
                className="
                absolute
                top-[-120px]
                right-[-120px]
                w-[300px]
                h-[300px]
                bg-[#7C3AED]/20
                blur-3xl
                rounded-full
                "
              />

            </div>

            {/* CONTENT */}
            <div className="relative z-10 p-6 sm:p-8 md:p-10">

              {/* TOP */}
              <div className="flex items-start justify-between gap-6">

                <div>

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
                    "
                  >

                    Human Audit Entry

                  </div>

                  <h2
                    className="
                    mt-6
                    text-3xl
                    sm:text-4xl
                    md:text-5xl
                    font-black
                    leading-[1.05]
                    tracking-tight
                    text-white
                    "
                  >

                    {
                      selectedPath
                      ? "Behavioral Intelligence Mapping."
                      : (
                        <>
                          Choose Your
                          <span className="text-[#D4A43B]">
                            {" "}Growth Path.
                          </span>
                        </>
                      )
                    }

                  </h2>

                  <p
                    className="
                    mt-5
                    text-base
                    sm:text-lg
                    text-white/65
                    leading-relaxed
                    max-w-2xl
                    "
                  >

                    {
                      selectedPath
                      ? "Answer a few behavioral questions so PipuPath can understand your momentum patterns, growth bottlenecks, and execution style."
                      : "PipuPath adapts missions, progression systems, recovery intelligence, and growth infrastructure based on who you are."
                    }

                  </p>

                </div>

                {/* CLOSE */}
                <button
                  onClick={() => setOpen(false)}
                  className="
                  w-11
                  h-11
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  flex
                  items-center
                  justify-center
                  text-white/70
                  hover:bg-white/10
                  transition-all
                  duration-300
                  shrink-0
                  "
                >

                  <X size={20} />

                </button>

{
  selectedPath && (

    <button
      onClick={() => setSelectedPath(null)}
      className="
      absolute
      top-24
      right-8
      text-sm
      text-[#D4A43B]
      hover:text-[#FCD34D]
      transition-all
      duration-300
      "
    >

      Change Path

    </button>

  )
}

              </div>

              {/* CONDITIONAL CONTENT */}
              {

                !selectedPath ? (

                  <div
                    className="
                    mt-10
                    grid
                    sm:grid-cols-2
                    lg:grid-cols-3
                    gap-4
                    "
                  >

                    {paths.map((item, i) => {

                      const Icon = item.icon;

                      return (

                        <motion.button
                          key={i}
                          whileHover={{
                            y: -4
                          }}
                          whileTap={{
                            scale: 0.98
                          }}
                          onClick={() => setSelectedPath(item.title)}
                          className="
                          group
                          relative
                          overflow-hidden
                          rounded-[28px]
                          border
                          border-white/10
                          bg-white/[0.03]
                          p-5
                          text-left
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
                            bg-gradient-to-br
                            from-[#D4A43B]/10
                            via-transparent
                            to-transparent
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
                            bg-black/20
                            border
                            border-white/10
                            flex
                            items-center
                            justify-center
                            "
                          >

                            <Icon
                              size={24}
                              className="text-[#D4A43B]"
                            />

                          </div>

                          {/* TEXT */}
                          <div className="relative z-10 mt-6">

                            <div
                              className="
                              text-2xl
                              font-black
                              tracking-tight
                              text-white
                              "
                            >

                              {item.title}

                            </div>

                          </div>

                          {/* CTA */}
                          <div
                            className="
                            relative
                            z-10
                            mt-8
                            pt-4
                            border-t
                            border-white/10
                            flex
                            items-center
                            justify-between
                            "
                          >

                            <span className="text-white/40 text-sm">

                              Begin Assessment

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

                        </motion.button>

                      );

                    })}

                  </div>

                ) : (

                  <IdentityQuestions
                    selectedPath={selectedPath}
                  />

                )

              }

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>

  );

}