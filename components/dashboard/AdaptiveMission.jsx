"use client";

import { useState }
from "react";

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
  // GENERATE AI MISSION
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

                  "Explorer",

                aspirations:
                  profile?.aspirations ||

                  "The user wants to build a more successful and organized life.",

                momentum:
                  profile?.momentum ||

                  "Rebuilding",

                emotionalState:
                  profile?.last_cognitive_state ||

                  "Uncertain",

                missionMode:
                  orchestration
                    ?.missionMode ||

                  "standard",
              }),
          }
        );

      const data =
        await response.json();

      setGeneratedMission({

        title:
          "Adaptive Mission",

        description:
          data?.mission ||

          "Clarify one meaningful direction you want your life to move toward this week and take one visible action toward it today.",

        type:
          orchestration
            ?.missionMode ||

          "adaptive",

        xpReward: 120,
      });

    }

    catch (error) {

      console.error(error);

    }

    finally {

      setLoading(false);
    }
  }

  // =========================
  // UI
  // =========================

  return (

    <section className={`mt-10 relative overflow-hidden rounded-[36px] p-8 md:p-10 shadow-[0_10px_60px_rgba(15,23,42,0.15)] transition-all duration-700

${isRecovery
  ? "bg-[#1E293B] text-white"
  : isExpanded
  ? "bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#2B3445] text-white"
  : isSimplified
  ? "bg-[#111827] text-white"
  : "bg-[#0F172A] text-white"
}`}>

      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#1E293B]" />

      <div className={`absolute top-[-120px] right-[-120px] w-[260px] h-[260px] rounded-full blur-3xl

${isRecovery
  ? "bg-[#CBD5E1]/10"
  : isExpanded
  ? "bg-[#D4AF37]/20"
  : isSimplified
  ? "bg-[#64748B]/10"
  : "bg-[#D4AF37]/10"
}`}
/>

      {/* CONTENT */}

      <div className="relative z-10">

        {/* TOP TAGS */}

        <div className="flex flex-wrap items-center gap-3">

          <div className="px-4 py-2 rounded-full bg-white/10 text-sm font-medium">

            {isRecovery
  ? "Recovery Mission"
  : isExpanded
  ? "Expansion Mission"
  : isSimplified
  ? "Stabilization Mission"
  : "Adaptive Mission"}

          </div>

          <div className="px-4 py-2 rounded-full bg-[#D4AF37] text-[#0F172A] text-sm font-semibold">

            +{generatedMission?.xpReward || 120} XP

          </div>

          <div className="px-4 py-2 rounded-full bg-white/10 text-sm capitalize">

            {orchestration?.missionMode || "standard"} mode

          </div>

        </div>

        {/* TITLE */}

        <h2 className="mt-8 text-4xl md:text-5xl font-semibold tracking-tight leading-tight max-w-3xl">

          {generatedMission?.title ||

            "Generate Your Next Mission"}

        </h2>

        {/* DESCRIPTION */}

        <p className="mt-6 text-white/70 leading-relaxed text-lg max-w-2xl whitespace-pre-line">

          {generatedMission?.description ||

            "Request an adaptive mission designed to help you regain clarity, build momentum and move your life forward intentionally."}

        </p>

        {/* ACTIONS */}

        <div className="mt-10 flex flex-wrap items-center gap-4">

          <button

            onClick={
              handleGenerateMission
            }

            disabled={loading}

            className="px-7 py-4 rounded-2xl bg-[#D4AF37] text-[#0F172A] font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >

            {loading

              ? "Generating..."

              : "Generate Mission"}

          </button>

          <p className="text-sm text-white/40 max-w-md leading-relaxed">

            Adaptive missions are generated intentionally to help organize your momentum, capability and direction.

          </p>

        </div>

        {/* ADAPTIVE STATE */}

        <div className="mt-10 grid md:grid-cols-3 gap-4">

          <div className="rounded-3xl bg-white/5 border border-white/10 p-5">

            <p className="text-xs uppercase tracking-[0.2em] text-white/40">

              Mission Type

            </p>

            <h3 className="mt-3 text-2xl font-semibold capitalize">

              {generatedMission?.type ||

                "adaptive"}

            </h3>

          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-5">

            <p className="text-xs uppercase tracking-[0.2em] text-white/40">

              Guidance

            </p>

            <h3 className="mt-3 text-2xl font-semibold capitalize">

              {orchestration?.guidanceMode ||

                "balanced"}

            </h3>

          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-5">

            <p className="text-xs uppercase tracking-[0.2em] text-white/40">

              Cognitive Load

            </p>

            <h3 className="mt-3 text-2xl font-semibold capitalize">

              {orchestration?.cognitiveLoad ||

                "normal"}

            </h3>

          </div>

        </div>

      </div>

    </section>
  );
}