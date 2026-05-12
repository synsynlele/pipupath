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
      "You are naturally driven to create, improve and build systems that outlast emotion and temporary motivation.",

    strength:
      "You move ideas into reality and create momentum through action.",

    warning:
      "Your biggest risk is fragmentation — too many ideas, too little focused execution.",

    missionStyle:
      "You grow fastest through practical execution, creative ownership and long-term projects.",

    future:
      "When disciplined, you become a force capable of creating meaningful systems that impact people at scale.",
  },

  "The Commander": {

    identity:
      "The Commander",

    title:
      "Discipline creates direction.",

    description:
      "You naturally lead through structure, standards and decisive action.",

    strength:
      "You thrive when responsibility, pressure and execution align.",

    warning:
      "Your biggest risk is becoming overly intense and disconnected from emotional balance.",

    missionStyle:
      "You grow fastest through leadership, accountability and strategic execution.",

    future:
      "When emotionally grounded, you become a transformational leader capable of directing meaningful change.",
  },

  "The Scholar": {

    identity:
      "The Scholar",

    title:
      "Understanding before mastery.",

    description:
      "You seek depth, insight and intelligent growth before action.",

    strength:
      "You think deeply and naturally discover patterns others miss.",

    warning:
      "Your biggest risk is overthinking instead of consistent execution.",

    missionStyle:
      "You grow fastest through deep learning, reflection and focused mastery.",

    future:
      "When balanced with disciplined action, your insight becomes transformative wisdom.",
  },

  "The Guide": {

    identity:
      "The Guide",

    title:
      "Human growth matters deeply to you.",

    description:
      "You are naturally driven to uplift, support and emotionally strengthen people.",

    strength:
      "You create trust, emotional connection and meaningful support.",

    warning:
      "Your biggest risk is neglecting your own development while helping others.",

    missionStyle:
      "You grow fastest through mentorship, leadership and emotionally meaningful work.",

    future:
      "When grounded in self-discipline, you become a catalyst for human transformation.",
  },

};

export default function ResultsPage() {

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

  // Loading
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
            Calibrating your identity...
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

      <div className="relative max-w-5xl mx-auto px-4 py-8 md:px-6 md:py-10">

        {/* Header */}
        <div className="text-center">

          <p className="text-[11px] uppercase tracking-[0.35em] text-[#94A3B8] font-medium">
            Identity Calibration Complete
          </p>

        </div>

        {/* Cinematic Reveal */}
        <div className="mt-14 rounded-[40px] border border-white/60 bg-white/80 backdrop-blur-xl px-6 py-10 md:px-12 md:py-16 shadow-[0_10px_60px_rgba(15,23,42,0.06)] text-center overflow-hidden relative">

          <div className="absolute inset-0 bg-gradient-to-br from-[#FFFFFF] via-[#FAFAF9] to-[#F8FAFC]" />

          <div className="relative z-10">

            <div className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#64748B]">

              Dominant Behavioral Identity

            </div>

            <h1 className="mt-8 text-5xl md:text-7xl font-semibold tracking-tight leading-none text-[#0F172A]">

              {data.identity}

            </h1>

            <p className="mt-8 text-2xl md:text-3xl font-medium tracking-tight text-[#334155] max-w-3xl mx-auto leading-relaxed">

              {data.title}

            </p>

            <p className="mt-8 max-w-2xl mx-auto text-lg leading-relaxed text-[#475569]">

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

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#0F172A] leading-tight">

              {data.strength}

            </h2>

          </div>

          {/* Growth Trap */}
          <div className="rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-xl p-7 shadow-[0_10px_50px_rgba(15,23,42,0.05)]">

            <p className="text-xs uppercase tracking-[0.25em] text-[#94A3B8]">
              Growth Warning
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#0F172A] leading-tight">

              {data.warning}

            </h2>

          </div>

        </div>

        {/* Mission Style */}
        <div className="mt-6 rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-xl p-7 md:p-10 shadow-[0_10px_50px_rgba(15,23,42,0.05)]">

          <p className="text-xs uppercase tracking-[0.25em] text-[#94A3B8]">
            Optimal Growth Style
          </p>

          <h2 className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight text-[#0F172A] leading-tight max-w-3xl">

            {data.missionStyle}

          </h2>

        </div>

        {/* Future Self */}
        <div className="mt-6 rounded-[32px] bg-[#0F172A] text-white p-8 md:p-10 shadow-[0_10px_50px_rgba(15,23,42,0.15)]">

          <p className="text-xs uppercase tracking-[0.25em] text-white/50">
            Future Potential
          </p>

          <h2 className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-white max-w-3xl">

            {data.future}

          </h2>

          <p className="mt-8 text-white/70 leading-relaxed max-w-2xl">

            This identity is not fixed.
            It evolves through action,
            discipline, reflection and growth.

          </p>

        </div>

        {/* CTA Section */}
        <div className="mt-10 grid md:grid-cols-2 gap-4">

          {/* Dashboard */}
          <button
            onClick={() =>
              router.push("/dashboard")
            }
            className="rounded-[28px] bg-[#0F172A] text-white px-6 py-5 text-[15px] font-medium tracking-wide hover:opacity-95 transition-all duration-300"
          >

            Enter Your Growth System

          </button>

          {/* Retake */}
          <button
            onClick={() =>
              router.push("/onboarding")
            }
            className="rounded-[28px] border border-[#E2E8F0] bg-white/80 backdrop-blur-sm text-[#0F172A] px-6 py-5 text-[15px] font-medium hover:bg-white transition-all duration-300"
          >

            Retake Identity Assessment

          </button>

        </div>

      </div>

    </main>
  );
}