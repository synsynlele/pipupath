"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState }
from "react";

import { useRouter }
from "next/navigation";

import { useAuth }
from "../../context/AuthContext";

import { supabase }
from "../../lib/supabase";

import Navigation
from "../../components/Navigation";

const ARCHETYPE_DATA = {

  "The Builder": {

    identity:
      "The Builder",

    title:
      "Vision turned into reality.",

    description:
      "You are naturally driven to create, improve and build systems that outlast temporary emotion.",

    strength:
      "You create momentum through action and execution.",

    warning:
      "Your biggest risk is fragmentation from too many ideas.",

    missionStyle:
      "You evolve fastest through building, experimentation and long-term execution.",

    future:
      "When disciplined, your ability to create systems and opportunities becomes transformational.",

    philosophy:
      "Builders grow by reducing distraction and compounding focused execution over time.",
  },

  "The Commander": {

    identity:
      "The Commander",

    title:
      "Discipline creates direction.",

    description:
      "You naturally organize people, standards and action toward meaningful goals.",

    strength:
      "You thrive through leadership, pressure and strategic execution.",

    warning:
      "Your biggest risk is emotional imbalance caused by constant intensity.",

    missionStyle:
      "You evolve fastest through responsibility, leadership and disciplined consistency.",

    future:
      "When emotionally grounded, you become capable of directing meaningful transformation.",

    philosophy:
      "Commanders grow by balancing ambition with emotional intelligence.",
  },

  "The Scholar": {

    identity:
      "The Scholar",

    title:
      "Understanding before mastery.",

    description:
      "You seek insight, depth and intelligent growth before action.",

    strength:
      "You naturally identify patterns and think deeply.",

    warning:
      "Your biggest risk is overthinking instead of acting consistently.",

    missionStyle:
      "You evolve fastest through focused learning, reflection and deep work.",

    future:
      "When combined with execution, your understanding becomes transformative wisdom.",

    philosophy:
      "Scholars grow when knowledge becomes disciplined action.",
  },

  "The Guide": {

    identity:
      "The Guide",

    title:
      "Human growth matters deeply to you.",

    description:
      "You are naturally driven to uplift, mentor and emotionally strengthen people.",

    strength:
      "You create trust, emotional connection and human support.",

    warning:
      "Your biggest risk is neglecting your own growth while helping others.",

    missionStyle:
      "You evolve fastest through mentorship, leadership and meaningful contribution.",

    future:
      "When grounded in self-discipline, you become a catalyst for transformation.",

    philosophy:
      "Guides grow when they protect their own development while serving others.",
  },

};

