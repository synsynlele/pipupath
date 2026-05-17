"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Navbar from "../components/Navbar";

import { useAuth } from "../context/AuthContext";

import { motion } from "framer-motion";

import GlowButton from "@/components/ui/GlowButton";

export default function HomePage() {

const router = useRouter();

const {
user,
loading,
} = useAuth();


// LOADING

if (loading) {


return (

  <main className="min-h-screen flex items-center justify-center bg-[#050816]">

    <div className="flex flex-col items-center gap-4">

      <div className="w-10 h-10 rounded-full border-2 border-blue-400/20 border-t-blue-400 animate-spin" />

      <p className="text-sm text-slate-400">

        Preparing your builder journey...

      </p>

    </div>

  </main>
);


}


return (


<main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

  {/* AMBIENT BACKGROUND */}

  <div className="pointer-events-none absolute inset-0 overflow-hidden">

    <div className="absolute top-[-120px] left-[-120px] h-[320px] w-[320px] rounded-full bg-blue-500/20 blur-3xl" />

    <div className="absolute bottom-[-160px] right-[-120px] h-[320px] w-[320px] rounded-full bg-violet-500/20 blur-3xl" />

  </div>

  {/* NAVBAR */}

  <Navbar />

  {/* HERO */}

  <section className="relative z-10 flex min-h-[90vh] items-center justify-center px-6">

    <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">

      {/* LABEL */}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-slate-300 backdrop-blur-xl"
      >
        For ambitious young builders
      </motion.div>

      {/* HEADLINE */}

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl"
      >
        The world needs
        <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
          {" "}more builders.
        </span>
      </motion.h1>

      {/* SUBTEXT */}

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl"
      >
        Discover your strengths, build valuable skills,
        complete AI-guided missions, and create real
        opportunities for your future.
      </motion.p>

      {/* CTA */}

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-10 w-full max-w-sm"
      >
        <GlowButton
          onClick={() => router.push("/signup")}
        >
          Begin Your Journey
        </GlowButton>
      </motion.div>

      {/* BUILDER TYPES */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="mt-16 flex flex-wrap items-center justify-center gap-3"
      >

        {[
          "Visionary",
          "Creator",
          "Explorer",
          "Architect",
          "Operator",
          "Catalyst",
        ].map((item) => (

          <div
            key={item}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-xl"
          >
            {item}
          </div>

        ))}

      </motion.div>

    </div>

  </section>

</main>

);
}
