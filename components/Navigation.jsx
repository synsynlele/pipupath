"use client";

import Link from "next/link";

import { usePathname }
from "next/navigation";

import BrandLogo
from "./BrandLogo";

export default function Navigation() {

  const pathname =
    usePathname();

  const navItems = [

    {
      label: "Home",
      href: "/dashboard",
      icon: "◉",
    },

    {
      label: "Evolution",
      href: "/reflections",
      icon: "◎",
    },

    {
      label: "Identity",
      href: "/identity",
      icon: "◌",
    },

    {
      label: "MagicPen",
      href: "/magicpen",
      icon: "✦",
    },

    {
      label: "Guide",
      href: "/guide",
      icon: "◈",
    },

  ];

  return (

    <>

      {/* =========================
         DESKTOP NAVIGATION
      ========================== */}

      <div className="hidden md:flex fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl justify-between items-center">

        {/* LOGO */}

        <div className="rounded-full border border-white/50 bg-white/75 backdrop-blur-2xl shadow-[0_10px_50px_rgba(15,23,42,0.08)] px-4 py-3">

          <BrandLogo

            size={38}

            gold={false}

          />

        </div>

        {/* NAV */}

        <div className="flex items-center gap-2 rounded-full border border-white/50 bg-white/75 backdrop-blur-2xl shadow-[0_10px_50px_rgba(15,23,42,0.08)] px-3 py-3">

          {navItems.map((item) => {

            const active =
              pathname === item.href;

            return (

              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center gap-2 rounded-full px-5 py-3 text-sm transition-all duration-300

                ${active
                  ? "bg-[#0F172A] text-white"
                  : "text-[#64748B] hover:bg-white hover:text-[#0F172A]"
                }`}
              >

                <span className="text-xs">

                  {item.icon}

                </span>

                <span className="font-medium tracking-wide">

                  {item.label}

                </span>

              </Link>

            );
          })}

        </div>

      </div>

      {/* =========================
         MOBILE NAVIGATION
      ========================== */}

      <div className="md:hidden fixed top-4 left-4 z-50">

        <div className="rounded-2xl border border-white/50 bg-white/80 backdrop-blur-2xl shadow-[0_10px_50px_rgba(15,23,42,0.08)] px-3 py-2">

          <BrandLogo

            size={34}

            label={false}

            gold={false}

          />

        </div>

      </div>

      <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-md">

        <div className="flex items-center justify-between rounded-[28px] border border-white/50 bg-white/80 backdrop-blur-2xl shadow-[0_10px_50px_rgba(15,23,42,0.08)] px-2 py-2">

          {navItems.map((item) => {

            const active =
              pathname === item.href;

            return (

              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-3 py-2 min-w-[58px] transition-all duration-300

                ${active
                  ? "bg-[#0F172A] text-white"
                  : "text-[#64748B]"
                }`}
              >

                <span className="text-sm">

                  {item.icon}

                </span>

                <span className="text-[10px] font-medium">

                  {item.label}

                </span>

              </Link>

            );
          })}

        </div>

      </div>

    </>

  );
}