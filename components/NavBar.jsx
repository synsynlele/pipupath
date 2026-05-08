'use client';

import Link from "next/link";

export default function NavBar(){

  return (

    <div className="w-full border-b border-[#2a2112] bg-gradient-to-b from-[#050300] to-[#0c0903] backdrop-blur-xl">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">

        {/* LEFT */}

        <div className="flex items-center gap-4">

          <img
            src="/logo.png"
            alt="PipuPath"
            className="w-12 h-12 rounded-2xl shadow-[0_8px_30px_rgba(212,164,59,0.18)]"
          />

          <div>

            <h1 className="text-[#F7E8C5] font-bold text-2xl tracking-tight">
              PipuPath
            </h1>

            <p className="text-[#D4A43B] text-xs tracking-[0.3em] uppercase">
              Guided Growth OS
            </p>

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-8 text-sm">

          <Link
            href="/dashboard"
            className="text-[#F7E8C5]/75 hover:text-[#D4A43B] transition"
          >
            Dashboard
          </Link>

          <Link
            href="/magicpen"
            className="text-[#F7E8C5]/75 hover:text-[#D4A43B] transition"
          >
            MagicPen
          </Link>

          <Link
            href="/guides"
            className="text-[#F7E8C5]/75 hover:text-[#D4A43B] transition"
          >
            Guides
          </Link>

          <Link
            href="/session"
            className="text-[#F7E8C5]/75 hover:text-[#D4A43B] transition"
          >
            Sessions
          </Link>

        </div>

      </div>

    </div>

  );
}