export default function IdentityPage() {

  const router = useRouter();

  const { user, loading } =
    useAuth();

  const [profile, setProfile] =
    useState(null);

  const [loadingProfile,
    setLoadingProfile] =
    useState(true);

  // Redirect unauthenticated users
  useEffect(() => {

    if (!loading && !user) {

      router.push("/login");
    }

  }, [user, loading, router]);

  // Load profile
  useEffect(() => {

    async function loadProfile() {

      if (!user) return;

      try {

        const { data, error } =
          await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

        if (!error && data) {

          setProfile(data);
        }

      } catch (error) {

        console.error(error);

      } finally {

        setLoadingProfile(false);
      }
    }

    loadProfile();

  }, [user]);

  // Loading state
  if (
    loading ||
    loadingProfile ||
    !profile
  ) {

    return (

      <main className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-6">

        <div className="flex flex-col items-center gap-5">

          <div className="w-14 h-14 rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37] animate-spin" />

          <p className="text-[#64748B] text-sm tracking-wide">
            Building your identity profile...
          </p>

        </div>

      </main>
    );
  }

  const archetype =
    profile?.archetype ||
    "The Builder";

  const data =
    ARCHETYPE_DATA[archetype] ||
    ARCHETYPE_DATA["The Builder"];

  return (

    <main className="min-h-screen bg-[#F5F7FA] overflow-x-hidden text-[#0F172A]">

      <Navigation />

      {/* Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-[#D4AF37]/10 rounded-full blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-[#0F172A]/5 rounded-full blur-3xl" />

      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-8 md:px-6 md:py-10">

        {/* Header */}
        <div>

          <p className="text-[11px] uppercase tracking-[0.35em] text-[#94A3B8] font-medium">
            Identity System
          </p>

          <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-none text-[#0F172A]">

            Understand how
            <br />
            you naturally grow.

          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#475569]">

            Your behavioral identity shapes how you think, execute, reflect and evolve.

          </p>

        </div>

        {/* Identity Hero */}
        <div className="mt-12 rounded-[40px] border border-white/60 bg-white/80 backdrop-blur-xl px-6 py-10 md:px-12 md:py-14 shadow-[0_10px_60px_rgba(15,23,42,0.06)] overflow-hidden relative">

          <div className="absolute inset-0 bg-gradient-to-br from-[#FFFFFF] via-[#FAFAF9] to-[#F8FAFC]" />

          <div className="relative z-10">

            <div className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#64748B]">

              Current Dominant Identity

            </div>

            <h2 className="mt-8 text-5xl md:text-7xl font-semibold tracking-tight leading-none text-[#0F172A]">

              {data.identity}

            </h2>

            <p className="mt-8 text-2xl md:text-3xl font-medium tracking-tight text-[#334155] max-w-3xl leading-relaxed">

              {data.title}

            </p>

            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[#475569]">

              {data.description}

            </p>

          </div>

        </div>

        {/* Core Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mt-8">

          {/* Strength */}
          <div className="rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-xl p-7 shadow-[0_10px_50px_rgba(15,23,42,0.05)]">

            <p className="text-xs uppercase tracking-[0.25em] text-[#94A3B8]">
              Core Strength
            </p>

            <h3 className="mt-5 text-3xl font-semibold tracking-tight leading-tight text-[#0F172A]">

              {data.strength}

            </h3>

          </div>

          {/* Growth Trap */}
          <div className="rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-xl p-7 shadow-[0_10px_50px_rgba(15,23,42,0.05)]">

            <p className="text-xs uppercase tracking-[0.25em] text-[#94A3B8]">
              Growth Trap
            </p>

            <h3 className="mt-5 text-3xl font-semibold tracking-tight leading-tight text-[#0F172A]">

              {data.warning}

            </h3>

          </div>

        </div>

        {/* Mission Style */}
        <div className="mt-6 rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-xl p-7 md:p-10 shadow-[0_10px_50px_rgba(15,23,42,0.05)]">

          <p className="text-xs uppercase tracking-[0.25em] text-[#94A3B8]">
            Behavioral Growth Style
          </p>

          <h3 className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-[#0F172A] max-w-4xl">

            {data.missionStyle}

          </h3>

        </div>

        {/* Identity Philosophy */}
        <div className="mt-6 rounded-[32px] bg-[#0F172A] text-white p-8 md:p-10 shadow-[0_10px_50px_rgba(15,23,42,0.15)]">

          <p className="text-xs uppercase tracking-[0.25em] text-white/50">
            Identity Philosophy
          </p>

          <h3 className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight leading-tight max-w-4xl">

            {data.philosophy}

          </h3>

          <p className="mt-8 text-white/70 leading-relaxed max-w-2xl">

            Identity is not fixed.
            It evolves through behavior,
            reflection, discipline and intentional growth.

          </p>

        </div>

        {/* Future Self */}
        <div className="mt-6 rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-xl p-8 md:p-10 shadow-[0_10px_50px_rgba(15,23,42,0.05)]">

          <p className="text-xs uppercase tracking-[0.25em] text-[#94A3B8]">
            Future Potential
          </p>

          <h3 className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-[#0F172A] max-w-4xl">

            {data.future}

          </h3>

        </div>

        {/* CTA Grid */}
        <div className="grid md:grid-cols-2 gap-4 mt-10">

          {/* Retake */}
          <button
            onClick={() =>
              router.push("/onboarding")
            }
            className="rounded-[28px] border border-[#E2E8F0] bg-white/80 backdrop-blur-sm text-[#0F172A] px-6 py-5 text-[15px] font-medium hover:bg-white transition-all duration-300"
          >

            Recalibrate Identity

          </button>

          {/* Dashboard */}
          <button
            onClick={() =>
              router.push("/dashboard")
            }
            className="rounded-[28px] bg-[#0F172A] text-white px-6 py-5 text-[15px] font-medium tracking-wide hover:opacity-95 transition-all duration-300"
          >

            Continue Evolution

          </button>

        </div>

      </div>

    </main>
  );
}