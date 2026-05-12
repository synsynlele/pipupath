"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "../../context/AuthContext";

import { supabase } from "../../lib/supabase";

import { saveReflection } from "../../lib/reflections";

import { generateMission } from "../../lib/missions";

export default function DashboardPage() {

  const router = useRouter();

  const { user, loading } = useAuth();

  const [profile, setProfile] =
    useState(null);

  const [completing, setCompleting] =
    useState(false);

  const [activeMission,
    setActiveMission] =
    useState(null);

  const [reflection,
    setReflection] =
    useState("");

  const [difficulty,
    setDifficulty] =
    useState("");

  const [feeling,
    setFeeling] =
    useState("");

  const [aiInsight,
    setAiInsight] =
    useState("");

  const [analyzing,
    setAnalyzing] =
    useState(false);

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

      const { data, error } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

      if (!error && data) {

        setProfile(data);
      }
    }

    loadProfile();

  }, [user]);

  // Generate adaptive mission
  useEffect(() => {

    if (!profile) return;

    const mission =
      generateMission(profile);

    setActiveMission(mission);

  }, [profile]);

  // Momentum decay
  useEffect(() => {

    if (
      !profile?.last_completed_at
    ) return;

    const last =
      new Date(
        profile.last_completed_at
      );

    const now = new Date();

    const diff =
      (now - last) /
      (1000 * 60 * 60 * 24);

    if (diff > 3) {

      setProfile((prev) => {

        if (!prev) return prev;

        return {
          ...prev,
          momentum: Math.max(
            (prev.momentum || 0) - 10,
            0
          ),
        };
      });
    }

  }, [profile?.last_completed_at]);

  // Logout
  async function handleLogout() {

    await supabase.auth.signOut();

    router.push("/login");
  }

  // AI reflection analysis
  async function analyzeReflection() {

    if (
      !reflection &&
      !difficulty &&
      !feeling
    ) return "";

    setAnalyzing(true);

    try {

      const response =
        await fetch(
          "/api/reflection",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              reflection,
              difficulty,
              feeling,
            }),
          }
        );

      const data =
        await response.json();

      const insight =
        data?.insight || "";

      setAiInsight(insight);

      return insight;

    } catch (error) {

      console.error(error);

      return "";

    } finally {

      setAnalyzing(false);
    }
  }

  // Mission completion
  async function completeMission() {

    if (
      !user ||
      !profile ||
      !activeMission ||
      completing
    ) return;

    setCompleting(true);

    try {

      // =========================
      // AI ANALYSIS
      // =========================

      const insightText =
        await analyzeReflection();

      const now = new Date();

      const reward =
        activeMission.xpReward || 10;

      const updates = {

        xp:
          (profile.xp || 0) + reward,

        missions_completed:
          (profile.missions_completed || 0) + 1,

        momentum:
          Math.min(
            (profile.momentum || 0) + 5,
            100
          ),

        streak:
          (profile.streak || 0) + 1,

        last_completed_at:
          now.toISOString(),
      };

      // Legacy reflection save
      await supabase
        .from("reflections")
        .insert([
          {
            user_id: user.id,

            mission:
              activeMission?.title || "",

            difficulty,

            feeling,
          },
        ]);

      // Behavioral memory save
      await saveReflection({

        missionText:
          activeMission?.title || "",

        reflectionText:
          reflection || "",

        aiSummary:
          insightText || "",

        aiSentiment:
          feeling || "neutral",

        aiEnergyScore:
          reflection.length > 120
            ? 8
            : reflection.length > 40
            ? 5
            : 2,

        aiConsistencyScore:
          profile?.streak >= 7
            ? 8
            : profile?.streak >= 3
            ? 5
            : 2,

        xpEarned: reward

      });

      // Update profile
      const { error } =
        await supabase
          .from("profiles")
          .update(updates)
          .eq("id", user.id);

      if (error) {

        console.error(error);

        alert(
          "Failed to complete mission."
        );

        setCompleting(false);

        return;
      }

      setProfile((prev) => ({
        ...prev,
        ...updates,
      }));

      // Reset inputs
      setReflection("");

      setDifficulty("");

      setFeeling("");

      setCompleting(false);

    } catch (error) {

      console.error(error);

      alert(
        "Something went wrong."
      );

      setCompleting(false);
    }
  }

  // Loading state
  if (loading || !user) {

    return (
      <main className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-6">

        <div className="flex flex-col items-center gap-5">

          <div className="w-14 h-14 rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37] animate-spin" />

          <p className="text-[#64748B] text-sm tracking-wide">
            Preparing your growth environment...
          </p>

        </div>

      </main>
    );
  }

  return (

    <main className="min-h-screen bg-[#F5F7FA] text-[#0F172A] overflow-x-hidden">

      {/* Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-[#D4AF37]/10 rounded-full blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-[#0F172A]/5 rounded-full blur-3xl" />

      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-6 md:px-6 md:py-8">

        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-8">

          <div>

            <p className="text-[11px] uppercase tracking-[0.35em] text-[#94A3B8] font-medium">
              PipuPath OS
            </p>

            <h1 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight leading-tight text-[#0F172A]">
              Build your future
              <br />
              intentionally.
            </h1>

          </div>

          <button
            onClick={handleLogout}
            className="border border-[#E2E8F0] bg-white/80 backdrop-blur-sm text-[#0F172A] px-5 py-3 rounded-2xl text-sm font-medium hover:bg-white transition-all duration-300"
          >
            Logout
          </button>

        </div>

        {/* Identity Hero */}
        <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/70 backdrop-blur-xl p-6 md:p-8 shadow-[0_10px_50px_rgba(15,23,42,0.06)]">

          <div className="absolute inset-0 bg-gradient-to-br from-[#FFFFFF] via-[#FAFAF9] to-[#F8FAFC]" />

          <div className="relative z-10">

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">

              <div className="max-w-2xl">

                <p className="text-sm uppercase tracking-[0.25em] text-[#94A3B8]">
                  Your Identity
                </p>

                <h2 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight leading-none text-[#0F172A]">
                  {profile?.archetype || "Explorer"}
                </h2>

                <p className="mt-6 text-lg text-[#475569] leading-relaxed max-w-xl">
                  Growth compounds when identity, action and reflection stay aligned.
                </p>

              </div>

              <div className="grid grid-cols-3 gap-3 md:min-w-[320px]">

                <div className="rounded-3xl bg-[#0F172A] text-white p-5">

                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                    XP
                  </p>

                  <h3 className="mt-3 text-3xl font-semibold">
                    {profile?.xp || 0}
                  </h3>

                </div>

                <div className="rounded-3xl bg-white border border-[#E2E8F0] p-5">

                  <p className="text-xs uppercase tracking-[0.2em] text-[#94A3B8]">
                    Streak
                  </p>

                  <h3 className="mt-3 text-3xl font-semibold text-[#D4AF37]">
                    {profile?.streak || 0}
                  </h3>

                </div>

                <div className="rounded-3xl bg-white border border-[#E2E8F0] p-5">

                  <p className="text-xs uppercase tracking-[0.2em] text-[#94A3B8]">
                    Momentum
                  </p>

                  <h3 className="mt-3 text-3xl font-semibold text-[#16A34A]">
                    {profile?.momentum || 0}%
                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-6 mt-6">

          {/* Mission Column */}
          <div className="space-y-6">

            {/* Mission Card */}
            <div className="rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-xl p-6 md:p-8 shadow-[0_10px_50px_rgba(15,23,42,0.05)]">

              <div className="flex items-center justify-between gap-4">

                <div>

                  <p className="text-sm uppercase tracking-[0.25em] text-[#94A3B8]">
                    Active Mission
                  </p>

                  <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-[#0F172A] max-w-2xl">
                    {activeMission?.title ||
                      "No mission"}
                  </h2>

                </div>

                <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-3xl bg-[#0F172A] text-white text-lg font-semibold">
                  +{activeMission?.xpReward || 10}
                </div>

              </div>

              <p className="mt-6 text-lg leading-relaxed text-[#475569] max-w-2xl">

                {activeMission?.description ||
                  "No mission available."}

              </p>

              <div className="mt-8 border-t border-[#E2E8F0] pt-8">

                <p className="text-sm uppercase tracking-[0.2em] text-[#94A3B8] mb-4">
                  Reflection
                </p>

                <div className="space-y-4">

                  <textarea
                    placeholder="What meaningful progress did you make today?"
                    value={reflection}
                    onChange={(e) =>
                      setReflection(
                        e.target.value
                      )
                    }
                    className="w-full rounded-3xl border border-[#E2E8F0] bg-[#FAFAFA] px-5 py-5 text-[#0F172A] outline-none min-h-[160px] resize-none placeholder:text-[#94A3B8] focus:border-[#D4AF37]/40 transition-all duration-300"
                  />

                  <div className="grid md:grid-cols-2 gap-4">

                    <input
                      type="text"
                      placeholder="What challenged you?"
                      value={difficulty}
                      onChange={(e) =>
                        setDifficulty(
                          e.target.value
                        )
                      }
                      className="w-full rounded-2xl border border-[#E2E8F0] bg-[#FAFAFA] px-5 py-4 text-[#0F172A] outline-none placeholder:text-[#94A3B8] focus:border-[#D4AF37]/40 transition-all duration-300"
                    />

                    <input
                      type="text"
                      placeholder="How do you feel now?"
                      value={feeling}
                      onChange={(e) =>
                        setFeeling(
                          e.target.value
                        )
                      }
                      className="w-full rounded-2xl border border-[#E2E8F0] bg-[#FAFAFA] px-5 py-4 text-[#0F172A] outline-none placeholder:text-[#94A3B8] focus:border-[#D4AF37]/40 transition-all duration-300"
                    />

                  </div>

                </div>

                {/* AI Insight */}
                {aiInsight && (

                  <div className="mt-6 rounded-3xl border border-[#FDE68A]/40 bg-gradient-to-br from-[#FEFCE8] to-[#FFFBEB] p-6">

                    <p className="text-xs uppercase tracking-[0.25em] text-[#92400E] font-medium">
                      AI Reflection Insight
                    </p>

                    <p className="mt-4 text-[#78350F] leading-relaxed whitespace-pre-wrap text-[15px]">

                      {aiInsight}

                    </p>

                  </div>
                )}

                <button
                  onClick={completeMission}
                  disabled={
                    completing || analyzing
                  }
                  className="mt-8 w-full rounded-3xl bg-[#0F172A] text-white px-6 py-5 text-[15px] font-medium tracking-wide hover:opacity-95 transition-all duration-300 disabled:opacity-50"
                >

                  {completing || analyzing
                    ? "Processing Growth..."
                    : "Complete Mission"}

                </button>

              </div>

            </div>

          </div>

          {/* Side Column */}
          <div className="space-y-6">

            {/* Future Self */}
            <div className="rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-xl p-6 shadow-[0_10px_50px_rgba(15,23,42,0.05)]">

              <p className="text-sm uppercase tracking-[0.25em] text-[#94A3B8]">
                Future Self
              </p>

              <h3 className="mt-5 text-2xl font-semibold leading-tight text-[#0F172A]">
                Discipline compounds into identity.
              </h3>

              <p className="mt-5 text-[#475569] leading-relaxed">
                Small aligned actions repeated consistently create irreversible transformation.
              </p>

            </div>

            {/* Growth Stats */}
            <div className="rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-xl p-6 shadow-[0_10px_50px_rgba(15,23,42,0.05)]">

              <p className="text-sm uppercase tracking-[0.25em] text-[#94A3B8]">
                Growth State
              </p>

              <div className="mt-6 space-y-5">

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#475569]">
                      Momentum
                    </span>
                    <span className="text-sm font-medium text-[#0F172A]">
                      {profile?.momentum || 0}%
                    </span>
                  </div>

                  <div className="h-3 bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#16A34A] rounded-full transition-all duration-500"
                      style={{
                        width: `${profile?.momentum || 0}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="pt-5 border-t border-[#E2E8F0] flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#94A3B8]">
                      Missions Completed
                    </p>

                    <h3 className="mt-2 text-4xl font-semibold text-[#0F172A]">
                      {profile?.missions_completed || 0}
                    </h3>
                  </div>

                  <div className="w-16 h-16 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-2xl">
                    ✦
                  </div>
                </div>

              </div>

            </div>

            {/* Quiet Insight */}
            <div className="rounded-[32px] bg-[#0F172A] text-white p-6 shadow-[0_10px_50px_rgba(15,23,42,0.15)]">

              <p className="text-xs uppercase tracking-[0.25em] text-white/50">
                Behavioral Principle
              </p>

              <p className="mt-5 text-xl leading-relaxed text-white/90">
                Reflection turns experience into intelligence.
              </p>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}
