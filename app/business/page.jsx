"use client";

import NavBar from "@/components/NavBar";

import Link from "next/link";

export default function BusinessPage() {

  return (

    <div className="min-h-screen bg-gradient-to-b from-[#050300] to-[#0c0903] text-[#F7E8C5]">

      <NavBar />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-20">

        {/* HERO */}

        <div className="mb-20">

          <div className="text-[#D4A43B] uppercase tracking-[0.35em] text-xs mb-6">

            Economic Intelligence Layer

          </div>

          <h1
            className="
              text-5xl
              md:text-7xl
              font-bold
              leading-[1.03]
              mb-8
              max-w-5xl
            "
          >

            Build Assets.
            <br />
            Create Leverage.
            <br />
            Compound Wealth.

          </h1>

          <p
            className="
              text-[#F7E8C5]/70
              text-lg
              md:text-2xl
              leading-relaxed
              max-w-4xl
            "
          >

            Business is not just about income. It is about systems, leverage, ownership and long-term economic positioning.

          </p>

          {/* CTA */}

          <div className="flex flex-col sm:flex-row gap-4 mt-12">

            <button
              className="
                px-7
                py-5
                rounded-2xl
                bg-[#D4A43B]
                text-black
                font-bold
                hover:scale-[1.02]
                transition
              "
            >

              Coming Soon

            </button>

            <Link
              href="/dashboard"

              className="
                px-7
                py-5
                rounded-2xl
                border
                border-[#2a2112]
                hover:border-[#D4A43B]/40
                transition
                text-center
              "
            >

              Return Dashboard

            </Link>

          </div>

        </div>

        {/* FEATURE GRID */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
            mb-20
          "
        >

          {/* FEATURE 1 */}

          <div
            className="
              rounded-[32px]
              border
              border-[#2a2112]
              bg-white/[0.03]
              backdrop-blur-xl
              p-8
            "
          >

            <div className="text-5xl mb-6">
              💡
            </div>

            <div className="text-2xl font-bold mb-5">

              Idea Validation

            </div>

            <p className="text-[#F7E8C5]/60 leading-relaxed">

              Stress test ideas, identify leverage opportunities and validate strategic business directions.

            </p>

          </div>

          {/* FEATURE 2 */}

          <div
            className="
              rounded-[32px]
              border
              border-[#2a2112]
              bg-white/[0.03]
              backdrop-blur-xl
              p-8
            "
          >

            <div className="text-5xl mb-6">
              ⚙️
            </div>

            <div className="text-2xl font-bold mb-5">

              System Design

            </div>

            <p className="text-[#F7E8C5]/60 leading-relaxed">

              Build scalable systems, workflows and operational structures that grow beyond individual effort.

            </p>

          </div>

          {/* FEATURE 3 */}

          <div
            className="
              rounded-[32px]
              border
              border-[#2a2112]
              bg-white/[0.03]
              backdrop-blur-xl
              p-8
            "
          >

            <div className="text-5xl mb-6">
              📈
            </div>

            <div className="text-2xl font-bold mb-5">

              Wealth Architecture

            </div>

            <p className="text-[#F7E8C5]/60 leading-relaxed">

              Understand ownership, assets, compounding and long-term economic positioning.

            </p>

          </div>

        </div>

        {/* STRATEGIC SECTION */}

        <div
          className="
            rounded-[40px]
            border
            border-[#2a2112]
            bg-white/[0.03]
            backdrop-blur-xl
            p-6
            md:p-12
            mb-20
          "
        >

          <div className="text-[#D4A43B] uppercase tracking-[0.35em] text-xs mb-6">

            Strategic Philosophy

          </div>

          <h2
            className="
              text-4xl
              md:text-6xl
              font-bold
              leading-[1.05]
              mb-8
              max-w-5xl
            "
          >

            Stop Trading Time.
            <br />
            Start Building Systems.

          </h2>

          <p
            className="
              text-[#F7E8C5]/70
              text-lg
              md:text-2xl
              leading-relaxed
              max-w-4xl
            "
          >

            The future belongs to people who can think strategically, build leverage and design systems that compound value without requiring constant manual effort.

          </p>

        </div>

        {/* FUTURE CAPABILITIES */}

        <div>

          <div className="text-4xl font-bold mb-10">

            Planned Capabilities

          </div>

          <div className="space-y-6">

            {/* ITEM */}

            <div
              className="
                rounded-3xl
                border
                border-[#2a2112]
                bg-[#120d06]
                p-6
              "
            >

              <div className="text-[#D4A43B] text-sm mb-3">

                Phase 1

              </div>

              <div className="text-2xl font-bold mb-3">

                AI Business Strategist

              </div>

              <div className="text-[#F7E8C5]/60">

                Generate strategic business analysis, market positioning and leverage opportunities.

              </div>

            </div>

            {/* ITEM */}

            <div
              className="
                rounded-3xl
                border
                border-[#2a2112]
                bg-[#120d06]
                p-6
              "
            >

              <div className="text-[#D4A43B] text-sm mb-3">

                Phase 2

              </div>

              <div className="text-2xl font-bold mb-3">

                Opportunity Intelligence

              </div>

              <div className="text-[#F7E8C5]/60">

                Discover hidden market opportunities aligned with user strengths and growth archetypes.

              </div>

            </div>

            {/* ITEM */}

            <div
              className="
                rounded-3xl
                border
                border-[#2a2112]
                bg-[#120d06]
                p-6
              "
            >

              <div className="text-[#D4A43B] text-sm mb-3">

                Phase 3

              </div>

              <div className="text-2xl font-bold mb-3">

                Economic Operating System

              </div>

              <div className="text-[#F7E8C5]/60">

                AI-powered systems for wealth building, strategic planning and long-term economic leverage.

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}