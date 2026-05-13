"use client";

import { useEffect, useState }
from "react";

import {
  storeMemory
}
from "../../lib/memory/storeMemory";

import {
  saveActiveMission
}
from "../../lib/missions/saveActiveMission";

export default function AdaptiveMission({

  activeMission,

  orchestration,

  profile,

}) {

  // =========================
  // STATE
  // =========================

  const [
    generatedMission,
    setGeneratedMission,
  ] = useState(
    activeMission
  );

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    outcomeState,
    setOutcomeState,
  ] = useState("");

  // =========================
  // SYNC ACTIVE MISSION
  // =========================

  useEffect(() => {

    if (
      activeMission
    ) {

      setGeneratedMission(
        activeMission
      );

    }

  }, [activeMission]);

  // =========================
  // ORCHESTRATION
  // =========================

  const missionMode =
    orchestration?.missionMode ||

    "standard";

  const isRecovery =
    missionMode === "recovery";

  const isExpanded =
    missionMode === "expanded";

  const isSimplified =
    missionMode === "simplified";

  // =========================
  // GENERATE MISSION
  // =========================

  async function handleGenerateMission() {

    try {

      setLoading(true);

      const response =
        await fetch(

          "/api/mission",

          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

            },

            body:
              JSON.stringify({

                archetype:
                  profile?.archetype ||

                  "Builder",

                aspirations:
                  profile?.aspirations ||

                  "Build a meaningful and impactful future.",

                momentum:
                  profile?.momentum ||

                  50,

                emotionalState:
                  profile?.last_cognitive_state ||

                  "Focused",

                missionMode:
                  orchestration?.missionMode ||

                  "standard",

              }),

          }

        );

      const data =
        await response.json();

      const mission = {

        title:
          "Strategic Mission",

        description:

          data?.mission ||

          "Identify one difficult but meaningful action that would move your future forward and complete it before the day ends.",

        type:
          missionMode,

        xpReward:
          isExpanded

            ?

            250

            :

          isRecovery

            ?

            100

            :

            180,

      };

      // =========================
      // SAVE
      // =========================

      await saveActiveMission({

        userId:
          profile?.id,

        mission,

      });

      setGeneratedMission(
        mission
      );

      setOutcomeState("");

    }

    catch (error) {

      console.error(error);

    }

    finally {

      setLoading(false);

    }

  }

  // =========================
  // COMPLETE
  // =========================

  async function handleCompleteMission() {

    try {

      setOutcomeState(
        "completed"
      );

      await storeMemory({

        userId:
          profile?.id,

        memoryType:
          "mission_completion",

        content:

          `User completed mission: ${generatedMission?.description}`,

        importance: 5,

      });

    } catch (error) {

      console.error(error);

    }

  }

  // =========================
  // STRUGGLE
  // =========================

  async function handleStruggleMission() {

    try {

      setOutcomeState(
        "struggling"
      );

      await storeMemory({

        userId:
          profile?.id,

        memoryType:
          "mission_struggle",

        content:

          `User struggled with mission: ${generatedMission?.description}`,

        importance: 4,

      });

    } catch (error) {

      console.error(error);

    }

  }

  // =========================
  // SKIP
  // =========================

  async function handleSkipMission() {

    try {

      setOutcomeState(
        "skipped"
      );

      await storeMemory({

        userId:
          profile?.id,

        memoryType:
          "mission_skip",

        content:

          `User skipped mission: ${generatedMission?.description}`,

        importance: 3,

      });

    } catch (error) {

      console.error(error);

    }

  }

  return (

    <section className={`

mt-10
relative
overflow-hidden
rounded-[40px]
p-8
md:p-10
shadow-[0_10px_60px_rgba(15,23,42,0.15)]

${

  isExpanded

    ?

    "bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#1E293B] text-white"

    :

  isRecovery

    ?

    "bg-[#111827] text-white"

    :

    "bg-[#0F172A] text-white"

}

`}>

      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#1E293B]" />

      <div className="absolute top-[-120px] right-[-120px] w-[260px] h-[260px] bg-[#D4AF37]/10 rounded-full blur-3xl" />

      {/* CONTENT */}

      <div className="relative z-10">

        {/* LABELS */}

        <div className="flex flex-wrap gap-3">

          <div className="px-4 py-2 rounded-full bg-white/10 text-sm font-medium">

            {

              isExpanded

                ?

                "Expansion Mission"

                :

              isRecovery

                ?

                "Stabilization Mission"

                :

                "Strategic Mission"

            }

          </div>

          <div className="px-4 py-2 rounded-full bg-[#D4AF37] text-[#0F172A] text-sm font-semibold">

            +{generatedMission?.xpReward || 180} XP

          </div>

        </div>

        {/* TITLE */}

        <h2 className="mt-8 text-4xl md:text-5xl font-semibold tracking-tight leading-tight max-w-4xl">

          {

            generatedMission?.title ||

            "Your next strategic move."

          }

        </h2>

        {/* DESCRIPTION */}

        <p className="mt-6 text-white/75 text-lg leading-relaxed whitespace-pre-line max-w-3xl">

          {

            generatedMission?.description ||

            "Generate a mission designed to sharpen your direction, increase capability and move your life forward meaningfully."

          }

        </p>

        {/* BUTTONS */}

        <div className="mt-10 flex flex-wrap gap-4">

          <button

            onClick={
              handleGenerateMission
            }

            disabled={loading}

            className="px-7 py-4 rounded-2xl bg-[#D4AF37] text-[#0F172A] font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"

          >

            {

              loading

                ?

                "Generating..."

                :

                "Generate New Mission"

            }

          </button>

          <button

            onClick={
              handleCompleteMission
            }

            className="px-6 py-4 rounded-2xl bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-all"

          >

            Completed

          </button>

          <button

            onClick={
              handleStruggleMission
            }

            className="px-6 py-4 rounded-2xl bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-all"

          >

            Struggling

          </button>

          <button

            onClick={
              handleSkipMission
            }

            className="px-6 py-4 rounded-2xl bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-all"

          >

            Skip

          </button>

        </div>

        {/* FEEDBACK */}

        {

          outcomeState && (

            <div className="mt-8 rounded-3xl bg-white/10 border border-white/10 p-5">

              <p className="text-white/80 leading-relaxed">

                {

                  outcomeState ===
                  "completed"

                    ?

                    "Execution recorded. Your adaptive system is recognizing increasing behavioral momentum and capability growth."

                    :

                  outcomeState ===
                  "struggling"

                    ?

                    "Resistance detected. Future missions may rebalance complexity while preserving meaningful forward movement."

                    :

                    "Mission skipped. The system will recalibrate challenge intensity and execution pacing."

                }

              </p>

            </div>

          )

        }

      </div>

    </section>

  );

}