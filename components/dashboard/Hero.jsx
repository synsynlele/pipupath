"use client";

export default function Hero({

  profile,

  orchestration,

}) {

  // =========================
  // USER DATA
  // =========================

  const archetype =
    profile?.archetype ||

    "Builder";

  const streak =
    profile?.streak || 0;

  const momentum =
    profile?.momentum || 50;

  // =========================
  // STRATEGIC STATES
  // =========================

  let strategicState =
    "Identity Expansion";

  let strategicNarrative =

    "Your current trajectory suggests active developmental movement and increasing awareness of the future you are trying to build.";

  let executionPressure =

    "Execution consistency will determine whether your ambition compounds or remains unrealized potential.";

  // =========================
  // BUILDER
  // =========================

  if (
    archetype === "Builder"
  ) {

    strategicState =
      "Capability Construction";

    strategicNarrative =

      "You are in a phase where long-term advantage will come from building real capability, disciplined execution and meaningful output under imperfect conditions.";

    executionPressure =

      "Avoid passive consumption. Your future will be shaped by what you repeatedly build, not what you repeatedly plan.";

  }

  // =========================
  // LEADER
  // =========================

  if (
    archetype === "Leader"
  ) {

    strategicState =
      "Responsibility Expansion";

    strategicNarrative =

      "Your trajectory suggests increasing leadership capacity, but leadership is earned through responsibility, initiative and reliable execution under pressure.";

    executionPressure =

      "Do not wait for ideal conditions. Leadership develops when you create structure before certainty exists.";

  }

  // =========================
  // EXPLORER
  // =========================

  if (
    archetype === "Explorer"
  ) {

    strategicState =
      "Directional Discovery";

    strategicNarrative =

      "Your current stage requires expanding exposure, testing possibilities and transforming curiosity into real-world movement.";

    executionPressure =

      "Exploration without execution eventually becomes disguised avoidance. Convert curiosity into experience.";

  }

  // =========================
  // STRATEGIST
  // =========================

  if (
    archetype === "Strategist"
  ) {

    strategicState =
      "Leverage Mapping";

    strategicNarrative =

      "Your thinking patterns suggest strong strategic potential, but long-term advantage requires converting analysis into decisive execution.";

    executionPressure =

      "Clarity without movement creates intellectual stagnation. Use insight to accelerate action.";

  }

  // =========================
  // CREATOR
  // =========================

  if (
    archetype === "Creator"
  ) {

    strategicState =
      "Creative Expansion";

    strategicNarrative =

      "Your trajectory suggests growing creative identity and originality, but your next stage requires courageous output consistency.";

    executionPressure =

      "Perfectionism quietly destroys momentum. Publish, create and refine through repetition.";

  }

  // =========================
  // MOMENTUM STATES
  // =========================

  if (
    streak >= 7
  ) {

    strategicNarrative +=

      " Your recent momentum suggests increasing behavioral consistency and greater execution reliability.";

  }

  if (
    streak <= 2
  ) {

    executionPressure =

      "Your current challenge is not potential. It is rebuilding execution consistency through smaller but unavoidable actions.";

  }

  // =========================
  // MOMENTUM LABEL
  // =========================

  let momentumState =
    "Emerging Momentum";

  if (
    momentum >= 70
  ) {

    momentumState =
      "High Execution Momentum";

  }

  if (
    momentum <= 35
  ) {

    momentumState =
      "Momentum Recovery Phase";

  }

  return (

    <section className="relative overflow-hidden rounded-[42px] border border-[#E2E8F0] bg-[#0F172A] text-white p-8 md:p-10 shadow-[0_20px_80px_rgba(15,23,42,0.18)]">

      {/* BACKGROUND */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-[-120px] right-[-120px] w-[320px] h-[320px] rounded-full bg-[#D4AF37]/10 blur-3xl" />

        <div className="absolute bottom-[-120px] left-[-120px] w-[320px] h-[320px] rounded-full bg-white/5 blur-3xl" />

      </div>

      {/* CONTENT */}

      <div className="relative z-10">

        {/* TOP */}

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">

          {/* LEFT */}

          <div className="max-w-4xl">

            <p className="text-[11px] uppercase tracking-[0.35em] text-white/40 font-medium">

              Strategic Command Center

            </p>

            <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-none">

              {strategicState}

            </h1>

            <p className="mt-8 text-lg md:text-xl leading-relaxed text-white/75 max-w-3xl">

              {strategicNarrative}

            </p>

          </div>

          {/* RIGHT */}

          <div className="grid grid-cols-2 gap-4 min-w-[280px]">

            {/* ARCHETYPE */}

            <div className="rounded-3xl bg-white/5 border border-white/10 p-5 backdrop-blur-xl">

              <p className="text-xs uppercase tracking-[0.2em] text-white/40">

                Archetype

              </p>

              <p className="mt-4 text-2xl font-semibold">

                {archetype}

              </p>

            </div>

            {/* MOMENTUM */}

            <div className="rounded-3xl bg-white/5 border border-white/10 p-5 backdrop-blur-xl">

              <p className="text-xs uppercase tracking-[0.2em] text-white/40">

                Momentum

              </p>

              <p className="mt-4 text-2xl font-semibold">

                {momentumState}

              </p>

            </div>

            {/* STREAK */}

            <div className="rounded-3xl bg-white/5 border border-white/10 p-5 backdrop-blur-xl">

              <p className="text-xs uppercase tracking-[0.2em] text-white/40">

                Execution Streak

              </p>

              <p className="mt-4 text-5xl font-semibold">

                {streak}

              </p>

            </div>

            {/* TRAJECTORY */}

            <div className="rounded-3xl bg-[#D4AF37] text-[#0F172A] p-5">

              <p className="text-xs uppercase tracking-[0.2em] text-[#0F172A]/60">

                Trajectory

              </p>

              <p className="mt-4 text-2xl font-semibold leading-tight">

                Forward Expansion

              </p>

            </div>

          </div>

        </div>

        {/* EXECUTION PRESSURE */}

        <div className="mt-10 rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-6">

          <p className="text-xs uppercase tracking-[0.25em] text-white/40">

            Execution Pressure

          </p>

          <p className="mt-5 text-lg leading-relaxed text-white/80">

            {executionPressure}

          </p>

        </div>

      </div>

    </section>

  );

}