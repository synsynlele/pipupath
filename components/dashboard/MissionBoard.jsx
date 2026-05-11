"use client";

import { useState } from "react";

import { motion } from "framer-motion";

import {
  CheckCircle2,
  Target,
  Zap
} from "lucide-react";

export default function MissionBoard({

  missions = []

}) {

  const [completed, setCompleted] = useState([]);

  function toggleMission(id){

    setCompleted(prev =>

      prev.includes(id)

        ? prev.filter(item => item !== id)

        : [...prev, id]

    );

  }

  const earnedXP = missions
    .filter(m => completed.includes(m.id))
    .reduce((acc, item) => acc + item.xp, 0);

  return (

    <div
      className="
      mt-8
      rounded-[32px]
      border
      border-white/10
      bg-white/[0.03]
      p-6
      md:p-8
      "
    >

      {/* TOP */}
      <div
        className="
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-5
        "
      >

        <div>

          <div className="flex items-center gap-3">

            <Target
              className="text-[#D4A43B]"
            />

            <div className="text-white/40 text-sm">

              Daily Mission System

            </div>

          </div>

          <h2
            className="
            mt-4
            text-3xl
            font-black
            "
          >

            Momentum Missions

          </h2>

        </div>

        {/* XP */}
        <div
          className="
          rounded-2xl
          border
          border-[#D4A43B]/20
          bg-[#D4A43B]/5
          px-5
          py-4
          "
        >

          <div className="flex items-center gap-2">

            <Zap
              size={18}
              className="text-[#FCD34D]"
            />

            <div className="text-white/40 text-sm">

              XP Earned

            </div>

          </div>

          <div
            className="
            mt-2
            text-4xl
            font-black
            text-[#FCD34D]
            "
          >

            {earnedXP}

          </div>

        </div>

      </div>

      {/* MISSIONS */}
      <div className="mt-8 grid gap-4">

        {missions.map((mission) => {

          const done =
            completed.includes(mission.id);

          return (

            <motion.button
              key={mission.id}
              whileHover={{
                y: -2
              }}
              whileTap={{
                scale: 0.99
              }}
              onClick={() => toggleMission(mission.id)}
              className={`
              text-left
              rounded-[24px]
              border
              p-5
              transition-all
              duration-300

              ${
                done

                ? "border-[#D4A43B]/30 bg-[#D4A43B]/10"

                : "border-white/10 bg-white/[0.02]"
              }
              `}
            >

              <div
                className="
                flex
                items-center
                justify-between
                gap-4
                "
              >

                <div className="flex items-start gap-4">

                  <CheckCircle2
                    size={24}
                    className={`
                    mt-1

                    ${
                      done
                      ? "text-[#FCD34D]"
                      : "text-white/20"
                    }
                    `}
                  />

                  <div>

                    <div
                      className="
                      text-lg
                      font-semibold
                      text-white
                      "
                    >

                      {mission.title}

                    </div>

                    <div
                      className="
                      mt-2
                      text-white/40
                      text-sm
                      "
                    >

                      +{mission.xp} XP

                    </div>

                  </div>

                </div>

              </div>

            </motion.button>

          );

        })}

      </div>

    </div>

  );

}