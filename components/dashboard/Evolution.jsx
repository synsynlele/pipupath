"use client";

export default function Evolution({

  recentMemories = [],

  recentMissions = [],

  orchestration,

}) {

  // =========================
  // COUNTS
  // =========================

  const completions =

    recentMemories.filter(

      (memory) =>

        memory.memory_type ===
        "mission_completion"

    ).length;

  const struggles =

    recentMemories.filter(

      (memory) =>

        memory.memory_type ===
        "mission_struggle"

    ).length;

  const reflections =

    recentMemories.filter(

      (memory) =>

        memory.memory_type ===
        "reflection"

    ).length;

  const cognitiveSignals =

    recentMemories.filter(

      (memory) =>

        memory.memory_type ===
        "magicpen_signal"

    ).length;

  // =========================
  // EVOLUTION NARRATIVE
  // =========================

  let trajectory =
    "Identity Formation";

  let trajectoryDescription =

    "Your recent behavioral activity suggests active internal development and increasing self-awareness.";

  // =========================
  // EXECUTION
  // =========================

  if (
    completions >= 3
  ) {

    trajectory =
      "Execution Momentum";

    trajectoryDescription =

      "Your recent behavior suggests growing consistency, stronger execution patterns and increasing behavioral reliability.";

  }

  // =========================
  // COGNITIVE EXPANSION
  // =========================

  if (
    cognitiveSignals >= 3
  ) {

    trajectory =
      "Cognitive Expansion";

    trajectoryDescription =

      "Your thinking patterns suggest increasing depth, stronger internal processing and expanding strategic awareness.";

  }

  // =========================
  // REFLECTIVE CLARITY
  // =========================

  if (
    reflections >= 3
  ) {

    trajectory =
      "Clarity Development";

    trajectoryDescription =

      "Your recent reflections suggest active identity refinement and increasing directional clarity.";

  }

  // =========================
  // STRUGGLE
  // =========================

  if (
    struggles >= 3
  ) {

    trajectory =
      "Adaptive Recalibration";

    trajectoryDescription =

      "Your current behavioral signals suggest recalibration between ambition, cognitive load and sustainable execution.";

  }

  // =========================
  // SCORE
  // =========================

  const evolutionScore =

    Math.min(

      100,

      (

        completions * 12 +

        reflections * 8 +

        cognitiveSignals * 10

      ) -

      struggles * 6

    );

  // =========================
  // STAGE
  // =========================

  let stage =
    "Emerging Builder";

  if (
    evolutionScore >= 25
  ) {

    stage =
      "Strategic Explorer";

  }

  if (
    evolutionScore >= 50
  ) {

    stage =
      "Capability Architect";

  }

  if (
    evolutionScore >= 75
  ) {

    stage =
      "Momentum Builder";

  }

  return (

    <section className="mt-8 rounded-[40px] border border-[#E2E8F0] bg-white/80 backdrop-blur-2xl p-8 shadow-[0_10px_50px_rgba(15,23,42,0.04)]">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

        <div>

          <p className="text-xs uppercase tracking-[0.3em] text-[#94A3B8]">

            Evolution Trajectory

          </p>

          <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-[#0F172A]">

            {trajectory}

          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#475569]">

            {trajectoryDescription}

          </p>

        </div>

        {/* SCORE */}

        <div className="rounded-[32px] bg-[#0F172A] text-white px-7 py-6 min-w-[220px]">

          <p className="text-xs uppercase tracking-[0.25em] text-white/50">

            Growth Index

          </p>

          <p className="mt-4 text-5xl font-semibold">

            {evolutionScore}

          </p>

          <p className="mt-3 text-white/70">

            {stage}

          </p>

        </div>

      </div>

      {/* GRID */}

      <div className="grid md:grid-cols-4 gap-4 mt-10">

        {/* EXECUTION */}

        <div className="rounded-3xl border border-[#E2E8F0] bg-[#FAFAFA] p-5">

          <p className="text-xs uppercase tracking-[0.2em] text-[#94A3B8]">

            Missions Completed

          </p>

          <p className="mt-4 text-4xl font-semibold text-[#0F172A]">

            {completions}

          </p>

        </div>

        {/* REFLECTIONS */}

        <div className="rounded-3xl border border-[#E2E8F0] bg-[#FAFAFA] p-5">

          <p className="text-xs uppercase tracking-[0.2em] text-[#94A3B8]">

            Strategic Reflections

          </p>

          <p className="mt-4 text-4xl font-semibold text-[#0F172A]">

            {reflections}

          </p>

        </div>

        {/* COGNITIVE */}

        <div className="rounded-3xl border border-[#E2E8F0] bg-[#FAFAFA] p-5">

          <p className="text-xs uppercase tracking-[0.2em] text-[#94A3B8]">

            Cognitive Expansions

          </p>

          <p className="mt-4 text-4xl font-semibold text-[#0F172A]">

            {cognitiveSignals}

          </p>

        </div>

        {/* RESISTANCE */}

        <div className="rounded-3xl border border-[#E2E8F0] bg-[#FAFAFA] p-5">

          <p className="text-xs uppercase tracking-[0.2em] text-[#94A3B8]">

            Resistance Signals

          </p>

          <p className="mt-4 text-4xl font-semibold text-[#0F172A]">

            {struggles}

          </p>

        </div>

      </div>

      {/* STRATEGIC NOTE */}

      <div className="mt-8 rounded-[32px] bg-[#F8FAFC] border border-[#E2E8F0] p-6">

        <p className="text-sm leading-relaxed text-[#475569]">

          Evolution is not measuring perfection. It is tracking increasing clarity, capability, execution consistency and cognitive expansion over time.

        </p>

      </div>

    </section>

  );

}