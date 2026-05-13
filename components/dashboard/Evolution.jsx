export default function Evolution({

  evolutionInsights = [],

  orchestration,

  recentMemories = [],

  recentMissions = [],

}) {

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
  // CARD STYLE
  // =========================

  const cardStyle = `

rounded-[28px]
border
backdrop-blur-xl
p-6
shadow-[0_10px_50px_rgba(15,23,42,0.05)]
transition-all
duration-700

${

  isRecovery

    ?

    "border-[#CBD5E1] bg-[#F8FAFC]/90"

    :

  isExpanded

    ?

    "border-[#F4E7B8] bg-gradient-to-br from-[#FFFDF7] to-[#FFFFFF]"

    :

  isSimplified

    ?

    "border-[#E5E7EB] bg-white/90"

    :

    "border-white/60 bg-gradient-to-br from-[#FFFFFF] to-[#F8FAFC]"

}

`;

  // =========================
  // BEHAVIORAL INSIGHTS
  // =========================

  const behavioralSignals = [];

  // =========================
  // MISSION PATTERNS
  // =========================

  const completedCount =

    recentMemories.filter(

      (memory) =>

        memory.memory_type ===
        "mission_completion"

    ).length;

  const struggleCount =

    recentMemories.filter(

      (memory) =>

        memory.memory_type ===
        "mission_struggle"

    ).length;

  const skipCount =

    recentMemories.filter(

      (memory) =>

        memory.memory_type ===
        "mission_skip"

    ).length;

  // =========================
  // DETECT PATTERNS
  // =========================

  if (
    completedCount >= 3
  ) {

    behavioralSignals.push({

      type:
        "Momentum",

      title:
        "Consistent mission execution detected",

      message:
        "Your recent behavioral patterns suggest growing consistency and execution stability.",

    });

  }

  if (
    struggleCount >= 2
  ) {

    behavioralSignals.push({

      type:
        "Recovery",

      title:
        "Cognitive resistance patterns detected",

      message:
        "Recent behavioral activity suggests periods of mental friction and execution resistance.",

    });

  }

  if (
    skipCount >= 2
  ) {

    behavioralSignals.push({

      type:
        "Pacing",

      title:
        "Adaptive pacing recalibration emerging",

      message:
        "The system is detecting patterns suggesting reduced pressure and simplified pacing may improve consistency.",

    });

  }

  // =========================
  // MAGICPEN PATTERNS
  // =========================

  const magicPenSignals =

    recentMemories.filter(

      (memory) =>

        memory.memory_type ===
        "magicpen_signal"

    );

  if (
    magicPenSignals.length >= 3
  ) {

    behavioralSignals.push({

      type:
        "Clarity",

      title:
        "Reflective cognition increasing",

      message:
        "Your recent writing patterns suggest deeper self-awareness and stronger reflective processing.",

    });

  }

  // =========================
  // COMBINED INSIGHTS
  // =========================

  const combinedInsights = [

    ...behavioralSignals,

    ...evolutionInsights,

  ];

  return (

    <section className="mt-10">

      {/* HEADER */}

      <div>

        <p className="text-[11px] uppercase tracking-[0.35em] text-[#94A3B8] font-medium">

          Evolution Intelligence

        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0F172A]">

          {

            isRecovery

              ?

              "Stabilization trajectory"

              :

            isExpanded

              ?

              "Expansion trajectory"

              :

            isSimplified

              ?

              "Consistency trajectory"

              :

              "Behavioral trajectory"

          }

        </h2>

        <p className="mt-4 text-[#64748B] leading-relaxed max-w-2xl">

          Your adaptive environment is continuously learning from patterns, momentum, cognition and behavioral movement over time.

        </p>

      </div>

      {/* EVOLUTION FEED */}

      <div className="grid gap-4 mt-8">

        {

          combinedInsights.length === 0

            ?

            (

              <div className={cardStyle}>

                <h3 className="text-2xl font-semibold tracking-tight text-[#0F172A]">

                  Your evolution timeline is beginning.

                </h3>

                <p className="mt-4 text-[#475569] leading-relaxed">

                  As you reflect, write, complete missions and interact with the adaptive ecosystem, the platform will begin detecting meaningful behavioral patterns and long-term growth signals.

                </p>

              </div>

            )

            :

            (

              combinedInsights.map(

                (insight, index) => (

                  <div
                    key={index}
                    className={cardStyle}
                  >

                    {/* TYPE */}

                    <span className="text-xs px-3 py-1 rounded-full border bg-[#F8FAFC] text-[#475467] border-[#E2E8F0]">

                      {insight.type}

                    </span>

                    {/* TITLE */}

                    <h3 className="mt-5 text-2xl font-semibold tracking-tight text-[#0F172A] leading-tight">

                      {insight.title}

                    </h3>

                    {/* MESSAGE */}

                    <p className="mt-4 text-[#475569] leading-relaxed">

                      {

                        isRecovery

                          ?

                          `${insight.message} Sustainable growth often requires intentional stabilization periods.`

                          :

                        isExpanded

                          ?

                          `${insight.message} Your recent trajectory suggests readiness for expanded challenge and growth.`

                          :

                        isSimplified

                          ?

                          `${insight.message} Simpler systems may strengthen long-term consistency and alignment.`

                          :

                          insight.message

                      }

                    </p>

                  </div>

                )

              )

            )

        }

      </div>

      {/* SYSTEM FOOTNOTE */}

      <div className="mt-8 rounded-[24px] border border-[#E2E8F0] bg-white/70 backdrop-blur-xl p-5">

        <p className="text-sm leading-relaxed text-[#64748B]">

          Evolution Intelligence detects long-term behavioral movement patterns using reflections, cognitive writing, mission outcomes and adaptive pacing signals.

        </p>

      </div>

    </section>

  );

}