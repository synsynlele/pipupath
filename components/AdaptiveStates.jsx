export default function AdaptiveStates() {

  const states = [

    {
      title:
        "Recovery",

      description:
        "When pressure rises, the environment softens. Guidance slows, cognitive load reduces and stabilization becomes the priority.",
    },

    {
      title:
        "Stabilization",

      description:
        "As consistency rebuilds, the system reduces friction and helps create sustainable behavioral rhythm over time.",
    },

    {
      title:
        "Expansion",

      description:
        "When momentum and alignment strengthen, the platform intelligently increases challenge, growth and intentional evolution.",
    },

  ];

  return (

    <section className="px-6 py-24 md:px-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="max-w-2xl">

          <p className="text-sm font-medium text-[#B88A00]">

            Adaptive Intelligence

          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-[#0F172A]">

            A growth environment that adapts with you.

          </h2>

        </div>

        {/* STATES */}

        <div className="grid md:grid-cols-3 gap-6 mt-14">

          {states.map((state) => (

            <div
              key={state.title}
              className="rounded-[32px] border border-[#E2E8F0] bg-white/80 backdrop-blur-xl p-8 shadow-[0_10px_40px_rgba(15,23,42,0.04)]"
            >

              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#B88A00] font-semibold">

                {state.title.charAt(0)}

              </div>

              <h3 className="mt-6 text-2xl font-semibold text-[#0F172A]">

                {state.title}

              </h3>

              <p className="mt-4 text-[#64748B] leading-relaxed">

                {state.description}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}