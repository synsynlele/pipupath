export default function AdaptiveStates() {

  const stages = [

    {
      icon:"🧭",

      title:"Explorer",

      description:
      "Every journey starts here. You discover new interests, learn about yourself and begin understanding what excites you."
    },

    {
      icon:"⚒",

      title:"Builder",

      description:
      "You begin taking action, building habits and developing skills that help you become stronger and more focused."
    },

    {
      icon:"🚀",

      title:"Creator",

      description:
      "You begin turning ideas into projects, solving problems and creating things that matter."
    },

    {
      icon:"🌍",

      title:"World Builder",

      description:
      "You use your strengths and skills to create impact and help make the world better."
    }

  ];

  return (

    <section className="px-6 py-24 md:px-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="max-w-4xl">

          <p className="text-sm font-medium text-[#FACC15]">

            Your Growth Journey

          </p>

          <h2 className="mt-4 text-4xl md:text-6xl font-semibold leading-tight text-white">

            Every builder starts somewhere.

            <span className="block">

              Growth happens one step at a time.

            </span>

          </h2>

          <p className="mt-8 text-lg leading-relaxed text-[#CBD5E1]">

            PipuPath helps you move through different stages of growth while building real-world skills and discovering your path.

          </p>

        </div>

        {/* STAGES */}

        <div className="grid md:grid-cols-2 gap-8 mt-16">

          {

            stages.map((stage)=>(

              <div

                key={stage.title}

                className="rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_10px_50px_rgba(0,0,0,0.25)]"

              >

                <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-xl">

                  {stage.icon}

                </div>

                <h3 className="mt-8 text-3xl font-semibold text-white">

                  {stage.title}

                </h3>

                <p className="mt-6 leading-relaxed text-[#CBD5E1]">

                  {stage.description}

                </p>

              </div>

            ))

          }

        </div>

        {/* FOOT */}

        <div className="mt-16 max-w-3xl">

          <p className="text-lg text-[#CBD5E1] leading-relaxed">

            You do not need to have everything figured out today. Growth happens through small actions repeated over time.

          </p>

        </div>

      </div>

    </section>

  );

}