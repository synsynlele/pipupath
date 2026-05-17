"use client";

import Image from "next/image";

import { motion } from "framer-motion";

import { LogOut }
from "lucide-react";

import { useRouter }
from "next/navigation";

import { supabase }
from "@/lib/supabase";

export default function OnboardingLayout({
  children,
}) {

  const router = useRouter();

  async function handleLogout() {

    await supabase.auth.signOut();

    router.push("/");
  }

  return (

    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* BACKGROUND */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] h-[320px] w-[320px] rounded-full bg-blue-500/20 blur-3xl" />

        <div className="absolute bottom-[-160px] right-[-120px] h-[320px] w-[320px] rounded-full bg-violet-500/20 blur-3xl" />

      </div>

      {/* TOP BAR */}

      <header className="relative z-20 border-b border-white/5 bg-black/10 backdrop-blur-xl">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          {/* BRAND */}

          <div className="flex items-center gap-3">

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

                Builder Discovery

              </span>

            </div>

          </div>

          {/* LOGOUT */}

          <button
            onClick={handleLogout}
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              border
              border-white/10
              bg-white/5
              px-4
              py-2
              text-sm
              text-slate-300
              transition-all
              hover:bg-white/10
            "
          >

            <LogOut size={16} />

            Logout

          </button>

        </div>

      </header>

      {/* CONTENT */}

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-[520px] flex-col justify-center px-6 py-10"
      >

        {children}

      </motion.div>

    </main>
  );
}