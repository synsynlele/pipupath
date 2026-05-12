export default function Evolution({

  evolutionInsights = [],

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
  : "border-white/60 bg-gradient-to-br from-[#FFFFFF] to-[#F8FAFC]"
}`;

  return (

    <section className="mt-10">

      <div>

        <p className="text-[11px] uppercase tracking-[0.35em] text-[#94A3B8] font-medium">

          Evolution Intelligence

        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0F172A]">

          {isRecovery
            ? "Stabilization trajectory"
            : isExpanded
            ? "Expansion trajectory"
            : isSimplified
            ? "Consistency trajectory"
            : "Growth trajectory"}

        </h2>

      </div>

      <div className="grid gap-4 mt-6">

        {evolutionInsights.map((insight, index) => (

          <div
            key={index}
            className={cardStyle}
          >

            <span className="text-xs px-3 py-1 rounded-full border bg-[#F8FAFC] text-[#475467] border-[#E2E8F0]">

              {insight.type}

            </span>

            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-[#0F172A] leading-tight">

              {insight.title}

            </h3>

            <p className="mt-4 text-[#475569] leading-relaxed">

              {isRecovery
                ? `${insight.message} Sustainable growth often requires intentional stabilization periods.`
                : isExpanded
                ? `${insight.message} Your recent trajectory suggests readiness for expanded challenge and growth.`
                : isSimplified
                ? `${insight.message} Simpler systems may strengthen long-term consistency and alignment.`
                : insight.message}

            </p>

          </div>

        ))}

      </div>

    </section>
  );
}