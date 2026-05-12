import Link
from "next/link";

import BrandLogo
from "./BrandLogo";

export default function FinalCTA() {

  return (

    <section className="px-6 pt-10 pb-24 md:px-10">

      <div className="max-w-6xl mx-auto">

        <div className="relative overflow-hidden rounded-[40px] border border-[#E2E8F0] bg-white/80 backdrop-blur-2xl px-8 py-16 md:px-16 md:py-20 shadow-[0_10px_60px_rgba(15,23,42,0.06)]">

          {/* BACKGROUND */}

          <div className="absolute inset-0 pointer-events-none overflow-hidden">

            <div className="absolute top-[-120px] right-[-120px] w-[280px] h-[280px] bg-[#D4AF37]/10 rounded-full blur-3xl" />

            <div className="absolute bottom-[-100px] left-[-100px] w-[220px] h-[220px] bg-[#0F172A]/5 rounded-full blur-3xl" />

          </div>

          {/* CONTENT */}

          <div className="relative flex flex-col items-center text-center">

            {/* LOGO */}

            <div className="mb-8">

              <BrandLogo

                size={64}

                label={false}

              />

            </div>

            {/* LABEL */}

            <div className="px-5 py-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#B88A00] text-sm font-semibold">

              Adaptive Human Development

            </div>

            {/* HEADING */}

            <h2 className="mt-8 text-4xl md:text-6xl font-semibold tracking-tight leading-tight text-[#0F172A] max-w-4xl">

              Your evolution deserves a more intelligent environment.

            </h2>

            {/* DESCRIPTION */}

            <p className="mt-8 max-w-2xl text-lg text-[#64748B] leading-relaxed">

              PipuPath helps people grow through adaptive guidance, behavioral awareness and long-term intentional development.

            </p>

            {/* CTA */}

            <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">

              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-2xl bg-[#0F172A] px-8 py-4 text-sm font-medium text-white shadow-[0_10px_30px_rgba(15,23,42,0.18)] transition-all duration-300 hover:translate-y-[-2px]"
              >

                Begin Your Journey

              </Link>

              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white/80 backdrop-blur-xl px-8 py-4 text-sm font-medium text-[#0F172A] transition-all duration-300 hover:bg-white"
              >

                Continue Journey

              </Link>

            </div>

          </div>

        </div>

        {/* FOOTER */}

        <footer className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 px-2">

          <div className="flex items-center gap-3">

            <BrandLogo

              size={36}

              gold={false}

            />

          </div>

          <div className="flex items-center gap-6 text-sm text-[#64748B]">

            <Link
              href="/login"
              className="hover:text-[#0F172A] transition-colors"
            >

              Login

            </Link>

            <Link
              href="/signup"
              className="hover:text-[#0F172A] transition-colors"
            >

              Sign Up

            </Link>

            <Link
              href="/guide"
              className="hover:text-[#0F172A] transition-colors"
            >

              Human Guidance

            </Link>

          </div>

        </footer>

      </div>

    </section>
  );
}