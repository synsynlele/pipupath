import Link from "next/link";

export default function HumanGuidance() {

  return (

    <section className="px-6 py-24 md:px-10">

      <div className="max-w-6xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}

          <div>

            <p className="text-sm font-medium text-[#FACC15]">

              Your Builder Academy

            </p>

            <h2 className="mt-4 text-4xl md:text-6xl font-semibold leading-tight text-white">

              You do not have to build
              <span className="block">

                your future alone.

              </span>

            </h2>

            <p className="mt-8 text-lg leading-relaxed text-[#CBD5E1]">

              PipuPath gives you quests, guidance and challenges that help you discover your strengths, build real-world skills and grow stronger every day.

            </p>

            {/* TAGS */}

            <div className="mt-10 flex flex-wrap gap-3">

              <div className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-[#CBD5E1]">

                🎯 Daily Quests

              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-[#CBD5E1]">

                ⭐ Skill Growth

              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-[#CBD5E1]">

                ⚔ Team Challenges

              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-[#CBD5E1]">

                🚀 Unlock Progress

              </div>

            </div>

            {/* BUTTON */}

            <div className="mt-12">

              <Link

                href="/signup"

                className="
                inline-flex
                items-center
                justify-center
                rounded-2xl
                bg-[#0F172A]
                px-8
                py-4
                text-white
                font-medium
                border
                border-white/10
                shadow-[0_10px_40px_rgba(0,0,0,0.25)]
                hover:translate-y-[-2px]
                transition-all
                "

              >

                ⚡ Begin Your Journey

              </Link>

            </div>

          </div>

          {/* RIGHT */}

          <div className="rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_10px_50px_rgba(0,0,0,0.25)]">

            {/* CARD 1 */}

            <div className="rounded-[32px] bg-white p-6">

              <div className="flex items-center justify-between">

                <p className="font-medium text-[#0F172A]">

                  🎯 Daily Quest Ready

                </p>

                <div className="w-3 h-3 rounded-full bg-green-500"/>

              </div>

              <p className="mt-6 text-[#64748B] leading-relaxed">

                Small actions every day slowly become confidence, skills and momentum.

              </p>

            </div>

            {/* CARD 2 */}

            <div className="mt-6 rounded-[32px] bg-[#0F172A] p-6">

              <p className="text-sm text-white/60">

                Growth Unlock

              </p>

              <h3 className="mt-4 text-3xl font-semibold text-white">

                New abilities appear as you grow.

              </h3>

              <p className="mt-5 text-white/70 leading-relaxed">

                Unlock new challenges, skills and opportunities as you continue building your future.

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}