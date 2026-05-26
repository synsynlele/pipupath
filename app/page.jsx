"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Navbar from "../components/Navbar";

import { useAuth } from "../context/AuthContext";

import Hero from "@/components/Hero";

import AdaptiveStates from "@/components/AdaptiveStates";

import HumanGuidance from "@/components/HumanGuidance";

import BehavioralContinuity from "@/components/BehavioralContinuity";

import FinalCTA from "@/components/FinalCTA";

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

 <Hero />

<AdaptiveStates />

<HumanGuidance />

<BehavioralContinuity />

<FinalCTA />

</main>

);
}
