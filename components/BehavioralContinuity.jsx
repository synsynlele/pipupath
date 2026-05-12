export default function BehavioralContinuity() {

  const continuity = [

    {
      title:
        "Persistent Adaptation",

      description:
        "Your environment evolves based on recovery patterns, growth momentum and behavioral rhythm over time.",
    },

    {
      title:
        "Longitudinal Awareness",

      description:
        "The platform recognizes transitions, stabilization cycles and evolving behavioral capacity across sessions.",
    },

    {
      title:
        "Intelligent Escalation",

      description:
        "Challenge increases intentionally as alignment, resilience and consistency strengthen sustainably.",
    },

  ];

  return (

    <section className="px-6 py-24 md:px-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="max-w-3xl">

          <p className="text-sm font-medium text-[#B88A00]">

            Behavioral Continuity

          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-[#0F172A]">

            Growth intelligence that evolves over time.

          </h2>

          <p className="mt-6 text-lg text-[#64748B] leading-relaxed">

            PipuPath continuously adapts based on behavioral history, stabilization patterns, momentum shifts and long-term personal evolution.

          </p>

        </div>

        {/* CONTINUITY GRID */}

        <div className="grid md:grid-cols-3 gap-6 mt-14">

          {continuity.map((item) => (

            <div
              key={item.title}
              className="rounded-[32px] border border-[#E2E8F0] bg-white/80 backdrop-blur-xl p-8 shadow-[0_10px_40px_rgba(15,23,42,0.04)]"
            >

              <div className="w-12 h-12 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center text-lg font-semibold">

                •

              </div>

              <h3 className="mt-6 text-2xl font-semibold text-[#0F172A] leading-tight">

                {item.title}

              </h3>

              <p className="mt-4 text-[#64748B] leading-relaxed">

                {item.description}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}