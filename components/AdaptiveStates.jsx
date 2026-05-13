export default function AdaptiveStates() {

  const states = [

    {
      title:
        "Searching",

      description:
        "Many ambitious people are not lazy — they are directionless, overwhelmed and mentally scattered. PipuPath helps organize uncertainty into clarity, structure and forward movement.",
    },

    {
      title:
        "Stabilizing",

      description:
        "As momentum begins rebuilding, the environment reduces friction and helps users develop consistency, focus and emotional steadiness without overwhelming pressure.",
    },

    {
      title:
        "Building",

      description:
        "Once clarity and rhythm strengthen, missions evolve into capability development — helping users build discipline, communication, execution, learning and real-world leverage.",
    },

    {
      title:
        "Expanding",

      description:
        "As capability compounds, the platform helps users think bigger, create meaningful work, develop leadership and become people capable of building impact beyond themselves.",
    },

  ];

  return (

    <section className="px-6 py-24 md:px-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="max-w-3xl">

          <p className="text-sm font-medium text-[#B88A00]">

            The Journey of Becoming

          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-[#0F172A]">

            Growth is not linear.

            <span className="block mt-2">

              Becoming capable takes stages.

            </span>

          </h2>

          <p className="mt-6 text-lg text-[#64748B] leading-relaxed">

            PipuPath adapts to where a person currently is — helping them move from confusion and inconsistency toward clarity, capability, meaningful contribution and long-term growth.

          </p>

        </div>

        {/* STATES */}

        <div className="grid md:grid-cols-2 gap-6 mt-16">

          {states.map((state) => (

            <div
              key={state.title}
              className="group rounded-[32px] border border-[#E2E8F0] bg-white/80 backdrop-blur-xl p-8 shadow-[0_10px_40px_rgba(15,23,42,0.04)] transition-all duration-300 hover:translate-y-[-4px]"
            >

              {/* ICON */}

              <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#B88A00] text-lg font-semibold">

                {state.title.charAt(0)}

              </div>

              {/* TITLE */}

              <h3 className="mt-7 text-2xl font-semibold text-[#0F172A]">

                {state.title}

              </h3>

              {/* DESCRIPTION */}

              <p className="mt-5 text-[#64748B] leading-relaxed text-[15px]">

                {state.description}

              </p>

            </div>

          ))}

        </div>

        {/* BOTTOM MESSAGE */}

        <div className="mt-16 max-w-3xl">

          <p className="text-base md:text-lg leading-relaxed text-[#94A3B8]">

            The goal is not perfection. The goal is helping people organize themselves into humans capable of building meaningful futures for themselves, their communities and the world around them.

          </p>

        </div>

      </div>

    </section>
  );
}