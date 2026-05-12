export default function Hero({

  profile,

  orchestration,

}) {

  const missionMode =
    orchestration?.missionMode || "standard";

  const isRecovery =
    missionMode === "recovery";

  const isExpanded =
    missionMode === "expanded";

  const isSimplified =
    missionMode === "simplified";

  const environmentIntensity =
    orchestration?.environmentIntensity ||

    "balanced";

  const isSoft =
    environmentIntensity === "soft";

  const isMinimal =
    environmentIntensity === "minimal";

  const isElevated =
    environmentIntensity === "elevated";

const guidanceEscalation =

  orchestration?.guidanceEscalation ||

  "stable";

const isIntentional =

  guidanceEscalation === "intentional";

const isGrowthElevated =

  guidanceEscalation === "elevated";

const transitionState =

  orchestration?.transitionState ||

  "stable";

const isRecovering =

  transitionState === "recovering";

const isStabilizing =

  transitionState === "stabilizing";

const isAscending =

  transitionState === "ascending";

  return (

    <section className={`relative overflow-hidden rounded-[36px] border backdrop-blur-xl p-6 md:p-10 shadow-[0_10px_50px_rgba(15,23,42,0.06)] transition-all duration-700

${isSoft
  ? "bg-[#F8FAFC]/95 border-[#E2E8F0]"
  : isMinimal
  ? "bg-[#FFFFFF]/85 border-[#E5E7EB]"
  : isElevated
  ? "bg-gradient-to-br from-[#FFFDF7] to-[#F8FAFC] border-[#F4E7B8]"
  : isRecovery
  ? "bg-[#F8FAFC]/90 border-[#E2E8F0]"
  : isExpanded
  ? "bg-gradient-to-br from-[#FFFDF7] to-[#F8FAFC] border-[#F4E7B8]"
  : isSimplified
  ? "bg-[#FFFFFF]/80 border-[#E5E7EB]"
  : "bg-white/70 border-white/60"
}`}>

      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-gradient-to-br from-[#FFFFFF] via-[#FAFAF9] to-[#F8FAFC]" />

      <div className={`absolute top-[-120px] right-[-120px] w-[260px] h-[260px] rounded-full blur-3xl

${isRecovery
  ? "bg-[#CBD5E1]/20"
  : isExpanded
  ? "bg-[#D4AF37]/20"
  : isSimplified
  ? "bg-[#E5E7EB]/30"
  : "bg-[#D4AF37]/10"
}`}
/>

      {/* CONTENT */}

      <div className="relative z-10">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">

          {/* LEFT */}

          <div className="max-w-2xl">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 text-[#B88A00] text-sm font-medium">

              {isRecovering
  ? "Recovery Transition Environment"

  : isStabilizing
  ? "Behavioral Stabilization Environment"

  : isAscending
  ? "Expansion Transition Environment"

  : isSoft
  ? "Soft Recovery Environment"

  : isMinimal
  ? "Minimal Cognitive Environment"

  : isElevated
  ? "Elevated Growth Environment"

  : isRecovery
  ? "Adaptive Recovery Environment"

  : isExpanded
  ? "Growth Expansion Environment"

  : isSimplified
  ? "Behavioral Stabilization Environment"

  : "Adaptive Human Development"}

            </div>

            <h1 className="mt-6 text-5xl md:text-6xl font-semibold tracking-tight leading-none text-[#0F172A]">

              {isAscending

  ?

  `${profile?.archetype || "Explorer"} Ascending`

  : isStabilizing

  ?

  `${profile?.archetype || "Explorer"} Stabilizing`

  : isRecovering

  ?

  `${profile?.archetype || "Explorer"} Recovering`

  : isGrowthElevated

  ?

  `${profile?.archetype || "Explorer"} Ascending`

  : isIntentional

  ?

  `${profile?.archetype || "Explorer"} Evolving`

  :

  profile?.archetype || "Explorer"}

            </h1>

            <p className="mt-6 text-lg text-[#475569] leading-relaxed max-w-xl">

              Sustainable transformation emerges from aligned behavior repeated consistently over time.

            </p>

            {/* ORCHESTRATION */}

            <div className="mt-8 flex flex-wrap items-center gap-3">

              <div className="px-4 py-2 rounded-full bg-[#0F172A] text-white text-sm font-medium capitalize">

                {orchestration?.missionMode || "standard"} mode

              </div>

              <div className="px-4 py-2 rounded-full bg-white border border-[#E2E8F0] text-[#0F172A] text-sm font-medium capitalize">

                {orchestration?.guidanceMode || "balanced"} guidance

              </div>

              <div className="px-4 py-2 rounded-full bg-white border border-[#E2E8F0] text-[#0F172A] text-sm font-medium capitalize">

                {orchestration?.cognitiveLoad || "normal"} cognitive load

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="grid grid-cols-3 gap-3 w-full lg:w-auto">

            <div className="rounded-3xl bg-[#0F172A] text-white p-5 min-w-[110px]">

              <p className="text-xs uppercase tracking-[0.2em] text-white/60">

                XP

              </p>

              <h3 className="mt-3 text-3xl font-semibold">

                {profile?.xp || 0}

              </h3>

            </div>

            <div className="rounded-3xl bg-white border border-[#E2E8F0] p-5 min-w-[110px]">

              <p className="text-xs uppercase tracking-[0.2em] text-[#94A3B8]">

                Streak

              </p>

              <h3 className="mt-3 text-3xl font-semibold text-[#D4AF37]">

                {profile?.streak || 0}

              </h3>

            </div>

            <div className="rounded-3xl bg-white border border-[#E2E8F0] p-5 min-w-[110px]">

              <p className="text-xs uppercase tracking-[0.2em] text-[#94A3B8]">

                Momentum

              </p>

              <h3 className="mt-3 text-3xl font-semibold text-[#16A34A]">

                {profile?.momentum || 0}%

              </h3>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}