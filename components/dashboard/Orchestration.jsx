export default function Orchestration({

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

  const cardStyle = `rounded-[28px] border backdrop-blur-xl p-6 shadow-[0_10px_50px_rgba(15,23,42,0.05)] transition-all duration-700

${isRecovery
  ? "border-[#CBD5E1] bg-[#F8FAFC]/90"
  : isExpanded
  ? "border-[#F4E7B8] bg-gradient-to-br from-[#FFFDF7] to-[#FFFFFF]"
  : isSimplified
  ? "border-[#E5E7EB] bg-white/90"
  : "border-white/60 bg-white/80"
}`;

  return (

    <section className="mt-10">

      <div>

        <p className="text-[11px] uppercase tracking-[0.35em] text-[#94A3B8] font-medium">

          Adaptive Environment

        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0F172A]">

          {isRecovery
            ? "Recovery adaptation"
            : isExpanded
            ? "Expansion adaptation"
            : isSimplified
            ? "Stabilization adaptation"
            : "System adaptation"}

        </h2>

      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">

        {/* MISSION MODE */}

        <div className={cardStyle}>

          <p className="text-xs uppercase tracking-[0.25em] text-[#94A3B8]">

            Mission Mode

          </p>

          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[#0F172A] capitalize">

            {orchestration?.missionMode || "standard"}

          </h3>

          <p className="mt-4 text-[#475569] leading-relaxed">

            The platform adapts mission intensity dynamically based on your behavioral state.

          </p>

        </div>

        {/* GUIDANCE MODE */}

        <div className={cardStyle}>

          <p className="text-xs uppercase tracking-[0.25em] text-[#94A3B8]">

            Guidance Mode

          </p>

          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[#0F172A] capitalize">

            {orchestration?.guidanceMode || "balanced"}

          </h3>

          <p className="mt-4 text-[#475569] leading-relaxed">

            Guidance style changes adaptively to support sustainable growth and stability.

          </p>

        </div>

        {/* COGNITIVE LOAD */}

        <div className={cardStyle}>

          <p className="text-xs uppercase tracking-[0.25em] text-[#94A3B8]">

            Cognitive Load

          </p>

          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[#0F172A] capitalize">

            {orchestration?.cognitiveLoad || "normal"}

          </h3>

          <p className="mt-4 text-[#475569] leading-relaxed">

            Cognitive complexity adjusts dynamically to reduce overload and improve alignment.

          </p>

        </div>

        {/* STABILITY */}

        <div className={cardStyle}>

          <p className="text-xs uppercase tracking-[0.25em] text-[#94A3B8]">

            Stability State

          </p>

          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[#0F172A]">

            {orchestration?.stabilizationRequired
              ? "Stabilization Active"
              : "Stable Alignment"}

          </h3>

          <p className="mt-4 text-[#475569] leading-relaxed">

            Adaptive stabilization systems help maintain sustainable long-term behavioral growth.

          </p>

        </div>

      </div>

    </section>
  );
}