"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState }
from "react";

import { useRouter }
from "next/navigation";

import { useAuth }
from "../../context/AuthContext";

import { supabase }
from "../../lib/supabase";

import Navigation
from "../../components/Navigation";

import Hero
from "../../components/dashboard/Hero";

import AdaptiveMission
from "../../components/dashboard/AdaptiveMission";

import Evolution
from "../../components/dashboard/Evolution";

import {
  orchestrateAdaptiveState
}
from "../../lib/orchestrator";

import {
  getGuidance
}
from "../../lib/guidance/getGuidance";

import {
  getPacingState
}
from "../../lib/orchestrator/getPacingState";

import {
  generateAdaptiveMission
}
from "../../lib/ai/generateAdaptiveMission";

import {
  submitReflection
}
from "../../lib/reflection/submitReflection";

import {
  getRecentMemories
}
from "../../lib/memory/getRecentMemories";

import {
  getRecentMissions
}
from "../../lib/missions/getRecentMissions";

import {
  getActiveMission
}
from "../../lib/missions/getActiveMission";

import {
  saveActiveMission
}
from "../../lib/missions/saveActiveMission";

import {
  useAdaptiveEnvironment
}
from "../../hooks/useAdaptiveEnvironment";

export default function DashboardPage() {

  const router =
    useRouter();

  const {
    user,
    loading,
  } = useAuth();

  // =========================
  // STATE
  // =========================

  const [
    profile,
    setProfile,
  ] = useState(null);

  const [
    orchestration,
    setOrchestration,
  ] = useState(null);

  const [
    activeMission,
    setActiveMission,
  ] = useState(null);

  const [
    guidance,
    setGuidance,
  ] = useState("");

  const [
    reflection,
    setReflection,
  ] = useState("");

  const [
    submittingReflection,
    setSubmittingReflection,
  ] = useState(false);

  const [
    recentMemories,
    setRecentMemories,
  ] = useState([]);

  const [
    recentMissions,
    setRecentMissions,
  ] = useState([]);

  // =========================
  // BEHAVIORAL STATE
  // =========================

  const streak =
    profile?.streak || 0;

  const isRecoveryState =
    streak < 3;

  const isMomentumState =
    streak >= 7;

  // =========================
  // PACING
  // =========================

  const pacingState =
    getPacingState({

      streak,

      emotionalState:
        profile?.emotional_state,

      momentumState:
        profile?.momentum_state,

    });

  // =========================
  // ENVIRONMENT
  // =========================

  const adaptiveEnvironment =
    useAdaptiveEnvironment({

      profile,

      orchestration,

    });

  // =========================
  // AUTH
  // =========================

  useEffect(() => {

    if (
      !loading &&
      !user
    ) {

      router.push(
        "/login"
      );

    }

  }, [
    user,
    loading,
    router,
  ]);

  // =========================
  // LOAD DASHBOARD
  // =========================

  useEffect(() => {

    async function loadDashboard() {

      if (!user) return;

      // =========================
      // PROFILE
      // =========================

      const {

        data,
        error,

      } = await supabase

        .from("profiles")

        .select("*")

        .eq(
          "id",
          user.id
        )

        .single();

      if (error) {

        console.error(error);

        return;

      }

      // =========================
      // ONBOARDING
      // =========================

      if (
        !data?.onboarding_completed
      ) {

        router.push(
          "/onboarding"
        );

        return;

      }

      setProfile(data);

      // =========================
      // MEMORIES
      // =========================

      const memoryData =
        await getRecentMemories({

          userId:
            user.id,

          limit: 10,

        });

      setRecentMemories(
        memoryData
      );

      // =========================
      // MISSION HISTORY
      // =========================

      const missionHistory =
        await getRecentMissions(
          user.id
        );

      setRecentMissions(
        missionHistory
      );

      // =========================
      // ORCHESTRATION
      // =========================

      const adaptiveState =
        await orchestrateAdaptiveState({

          signals:
            memoryData,

          patterns:
            missionHistory,

          evolutionInsights: [],

          driftSignals: [],

        });

      setOrchestration(
        adaptiveState
      );

      // =========================
      // ACTIVE MISSION
      // =========================

      const existingMission =
        await getActiveMission(
          user.id
        );

      // =========================
      // USE EXISTING
      // =========================

      if (
        existingMission
      ) {

        setActiveMission({

          title:
            existingMission.title,

          description:
            existingMission.description,

          missionType:
            existingMission.mission_type,

          intensity:
            existingMission.intensity,

        });

      }

      // =========================
      // GENERATE NEW
      // =========================

      else {

        const mission =
          await generateAdaptiveMission({

            archetype:
              data.archetype,

            streak:
              data.streak,

            identitySummary:
              data.identity_summary,

            currentFocus:
              data.current_focus,

            recentReflection:
              data.last_reflection,

            recentMemories:
              memoryData,

            recentMissions:
              missionHistory,

            pacingState,

          });

        setActiveMission(
          mission
        );

        // =========================
        // SAVE ACTIVE
        // =========================

        await saveActiveMission({

          userId:
            user.id,

          mission,

        });

      }

      // =========================
      // GUIDANCE
      // =========================

      const adaptiveGuidance =
        getGuidance(data);

      setGuidance(
        adaptiveGuidance
      );

    }

    loadDashboard();

  }, [
    user,
    router,
  ]);

  // =========================
  // REFLECTION SUBMIT
  // =========================

  async function handleReflectionSubmit() {

    if (
      !reflection ||
      !profile
    ) return;

    try {

      setSubmittingReflection(
        true
      );

      // =========================
      // SUBMIT REFLECTION
      // =========================

      const result =
        await submitReflection({

          userId:
            user.id,

          reflection,

          profile,

        });

      if (
        result?.success
      ) {

        // =========================
        // GUIDANCE
        // =========================

        if (
          result.analysis
            ?.guidanceDirection
        ) {

          setGuidance(

            result.analysis
              .guidanceDirection

          );

        }

        // =========================
        // REFRESH MEMORIES
        // =========================

        const updatedMemories =
          await getRecentMemories({

            userId:
              user.id,

            limit: 10,

          });

        setRecentMemories(
          updatedMemories
        );

        // =========================
        // REFRESH MISSIONS
        // =========================

        const updatedMissionHistory =
          await getRecentMissions(
            user.id
          );

        setRecentMissions(
          updatedMissionHistory
        );

      }

      setReflection("");

    } catch (error) {

      console.error(error);

    } finally {

      setSubmittingReflection(
        false
      );

    }

  }

  // =========================
  // LOADING
  // =========================

  if (
    loading ||
    !user ||
    !profile
  ) {

    return (

      <main className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">

        <div className="flex flex-col items-center gap-4">

          <div className="w-14 h-14 rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37] animate-spin" />

          <p className="text-sm text-[#64748B]">

            Preparing your adaptive environment...

          </p>

        </div>

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-[#F5F7FA] text-[#0F172A] overflow-x-hidden">

      {/* NAVIGATION */}

      <Navigation />

      {/* BACKGROUND */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-[#D4AF37]/10 rounded-full blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-[#0F172A]/5 rounded-full blur-3xl" />

      </div>

      {/* CONTENT */}

      <div className={`

relative

${adaptiveEnvironment.contentWidth}

mx-auto

transition-all
duration-700

px-4
md:px-6

${adaptiveEnvironment.containerSpacing}

`}>

        {/* HEADER */}

        <div className="mb-8">

          <p className="text-[11px] uppercase tracking-[0.35em] text-[#94A3B8]">

            PipuPath OS

          </p>

        </div>

        {/* HERO */}

        <Hero

          profile={profile}

          orchestration={orchestration}

        />

        {/* DAILY MISSION */}

        <AdaptiveMission

          activeMission={activeMission}

          orchestration={orchestration}

          profile={profile}

        />

        {/* GUIDANCE */}

        <div className={`

mt-8
rounded-[32px]
border
border-[#E2E8F0]

${

  adaptiveEnvironment.cardStyle ===
  "soft"

    ?

    "bg-[#FCFCFD]"

    :

  adaptiveEnvironment.cardStyle ===
  "elevated"

    ?

    "bg-white"

    :

    "bg-white/80"

}

backdrop-blur-2xl
p-8
shadow-[0_10px_50px_rgba(15,23,42,0.04)]
transition-all
duration-700

${

  isRecoveryState

    ?

    "opacity-90"

    :

  isMomentumState

    ?

    "scale-[1.01]"

    :

    ""

}

`}>

          <p className="text-xs uppercase tracking-[0.3em] text-[#B88A00] mb-5">

            Adaptive Guidance

          </p>

          <h2 className="text-2xl md:text-3xl font-semibold leading-relaxed text-[#0F172A]">

            {guidance}

          </h2>

        </div>

        {/* EVOLUTION */}

        <Evolution

          evolutionInsights={[]}

          orchestration={orchestration}

          recentMemories={recentMemories}

          recentMissions={recentMissions}

        />

        {/* REFLECTION */}

        <div className="mt-8 rounded-[32px] border border-[#E2E8F0] bg-white/80 backdrop-blur-2xl p-8 shadow-[0_10px_50px_rgba(15,23,42,0.04)]">

          <p className="text-xs uppercase tracking-[0.3em] text-[#94A3B8] mb-5">

            Reflection

          </p>

          <textarea

            rows={5}

            value={reflection}

            onChange={(e) =>

              setReflection(
                e.target.value
              )

            }

            placeholder="What feels most important about today?"

            className={`

w-full
rounded-[24px]
border
border-[#E2E8F0]

${

  adaptiveEnvironment.mode ===
  "recovery"

    ?

    "bg-[#FCFCFD]"

    :

    "bg-[#FAFAFA]"

}

p-5
text-[#0F172A]
outline-none
resize-none
focus:border-[#D4AF37]/40
transition-all
duration-500

`}

          />

          <button

            onClick={
              handleReflectionSubmit
            }

            disabled={
              submittingReflection
            }

            className="mt-5 px-6 py-3 rounded-[18px] bg-[#0F172A] text-white text-sm font-medium transition-all hover:opacity-90 disabled:opacity-50"

          >

            {

              submittingReflection

                ?

                "Analyzing Reflection..."

                :

                "Submit Reflection"

            }

          </button>

        </div>

      </div>

    </main>

  );

}