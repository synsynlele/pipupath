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

import Signals
from "../../components/dashboard/Signals";

import Orchestration
from "../../components/dashboard/Orchestration";

import Memory
from "../../components/dashboard/Memory";

import Evolution
from "../../components/dashboard/Evolution";

import Drift
from "../../components/dashboard/Drift";

import { generateMission }
from "../../lib/missions";

import {
  generateBehavioralSignals,
}
from "../../lib/behavior";

import {
  detectBehaviorPatterns,
}
from "../../lib/memory";

import {
  generateEvolutionInsights,
}
from "../../lib/evolution";

import {
  detectBehavioralDrift,
}
from "../../lib/drift";

import {
  orchestrateAdaptiveState,
}
from "../../lib/orchestrator";

export default function DashboardPage() {

  const router = useRouter();

  const { user, loading } =
    useAuth();

  const [profile, setProfile] =
    useState(null);

  const [signals, setSignals] =
    useState([]);

  const [patterns, setPatterns] =
    useState([]);

  const [
    evolutionInsights,
    setEvolutionInsights,
  ] = useState([]);

  const [
    driftSignals,
    setDriftSignals,
  ] = useState([]);

  const [
    orchestration,
    setOrchestration,
  ] = useState(null);

  const [
    activeMission,
    setActiveMission,
  ] = useState(null);

const [
  interventionHistory,
  setInterventionHistory,
] = useState([]);

const environmentDensity =

  orchestration?.environmentDensity ||

  "normal";

const isMinimalDensity =

  environmentDensity === "minimal";

const isReducedDensity =

  environmentDensity === "reduced";

const isExpandedDensity =

  environmentDensity === "expanded";

  // =========================
  // AUTH
  // =========================

  useEffect(() => {

    if (!loading && !user) {

      router.push("/login");
    }

  }, [user, loading, router]);

  // =========================
  // LOAD PROFILE
  // =========================

  useEffect(() => {

    async function loadProfile() {

      if (!user) return;

      const { data, error } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

      if (error) {

        console.error(error);

        return;
      }

      if (
        !data?.onboarding_completed
      ) {

        router.push(
          "/onboarding"
        );

        return;
      }

      setProfile(data);

if (data?.intervention_history) {

  setInterventionHistory(
    data.intervention_history
  );
}

if (data?.adaptive_state) {

  setOrchestration(
    (prev) => ({

      ...prev,

      ...data.adaptive_state,
    }))
}

      // =========================
      // SIGNALS
      // =========================

      const generatedSignals =
        await generateBehavioralSignals({

          reflectionCount:
            data?.reflection_count || 0,

          averageReflectionDepth:
            data?.reflection_depth || 5,

          momentum:
            data?.momentum || 0,

          cognitiveState:
            data?.last_cognitive_state || "",

          clarityScore:
            data?.clarity_score || 5,
        });

      setSignals(
        generatedSignals
      );

      // =========================
      // MEMORY
      // =========================

      const detectedPatterns =
        await detectBehaviorPatterns({

          momentumHistory:
            data?.momentum_history || [],

          cognitiveHistory:
            data?.cognitive_history || [],

          reflectionDepthHistory:
            data?.reflection_depth_history || [],
        });

      setPatterns(
        detectedPatterns
      );

      // =========================
      // EVOLUTION
      // =========================

      const generatedEvolution =
        await generateEvolutionInsights({

          momentumHistory:
            data?.momentum_history || [],

          cognitiveHistory:
            data?.cognitive_history || [],

          reflectionDepthHistory:
            data?.reflection_depth_history || [],

          consistencyHistory:
            data?.consistency_history || [],
        });

      setEvolutionInsights(
        generatedEvolution
      );

      // =========================
      // DRIFT
      // =========================

      const fatigueCount =

        (
          data?.cognitive_history || []
        ).filter(
          (state) =>
            state ===
            "Cognitive Fatigue"
        ).length;

      const detectedDrift =
        await detectBehavioralDrift({

          currentMomentum:
            data?.momentum || 0,

          averageMomentum:

            (
              data
                ?.momentum_history || []
            ).length > 0

              ?

              (
                data
                  .momentum_history
                  .reduce(
                    (a, b) =>
                      a + b,
                    0
                  ) /

                data
                  .momentum_history
                  .length
              )

              : 0,

          currentReflectionDepth:
            data?.reflection_depth || 5,

          averageReflectionDepth:

            (
              data
                ?.reflection_depth_history || []
            ).length > 0

              ?

              (
                data
                  .reflection_depth_history
                  .reduce(
                    (a, b) =>
                      a + b,
                    0
                  ) /

                data
                  .reflection_depth_history
                  .length
              )

              : 0,

          recentCognitiveState:
            data?.last_cognitive_state || "",

          historicalFatigueCount:
            fatigueCount,
        });

      setDriftSignals(
        detectedDrift
      );

      // =========================
      // ORCHESTRATION
      // =========================

      const orchestratedState =
        await orchestrateAdaptiveState({

          signals:
            generatedSignals,

          patterns:
            detectedPatterns,

          evolutionInsights:
            generatedEvolution,

          driftSignals:
            detectedDrift,
        });

      setOrchestration(
        orchestratedState
      );

const generatedHistory = [

  ...(data?.intervention_history || []),

  {
    missionMode:
      orchestratedState?.missionMode,

    guidanceMode:
      orchestratedState?.guidanceMode,

    timestamp:
      Date.now(),
  },

].slice(-20);

setInterventionHistory(
  generatedHistory
);

const recoveryCycles =

  generatedHistory.filter(
    (entry) =>
      entry.missionMode ===
      "recovery"
  ).length;

const expansionCycles =

  generatedHistory.filter(
    (entry) =>
      entry.missionMode ===
      "expanded"
  ).length;

const stabilizationCycles =

  generatedHistory.filter(
    (entry) =>
      entry.missionMode ===
      "simplified"
  ).length;

const pacingProfile = {

  recoveryFrequency:
    recoveryCycles,

  expansionFrequency:
    expansionCycles,

  stabilizationFrequency:
    stabilizationCycles,

  resilienceScore:

    Math.max(
      1,

      expansionCycles -

      recoveryCycles
    ),

};

await supabase
  .from("profiles")
  .update({

    intervention_history:
      generatedHistory,

    adaptive_state: {

      missionMode:
        orchestratedState?.missionMode,

      guidanceMode:
        orchestratedState?.guidanceMode,

      guidanceEscalation:
        orchestratedState?.guidanceEscalation,

      environmentIntensity:
        orchestratedState?.environmentIntensity,

      environmentDensity:
        orchestratedState?.environmentDensity,

      stabilizationRequired:
        orchestratedState?.stabilizationRequired,

      updatedAt:
        Date.now(),
    },

behavioral_pacing:
  pacingProfile,

  })
  .eq("id", user.id);

      // =========================
      // MISSION
      // =========================

     const mission =
  generateMission(

    data,

    orchestratedState,

    generatedSignals,

    generatedHistory
  );

      setActiveMission(
        mission
      );
    }

    loadProfile();

  }, [user, router]);

  // =========================
  // LOADING
  // =========================

  if (loading || !user) {

    return (

      <main className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">

        <div className="flex flex-col items-center gap-4">

          <div className="w-14 h-14 rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37] animate-spin" />

          <p className="text-sm text-[#64748B]">

            Preparing your environment...

          </p>

        </div>

      </main>
    );
  }

  return (

    <main className="min-h-screen bg-[#F5F7FA] text-[#0F172A] overflow-x-hidden">

      <Navigation />

      {/* BACKGROUND */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-[#D4AF37]/10 rounded-full blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-[#0F172A]/5 rounded-full blur-3xl" />

      </div>

      <div className={`relative max-w-6xl mx-auto transition-all duration-700

${isMinimalDensity
  ? "px-4 py-4 md:px-5 md:py-5"
  : isReducedDensity
  ? "px-4 py-5 md:px-6 md:py-6"
  : isExpandedDensity
  ? "px-5 py-8 md:px-8 md:py-10"
  : "px-4 py-6 md:px-6 md:py-8"
}`}>

        {/* HEADER */}

        <div className={`transition-all duration-700

${isMinimalDensity
  ? "mb-4"
  : isReducedDensity
  ? "mb-6"
  : isExpandedDensity
  ? "mb-10"
  : "mb-8"
}`}>

          <p className="text-[11px] uppercase tracking-[0.35em] text-[#94A3B8]">

            PipuPath OS

          </p>

        </div>

        {/* HERO */}

<Hero

  profile={profile}

  orchestration={orchestration}

/>

{/* ADAPTIVE MISSION */}

<AdaptiveMission

  activeMission={activeMission}

  orchestration={orchestration}

/>

<Signals

  signals={signals}

  orchestration={orchestration}

/>

<Orchestration

  orchestration={orchestration}

/>

<Memory

  patterns={patterns}

  orchestration={orchestration}

/>

<Evolution

  evolutionInsights={evolutionInsights}

  orchestration={orchestration}

/>

<Drift

  driftSignals={driftSignals}

  orchestration={orchestration}

/>

</div>

</main>
  );
}