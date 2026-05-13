export default function BehavioralContinuity() {

  const continuity = [

    {
      title:
        "Momentum Recovery",

      description:
        "Growth is rarely perfect or linear. When users lose focus, become overwhelmed or slow down, the platform helps them reconnect, reorganize and continue moving forward without starting from zero again.",
    },

    {
      title:
        "Capability Compounding",

      description:
        "Small consistent missions gradually develop real-world capability over time — including communication, execution, discipline, learning, leadership and long-term resilience.",
    },

    {
      title:
        "Becoming Over Time",

      description:
        "PipuPath is designed to help people continuously evolve into more capable, focused and meaningful versions of themselves through intentional growth and adaptive support.",
    },

  ];

  return (

    <section className="px-6 py-24 md:px-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="max-w-3xl">

          <p className="text-sm font-medium text-[#B88A00]">

            Long-Term Growth

          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-[#0F172A]">

            Real growth continues

            <span className="block mt-2">

              even through instability.

            </span>

          </h2>

          <p className="mt-6 text-lg text-[#64748B] leading-relaxed">

            Most people do not fail because they lack potential. They fail because growth becomes inconsistent, unsupported and fragmented over time. PipuPath helps users maintain direction, rebuild momentum and continue becoming more capable through every stage of their journey.

          </p>

        </div>

        {/* GRID */}

        <div className="grid md:grid-cols-3 gap-6 mt-14">

          {continuity.map((item) => (

            <div
              key={item.title}
              className="rounded-[32px] border border-[#E2E8F0] bg-white/80 backdrop-blur-xl p-8 shadow-[0_10px_40px_rgba(15,23,42,0.04)] transition-all duration-300 hover:translate-y-[-4px]"
            >

              {/* ICON */}

              <div className="w-12 h-12 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center text-lg font-semibold">

                •

              </div>

              {/* TITLE */}

              <h3 className="mt-6 text-2xl font-semibold text-[#0F172A] leading-tight">

                {item.title}

              </h3>

              {/* DESCRIPTION */}

              <p className="mt-4 text-[#64748B] leading-relaxed">

                {item.description}

              </p>

            </div>

          ))}

        </div>

        {/* BOTTOM MESSAGE */}

        <div className="mt-16 max-w-3xl">

          <p className="text-base md:text-lg leading-relaxed text-[#94A3B8]">

            The goal is not temporary motivation. The goal is helping people gradually organize themselves into humans capable of building meaningful futures, meaningful work and meaningful contribution over the long term.

          </p>

        </div>

      </div>

    </section>
  );
}