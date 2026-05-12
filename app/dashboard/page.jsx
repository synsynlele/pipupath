"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "../../context/AuthContext";

import { supabase } from "../../lib/supabase";

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
    ) return;

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

      if (data.insight) {

        setAiInsight(
          data.insight
        );
      }

    } catch (error) {

      console.error(error);
    }

    setAnalyzing(false);
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

    // Save reflection
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

    // Reset reflection fields
    setReflection("");

    setDifficulty("");

    setFeeling("");

    setCompleting(false);
  }

  // Loading state
  if (loading || !user) {

    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">

        <p className="text-gray-600">
          Loading...
        </p>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-6">

      {/* Header */}
      <div className="max-w-5xl mx-auto flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-[#0F172A]">
            Dashboard
          </h1>

          <p className="text-gray-600 mt-1">
            Welcome back.
          </p>

        </div>

        <button
          onClick={handleLogout}
          className="border border-[#0F172A] text-[#0F172A] px-4 py-2 rounded-xl font-medium hover:bg-gray-100 transition"
        >
          Logout
        </button>

      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto mt-8 grid gap-6">

        {/* XP */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200">

          <p className="text-sm text-gray-500">
            Current XP
          </p>

          <h2 className="mt-2 text-4xl font-bold text-[#0F172A]">
            {profile?.xp || 0} XP
          </h2>

        </div>

        {/* Streak */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200">

          <p className="text-sm text-gray-500">
            Current Streak
          </p>

          <h2 className="mt-2 text-4xl font-bold text-[#D4A017]">
            {profile?.streak || 0} Days
          </h2>

        </div>

        {/* Momentum */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200">

          <p className="text-sm text-gray-500">
            Momentum
          </p>

          <h2 className="mt-2 text-4xl font-bold text-[#16A34A]">
            {profile?.momentum || 0}%
          </h2>

        </div>

        {/* Identity */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200">

          <p className="text-sm text-gray-500">
            Your Identity
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#0F172A]">
            {profile?.archetype || "Unknown"}
          </h2>

        </div>

        {/* Mission */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200">

          <p className="text-sm text-gray-500">
            Active Mission
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#0F172A]">

            {activeMission?.title ||
              "No mission"}

          </h2>

          <p className="mt-3 text-gray-600 text-lg leading-relaxed">

            {activeMission?.description ||
              "No mission available."}

          </p>

          <p className="mt-4 text-sm text-[#D4A017] font-medium">

            Reward:
            {" "}
            {activeMission?.xpReward || 10}
            XP

          </p>

          {/* Reflection Inputs */}
          <div className="mt-6 space-y-4">

            <textarea
              placeholder="What did you complete today?"
              value={reflection}
              onChange={(e) =>
                setReflection(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-black outline-none min-h-[120px]"
            />

            <input
              type="text"
              placeholder="What was difficult?"
              value={difficulty}
              onChange={(e) =>
                setDifficulty(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-black outline-none"
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
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-black outline-none"
            />

          </div>

          {/* AI Insight */}
          {aiInsight && (

            <div className="mt-6 p-5 rounded-2xl bg-[#FEFCE8] border border-[#FDE68A]">

              <p className="text-sm text-[#92400E] font-medium">
                AI Reflection Insight
              </p>

              <p className="mt-2 text-[#78350F] leading-relaxed whitespace-pre-wrap">

                {aiInsight}

              </p>

            </div>
          )}

          <button
            onClick={completeMission}
            disabled={
              completing || analyzing
            }
            className="mt-6 w-full bg-[#0F172A] text-white px-5 py-4 rounded-2xl font-medium hover:opacity-90 transition disabled:opacity-50"
          >

            {completing || analyzing
              ? "Processing..."
              : "Complete Mission"}

          </button>

        </div>

        {/* Missions Completed */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200">

          <p className="text-sm text-gray-500">
            Missions Completed
          </p>

          <h2 className="mt-2 text-4xl font-bold text-[#0F172A]">
            {profile?.missions_completed || 0}
          </h2>

        </div>

      </div>

    </main>
  );
}