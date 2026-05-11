"use client";

import PipuPathLogo from "@/components/brand/PipuPathLogo";

import {
  ArrowUpRight,
  Brain,
  GraduationCap,
  BriefcaseBusiness,
  ShieldAlert
} from "lucide-react";

const productLinks = [
  "Identity Engine",
  "Mission System",
  "MagicPen",
  "SME OS",
  "Nortnspoil",
  "Growth Vault"
];

const companyLinks = [
  "About PipuPath",
  "Schools",
  "Enterprise",
  "Roadmap",
  "Research",
  "Careers"
];

const resourceLinks = [
  "Growth Guides",
  "Leadership",
  "Behavioral Intelligence",
  "Execution Systems",
  "Student Growth",
  "Founder Development"
];

export default function Footer() {

  return (

    <footer
      id="about"
      className="
      relative
      bg-[#050816]
      text-white
      overflow-hidden
      border-t
      border-white/10
      "
    >

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">

        <div
          className="
          absolute
          bottom-[-160px]
          left-[-120px]
          w-[500px]
          h-[500px]
          bg-[#7C3AED]/10
          blur-3xl
          rounded-full
          "
        />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">

        {/* TOP */}
        <div className="grid lg:grid-cols-5 gap-16">

          {/* BRAND */}
          <div className="lg:col-span-2">

            <PipuPathLogo size="lg" />

            {/* TEXT */}
            <p className="mt-8 text-lg leading-relaxed text-white/65 max-w-lg">

              PipuPath is building adaptive infrastructure
              for human growth through behavioral intelligence,
              execution systems, recovery architecture,
              and long-term progression frameworks.

            </p>

            {/* MINI SYSTEMS */}
            <div className="mt-10 flex flex-wrap gap-4">

              <div
                className="
                inline-flex
                items-center
                gap-2
                px-4
                py-3
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                text-white/70
                "
              >

                <Brain size={18} />

                HumanOS Intelligence

              </div>

              <div
                className="
                inline-flex
                items-center
                gap-2
                px-4
                py-3
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                text-white/70
                "
              >

                <GraduationCap size={18} />

                Learning Infrastructure

              </div>

              <div
                className="
                inline-flex
                items-center
                gap-2
                px-4
                py-3
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                text-white/70
                "
              >

                <BriefcaseBusiness size={18} />

                Economic Positioning

              </div>

              <div
                className="
                inline-flex
                items-center
                gap-2
                px-4
                py-3
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                text-white/70
                "
              >

                <ShieldAlert size={18} />

                Recovery Systems

              </div>

            </div>

          </div>

          {/* PRODUCTS */}
          <div>

            <div className="text-sm uppercase tracking-[0.3em] text-white/35 mb-8">

              Products

            </div>

            <div className="space-y-5">

              {productLinks.map((item, i) => (

                <button
                  key={i}
                  className="
                  flex
                  items-center
                  gap-2
                  text-white/65
                  hover:text-white
                  transition-all
                  duration-300
                  group
                  "
                >

                  {item}

                  <ArrowUpRight
                    size={16}
                    className="
                    opacity-0
                    -translate-x-1
                    group-hover:opacity-100
                    group-hover:translate-x-0
                    transition-all
                    duration-300
                    "
                  />

                </button>

              ))}

            </div>

          </div>

          {/* COMPANY */}
          <div>

            <div className="text-sm uppercase tracking-[0.3em] text-white/35 mb-8">

              Company

            </div>

            <div className="space-y-5">

              {companyLinks.map((item, i) => (

                <button
                  key={i}
                  className="
                  flex
                  items-center
                  gap-2
                  text-white/65
                  hover:text-white
                  transition-all
                  duration-300
                  group
                  "
                >

                  {item}

                  <ArrowUpRight
                    size={16}
                    className="
                    opacity-0
                    -translate-x-1
                    group-hover:opacity-100
                    group-hover:translate-x-0
                    transition-all
                    duration-300
                    "
                  />

                </button>

              ))}

            </div>

          </div>

          {/* RESOURCES */}
          <div>

            <div className="text-sm uppercase tracking-[0.3em] text-white/35 mb-8">

              Resources

            </div>

            <div className="space-y-5">

              {resourceLinks.map((item, i) => (

                <button
                  key={i}
                  className="
                  flex
                  items-center
                  gap-2
                  text-white/65
                  hover:text-white
                  transition-all
                  duration-300
                  group
                  "
                >

                  {item}

                  <ArrowUpRight
                    size={16}
                    className="
                    opacity-0
                    -translate-x-1
                    group-hover:opacity-100
                    group-hover:translate-x-0
                    transition-all
                    duration-300
                    "
                  />

                </button>

              ))}

            </div>

          </div>

        </div>

        {/* MIDDLE PANEL */}
        <div
          className="
          mt-24
          rounded-[36px]
          border
          border-white/10
          bg-gradient-to-br
          from-white/[0.04]
          to-white/[0.02]
          backdrop-blur-xl
          p-10
          md:p-14
          "
        >

          <div className="grid lg:grid-cols-3 gap-10">

            <div>

              <div className="text-white/40 text-sm uppercase tracking-[0.2em] mb-4">

                PipuPath Thesis

              </div>

              <div className="text-2xl font-black leading-tight">

                Humans need
                systems that evolve
                with them.

              </div>

            </div>

            <div className="text-white/65 leading-relaxed text-lg">

              HumanOS is the adaptive intelligence framework
              powering identity clarity, execution consistency,
              learning systems, and long-term growth infrastructure.

            </div>

            <div className="text-white/65 leading-relaxed text-lg">

              PipuPath exists to help ambitious humans compound into
              stronger thinkers, builders, leaders, and creators
              over long periods of time.

            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div
          className="
          mt-20
          pt-8
          border-t
          border-white/10
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-6
          "
        >

          <div className="text-white/40 text-sm">

            © 2026 PipuPath. HumanOS Infrastructure Platform.

          </div>

          <div className="flex items-center gap-8 text-sm text-white/40">

            <button className="hover:text-white transition">
              Privacy
            </button>

            <button className="hover:text-white transition">
              Terms
            </button>

            <button className="hover:text-white transition">
              Contact
            </button>

          </div>

        </div>

      </div>

    </footer>

  );

}