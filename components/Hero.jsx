"use client";

import Link
from "next/link";

import BrandLogo
from "./BrandLogo";

export default function Hero() {

  return (

    <section className="relative overflow-hidden px-6 pt-32 pb-24 md:px-10 md:pt-40 md:pb-32">

      {/* BACKGROUND */}

      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute top-[-140px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-[#0F172A]/5 rounded-full blur-3xl" />

      </div>

      {/* CONTENT */}

      <div className="relative max-w-6xl mx-auto flex flex-col items-center text-center">

        {/* LOGO */}

        <div className="mb-8">

          <BrandLogo

            size={72}

            label={false}

          />

        </div>

        {/* LABEL */}

        <div className="mb-7 px-5 py-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#B88A00] text-sm font-semibold backdrop-blur-xl">

          For Ambitious People Building Meaningful Lives

        </div>

        {/* HEADING */}

        <h1 className="max-w-5xl text-5xl md:text-7xl font-semibold tracking-tight leading-[1.02] text-[#0F172A]">

          Organize your potential

          <span className="block mt-2">

            into a meaningful life.

          </span>

        </h1>

        {/* DESCRIPTION */}

        <p className="mt-8 max-w-3xl text-lg md:text-xl text-[#64748B] leading-relaxed">

          PipuPath helps ambitious young people discover direction, build capability, regain momentum and develop themselves into people capable of building meaningful things for the world — one mission at a time.

        </p>

        {/* CTA */}

        <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">

          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-2xl bg-[#0F172A] px-7 py-4 text-sm font-medium text-white shadow-[0_10px_30px_rgba(15,23,42,0.18)] transition-all duration-300 hover:translate-y-[-2px]"
          >

            Start Building Yourself

          </Link>

          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white/80 backdrop-blur-xl px-7 py-4 text-sm font-medium text-[#0F172A] transition-all duration-300 hover:bg-white"
          >

            Continue Your Journey

          </Link>

        </div>

        {/* TRUST LINE */}

        <div className="mt-14 flex flex-wrap items-center justify-center gap-3 text-sm text-[#64748B]">

          <span className="px-4 py-2 rounded-full bg-white/70 border border-[#E2E8F0]">

            Discover Direction

          </span>

          <span className="px-4 py-2 rounded-full bg-white/70 border border-[#E2E8F0]">

            Build Capability

          </span>

          <span className="px-4 py-2 rounded-full bg-white/70 border border-[#E2E8F0]">

            Regain Momentum

          </span>

          <span className="px-4 py-2 rounded-full bg-white/70 border border-[#E2E8F0]">

            Become a Builder

          </span>

        </div>

        {/* BOTTOM MESSAGE */}

        <div className="mt-16 max-w-2xl">

          <p className="text-sm md:text-base leading-relaxed text-[#94A3B8]">

            Most people are not failing because they lack potential. They are failing because their ambition is fragmented, unsupported and directionless. PipuPath exists to help people organize themselves into capable humans who can build meaningful futures for themselves and others.

          </p>

        </div>

      </div>

    </section>
  );
}