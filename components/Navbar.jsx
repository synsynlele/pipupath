"use client";

import Link from "next/link";
import Image from "next/image";

import { motion } from "framer-motion";

export default function Navbar() {

return (


<motion.nav
  initial={{ opacity: 0, y: -12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className="relative z-50 w-full border-b border-white/5 bg-black/10 backdrop-blur-xl"
>

  <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

    {/* BRAND */}

    <Link
      href="/"
      className="flex items-center gap-3"
    >

      <Image
        src="/logo.png"
        alt="PipuPath Logo"
        width={42}
        height={42}
        priority
        className="object-contain"
      />

      <div className="flex flex-col leading-tight">

        <span className="text-lg font-semibold tracking-tight text-white">
          PipuPath
        </span>

        <span className="text-xs text-slate-400">
          Builder Intelligence
        </span>

      </div>

    </Link>

    {/* ACTIONS */}

    <div className="flex items-center gap-3">

      <Link
        href="/login"
        className="text-sm font-medium text-slate-300 transition hover:text-white"
      >
        Login
      </Link>

      <Link
        href="/signup"
        className="
          rounded-2xl
          border
          border-blue-400/20
          bg-blue-500/10
          px-5
          py-2.5
          text-sm
          font-semibold
          text-white
          shadow-[0_0_30px_rgba(59,130,246,0.15)]
          transition-all
          hover:bg-blue-500/20
        "
      >
        Start Building
      </Link>

    </div>

  </div>

</motion.nav>


);
}
