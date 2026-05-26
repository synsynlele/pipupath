export default function BehavioralContinuity() {

  const cards = [

    {
      title:"Momentum Recovery",

      description:
      "Growth is rarely perfect. When people lose focus or become overwhelmed, PipuPath helps them get moving again."
    },

    {
      title:"Skill Growth Over Time",

      description:
      "Small actions repeated consistently slowly become stronger skills and stronger habits."
    },

    {
      title:"Becoming Better Every Day",

      description:
      "PipuPath helps people continue growing into stronger, more capable and more meaningful versions of themselves."
    }

  ];

  return (

    <section className="px-6 py-24 md:px-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="max-w-4xl">

          <p className="text-sm font-medium text-yellow-400">

            Long-Term Growth

          </p>

          <h2 className="mt-4 text-4xl md:text-6xl font-bold leading-tight text-white">

            Real growth continues

            <span className="block text-white">

              even through instability.

            </span>

          </h2>

          <p className="mt-8 text-lg leading-relaxed text-slate-300">

            Most people do not fail because they lack potential.

            They fail because growth becomes inconsistent, unsupported and fragmented over time.

            PipuPath helps users rebuild momentum and continue becoming stronger through every stage of their journey.

          </p>

        </div>

        {/* CARDS */}

        <div className="mt-16 grid md:grid-cols-3 gap-8">

          {cards.map((card,index)=>(

            <div
              key={index}
              className="
              rounded-[36px]
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              p-8
              "
            >

              <div className="w-14 h-14 rounded-2xl bg-yellow-400/10 flex items-center justify-center">

                <div className="w-2 h-2 rounded-full bg-yellow-400"/>

              </div>

              <h3 className="mt-8 text-3xl font-semibold text-white">

                {card.title}

              </h3>

              <p className="mt-6 text-slate-300 leading-relaxed">

                {card.description}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}