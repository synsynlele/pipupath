export default function Drift({

  driftSignals = [],

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

          Drift Intelligence

        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0F172A]">

          {isRecovery
            ? "Recovery stabilization"
            : isExpanded
            ? "Growth stabilization"
            : isSimplified
            ? "Consistency stabilization"
            : "Stability monitoring"}

        </h2>

      </div>

      <div className="grid gap-4 mt-6">

        {driftSignals.map((drift, index) => (

          <div
            key={index}
            className={cardStyle}
          >

            <span className={`text-xs px-3 py-1 rounded-full border

${drift.level === "positive"
  ? "bg-[#ECFDF3] text-[#027A48] border-[#ABEFC6]"
  : drift.level === "high"
  ? "bg-[#FEF3F2] text-[#B42318] border-[#FECDCA]"
  : "bg-[#F8FAFC] text-[#475467] border-[#E2E8F0]"
}`}>

              {drift.type}

            </span>

            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-[#0F172A] leading-tight">

              {drift.title}

            </h3>

            <p className="mt-4 text-[#475569] leading-relaxed">

              {isRecovery
                ? `${drift.message} Stabilization and reduced pressure should be prioritized right now.`
                : isExpanded
                ? `${drift.message} Sustainable expansion requires maintaining behavioral stability.`
                : isSimplified
                ? `${drift.message} Reduced complexity may improve long-term consistency.`
                : drift.message}

            </p>

          </div>

        ))}

      </div>

    </section>
  );
}