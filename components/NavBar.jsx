'use client';

import Link from "next/link";

export default function NavBar(){

  return (

    <div className="w-full border-b border-zinc-800 bg-[#0a0a0a]">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LEFT */}

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center font-bold text-lg">
            P
          </div>

          <div>
            <h1 className="text-white font-bold text-lg">
              PipuPath
            </h1>

            <p className="text-xs text-zinc-500">
              Guided Growth OS
            </p>
          </div>

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-6 text-sm">

          <Link
            href="/dashboard"
            className="text-zinc-300 hover:text-white transition"
          >
            Dashboard
          </Link>

          <Link
            href="/magicpen"
            className="text-zinc-300 hover:text-white transition"
          >
            MagicPen
          </Link>

          <Link
            href="/guides"
            className="text-zinc-300 hover:text-white transition"
          >
            Guides
          </Link>

          <Link
            href="/session"
            className="text-zinc-300 hover:text-white transition"
          >
            Sessions
          </Link>

        </div>

      </div>

    </div>

  );
}