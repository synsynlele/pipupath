"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "../../context/AuthContext";

import { supabase } from "../../lib/supabase";

export default function DashboardPage() {

  const router = useRouter();

  const { user, loading } = useAuth();

  const [profile, setProfile] = useState(null);

  useEffect(() => {

    if (!loading && !user) {
      router.push("/login");
    }

  }, [user, loading, router]);

  useEffect(() => {

    async function loadProfile() {

      if (!user) return;

      const { data } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

      setProfile(data);
    }

    loadProfile();

  }, [user]);

  async function handleLogout() {

    await supabase.auth.signOut();

    router.push("/login");
  }

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

      {/* Top Bar */}
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

      {/* Main Grid */}
      <div className="max-w-5xl mx-auto mt-8 grid gap-6">

        {/* XP Card */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200">

          <p className="text-sm text-gray-500">
            Current XP
          </p>

          <h2 className="mt-2 text-4xl font-bold text-[#0F172A]">
            {profile?.xp || 0} XP
          </h2>

        </div>

        {/* Streak Card */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200">

          <p className="text-sm text-gray-500">
            Current Streak
          </p>

          <h2 className="mt-2 text-4xl font-bold text-[#D4A017]">
            {profile?.streak || 0} Days
          </h2>

        </div>

        {/* Mission Card */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200">

          <p className="text-sm text-gray-500">
            Today&apos;s Mission
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#0F172A]">
            Complete your first growth task.
          </h2>

          <button
            className="mt-6 bg-[#0F172A] text-white px-5 py-3 rounded-2xl font-medium hover:opacity-90 transition"
          >
            Start Mission
          </button>

        </div>

      </div>

    </main>
  );
}