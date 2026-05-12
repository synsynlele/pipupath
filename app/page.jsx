"use client";

import { useEffect }
from "react";

import { useRouter }
from "next/navigation";

import Navbar
from "../components/Navbar";

import Hero
from "../components/Hero";

import AdaptiveStates
from "../components/AdaptiveStates";

import { useAuth }
from "../context/AuthContext";

import HumanGuidance
from "../components/HumanGuidance";

import BehavioralContinuity
from "../components/BehavioralContinuity";

import FinalCTA
from "../components/FinalCTA";

export default function HomePage() {

  const router =
    useRouter();

  const {
    user,
    loading,
  } = useAuth();

  useEffect(() => {

    if (
      !loading &&
      user
    ) {

      router.push(
        "/dashboard"
      );
    }

  }, [
    user,
    loading,
    router,
  ]);

  // LOADING STATE

  if (loading) {

    return (

      <main className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">

        <div className="flex flex-col items-center gap-4">

          <div className="w-10 h-10 rounded-2xl border-2 border-[#D4AF37]/30 border-t-[#D4AF37] animate-spin" />

          <p className="text-sm text-[#64748B]">

            Preparing your environment...

          </p>

        </div>

      </main>
    );
  }

  // PREVENT LANDING FLASH

  if (user)
    return null;

  return (

    <main className="relative min-h-screen bg-[#F8FAFC] text-[#111827] overflow-x-hidden">

      {/* BACKGROUND */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="absolute top-[-140px] left-[-120px] w-[340px] h-[340px] bg-[#D4AF37]/10 rounded-full blur-3xl" />

        <div className="absolute bottom-[-140px] right-[-120px] w-[340px] h-[340px] bg-[#0F172A]/5 rounded-full blur-3xl" />

      </div>

      {/* NAVIGATION */}

      <Navbar />

      {/* PAGE CONTENT */}

      <div className="relative">

        <Hero />

        <AdaptiveStates />

       <HumanGuidance />

       <BehavioralContinuity />

      <FinalCTA />

      </div>

    </main>
  );
}