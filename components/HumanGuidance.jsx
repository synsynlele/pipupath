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

              Direction + Development

            </p>

            <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-[#0F172A]">

              Building your future should not feel confusing and isolating.

            </h2>

            <p className="mt-6 text-lg text-[#64748B] leading-relaxed">

              Most ambitious young people are trying to figure out life without structure, direction or developmental support. PipuPath helps organize growth through adaptive missions, reflective guidance and capability-building systems designed to help people become stronger, clearer and more effective over time.

            </p>

            {/* TAGS */}

            <div className="mt-8 flex flex-wrap gap-3">

              <div className="px-4 py-2 rounded-full border border-[#E2E8F0] bg-white/80 text-sm text-[#475569]">

                Discover Direction

              </div>

              <div className="px-4 py-2 rounded-full border border-[#E2E8F0] bg-white/80 text-sm text-[#475569]">

                Build Capability

              </div>

              <div className="px-4 py-2 rounded-full border border-[#E2E8F0] bg-white/80 text-sm text-[#475569]">

                Regain Momentum

              </div>

              <div className="px-4 py-2 rounded-full border border-[#E2E8F0] bg-white/80 text-sm text-[#475569]">

                Create Meaningful Work

              </div>

            </div>

            {/* CTA */}

            <div className="mt-10">

              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-2xl bg-[#0F172A] px-7 py-4 text-sm font-medium text-white shadow-[0_10px_30px_rgba(15,23,42,0.18)] transition-all duration-300 hover:translate-y-[-2px]"
              >

                Begin Building Your Future

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

                    Direction Recovery

                  </p>

                  <div className="w-3 h-3 rounded-full bg-[#16A34A]" />

                </div>

                <p className="mt-4 text-[#64748B] leading-relaxed">

                  When confusion, pressure or inconsistency rise, the environment adapts to help users regain clarity, emotional steadiness and forward movement without collapsing under overwhelm.

                </p>

              </div>

              {/* CARD 2 */}

              <div className="mt-5 rounded-3xl bg-[#0F172A] text-white p-6">

                <p className="text-sm font-medium text-white/70">

                  Capability Development

                </p>

                <h3 className="mt-4 text-2xl font-semibold leading-snug">

                  Growth becomes organized into real-world capability.

                </h3>

                <p className="mt-4 text-white/70 leading-relaxed">

                  Missions evolve beyond productivity into communication, execution, learning, leadership, financial growth and the ability to build meaningful things over time.

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}