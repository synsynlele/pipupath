import Link
from "next/link";

export default function HumanGuidance() {

  return (

    <section className="px-6 py-24 md:px-10">

      <div className="max-w-6xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT */}

          <div>

            <p className="text-sm font-medium text-[#B88A00]">

              Human + AI Guidance

            </p>

            <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-[#0F172A]">

              Growth should feel guided, not isolating.

            </h2>

            <p className="mt-6 text-lg text-[#64748B] leading-relaxed">

              PipuPath combines adaptive intelligence with human-centered guidance to help people evolve sustainably through reflection, behavioral awareness and intentional support.

            </p>

            <div className="mt-8 flex flex-wrap gap-3">

              <div className="px-4 py-2 rounded-full border border-[#E2E8F0] bg-white/80 text-sm text-[#475569]">

                Adaptive Missions

              </div>

              <div className="px-4 py-2 rounded-full border border-[#E2E8F0] bg-white/80 text-sm text-[#475569]">

                Behavioral Feedback

              </div>

              <div className="px-4 py-2 rounded-full border border-[#E2E8F0] bg-white/80 text-sm text-[#475569]">

                Personal Guidance

              </div>

              <div className="px-4 py-2 rounded-full border border-[#E2E8F0] bg-white/80 text-sm text-[#475569]">

                Long-Term Evolution

              </div>

            </div>

            <div className="mt-10">

              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-2xl bg-[#0F172A] px-7 py-4 text-sm font-medium text-white shadow-[0_10px_30px_rgba(15,23,42,0.18)] transition-all duration-300 hover:translate-y-[-2px]"
              >

                Start Your Journey

              </Link>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative">

            <div className="rounded-[36px] border border-[#E2E8F0] bg-white/80 backdrop-blur-2xl p-8 shadow-[0_10px_50px_rgba(15,23,42,0.06)]">

              {/* CARD 1 */}

              <div className="rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] p-6">

                <div className="flex items-center justify-between">

                  <p className="text-sm font-medium text-[#0F172A]">

                    Adaptive Recovery

                  </p>

                  <div className="w-3 h-3 rounded-full bg-[#16A34A]" />

                </div>

                <p className="mt-4 text-[#64748B] leading-relaxed">

                  The environment softens during overload and helps reduce cognitive pressure before burnout escalates.

                </p>

              </div>

              {/* CARD 2 */}

              <div className="mt-5 rounded-3xl bg-[#0F172A] text-white p-6">

                <p className="text-sm font-medium text-white/70">

                  Behavioral Continuity

                </p>

                <h3 className="mt-4 text-2xl font-semibold">

                  The system remembers your growth rhythm.

                </h3>

                <p className="mt-4 text-white/70 leading-relaxed">

                  Guidance evolves based on your behavioral history, stabilization cycles and long-term momentum.

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}