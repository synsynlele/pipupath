"use client";

import { useState } from "react";

import { motion } from "framer-motion";

import { supabase }

from "@/lib/supabase";

import {
  Brain,
  Flame,
  ShieldAlert,
  Target,
  Sparkles
} from "lucide-react";

export default function IdentityResults({

  selectedPath,

  answers

}) {

  function generateProfile() {

    const values = Object.values(answers);

    let archetype = "Strategic Builder";

    let bottleneck = "Inconsistency";

    let recoveryRisk = "Moderate";

    let recommendation = "Mission System";

    let firstMission =
      "Build a 7-day execution streak.";

    if(values.includes("Overthinking")){

      archetype = "Reflective Architect";

      bottleneck = "Execution Delay";

      recommendation = "Mission System";

      firstMission =
        "Ship one meaningful task daily for 7 days.";

    }

    if(values.includes("Burnout")){

      recoveryRisk = "High";

      recommendation = "Nortnspoil Recovery";

      firstMission =
        "Reduce overload and rebuild momentum gradually.";

    }

    if(values.includes("Fear of failure")){

      archetype = "Cautious Visionary";

      firstMission =
        "Complete one uncomfortable growth action daily.";

    }

    return {
      archetype,
      bottleneck,
      recoveryRisk,
      recommendation,
      firstMission
    };

  }

  const profile = generateProfile();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  async function handleContinue(){

    if(!email) return;

    setLoading(true);

    const { error } =
      await supabase.auth.signInWithOtp({

        email,

        options: {

          emailRedirectTo:
  `${window.location.origin}/auth/callback`
        }

      });

    setLoading(false);

    if(error){

      alert(error.message);

      return;

    }

    localStorage.setItem(
      "pipupath_completed",
      "true"
    );

    localStorage.setItem(
      "pipupath_identity",
      selectedPath
    );

    setSuccess(true);

  }

  return (

    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.5
      }}
      className="mt-10"
    >

      {/* BADGE */}
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
        text-[#FCD34D]
        text-sm
        "
      >

        Intelligence Mapping Complete

      </div>

      {/* TITLE */}
      <h3
        className="
        mt-6
        text-4xl
        md:text-5xl
        font-black
        leading-tight
        text-white
        "
      >

        Your Growth Archetype:
        <span className="text-[#D4A43B]">

          {" "}{profile.archetype}

        </span>

      </h3>

      {/* DESCRIPTION */}
      <p
        className="
        mt-6
        text-lg
        text-white/70
        leading-relaxed
        max-w-3xl
        "
      >

        PipuPath analyzed your behavioral responses
        to identify your momentum patterns,
        execution tendencies,
        recovery risks,
        and growth bottlenecks.

      </p>

      {/* GRID */}
      <div
        className="
        mt-10
        grid
        md:grid-cols-3
        gap-5
        "
      >

        {/* CARD */}
        <div
          className="
          rounded-[28px]
          border
          border-white/10
          bg-white/[0.03]
          p-6
          "
        >

          <Brain
            size={28}
            className="text-[#A78BFA]"
          />

          <div className="mt-5 text-white/40 text-sm">

            Archetype

          </div>

          <div className="mt-2 text-2xl font-black text-white">

            {profile.archetype}

          </div>

        </div>

        {/* CARD */}
        <div
          className="
          rounded-[28px]
          border
          border-white/10
          bg-white/[0.03]
          p-6
          "
        >

          <Flame
            size={28}
            className="text-[#FBBF24]"
          />

          <div className="mt-5 text-white/40 text-sm">

            Bottleneck

          </div>

          <div className="mt-2 text-2xl font-black text-white">

            {profile.bottleneck}

          </div>

        </div>

        {/* CARD */}
        <div
          className="
          rounded-[28px]
          border
          border-white/10
          bg-white/[0.03]
          p-6
          "
        >

          <ShieldAlert
            size={28}
            className="text-[#F87171]"
          />

          <div className="mt-5 text-white/40 text-sm">

            Recovery Risk

          </div>

          <div className="mt-2 text-2xl font-black text-white">

            {profile.recoveryRisk}

          </div>

        </div>

      </div>

      {/* RECOMMENDATION */}
      <div
        className="
        mt-10
        rounded-[30px]
        border
        border-[#D4A43B]/20
        bg-[#D4A43B]/5
        p-6
        md:p-8
        "
      >

        <div className="flex items-start gap-4">

          <div
            className="
            w-14
            h-14
            rounded-2xl
            bg-[#D4A43B]/10
            flex
            items-center
            justify-center
            shrink-0
            "
          >

            <Sparkles
              size={24}
              className="text-[#FCD34D]"
            />

          </div>

          <div>

            <div className="text-white/40 text-sm">

              Recommended Starting System

            </div>

            <div
              className="
              mt-2
              text-3xl
              font-black
              text-white
              "
            >

              {profile.recommendation}

            </div>

          </div>

        </div>

      </div>

      {/* FIRST MISSION */}
      <div
        className="
        mt-8
        rounded-[30px]
        border
        border-white/10
        bg-white/[0.03]
        p-6
        md:p-8
        "
      >

        <div className="flex items-start gap-4">

          <div
            className="
            w-14
            h-14
            rounded-2xl
            bg-[#7C3AED]/10
            flex
            items-center
            justify-center
            shrink-0
            "
          >

            <Target
              size={24}
              className="text-[#C4B5FD]"
            />

          </div>

          <div>

            <div className="text-white/40 text-sm">

              Suggested First Mission

            </div>

            <div
              className="
              mt-3
              text-2xl
              md:text-3xl
              font-black
              text-white
              leading-tight
              "
            >

              {profile.firstMission}

            </div>

          </div>

        </div>

      </div>

      {/* CONTINUE */}
      <div className="mt-10">

        {

          !success ? (

            <div
              className="
              rounded-[30px]
              border
              border-white/10
              bg-white/[0.03]
              p-6
              md:p-8
              "
            >

              <div className="text-white/40 text-sm">

                Save Your HumanOS Profile

              </div>

              <h3
                className="
                mt-3
                text-3xl
                md:text-4xl
                font-black
                leading-tight
                text-white
                "
              >

                Continue Into PipuPath

              </h3>

              <p
                className="
                mt-4
                text-white/65
                leading-relaxed
                "
              >

                Save your onboarding intelligence,
                trajectory analysis,
                and adaptive growth systems.

              </p>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="
                mt-6
                w-full
                rounded-2xl
                border
                border-white/10
                bg-black/20
                px-5
                py-4
                outline-none
                text-white
                "
              />

              <motion.button
                whileHover={{
                  scale: 1.02
                }}
                whileTap={{
                  scale: 0.98
                }}
                onClick={handleContinue}
                disabled={loading}
                className="
                mt-5
                w-full
                rounded-2xl
                bg-[#D4A43B]
                text-black
                font-bold
                py-5
                "
              >

                {

                  loading

                  ? "Preparing Your System..."

                  : "Save & Continue"

                }

              </motion.button>

            </div>

          ) : (

            <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              className="
              rounded-[30px]
              border
              border-[#D4A43B]/20
              bg-[#D4A43B]/5
              p-8
              "
            >

              <div className="text-[#FCD34D] text-sm">

                Magic Link Sent

              </div>

              <h3
                className="
                mt-3
                text-4xl
                font-black
                text-white
                "
              >

                Check Your Email

              </h3>

              <p
                className="
                mt-4
                text-white/70
                leading-relaxed
                "
              >

                Your PipuPath operating environment
                is ready.

                Use the secure link sent to your email
                to continue into your adaptive dashboard.

              </p>

            </motion.div>

          )

        }

      </div>

    </motion.div>

  );

}