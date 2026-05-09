'use client';

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import NavBar from "@/components/NavBar";

export default function DashboardPage(){

  const [user,setUser] = useState(null);

  const [profile,setProfile] = useState(null);

  useEffect(()=>{

    async function loadUser(){

      const { data } =
        await supabase.auth.getUser();

      if(data?.user){

        setUser(data.user);

        const { data:profileData } =
          await supabase
            .from("user_profiles")
            .select("*")
            .eq("user_id", data.user.id)
            .single();

        if(profileData){
          setProfile(profileData);
        }

      }

    }

    loadUser();

  },[]);

  return (

    <div className="min-h-screen bg-gradient-to-b from-[#050300] to-[#0c0903] text-[#F7E8C5]">

      <NavBar />

      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* HERO */}

        <div className="mb-14">

          <div className="text-[#D4A43B] uppercase tracking-[0.35em] text-xs mb-5">
            Guided Growth System
          </div>

          <h1 className="text-6xl font-bold leading-[1.05] mb-5">
            Welcome Back
          </h1>

          <p className="text-[#F7E8C5]/70 text-xl max-w-2xl leading-relaxed">
            Continue building your edge, sharpening your leverage,
            and compounding your growth momentum.
          </p>

          {/* CTA BUTTONS */}

          <div className="mt-8 flex flex-wrap gap-4">

            <a
              href="/discover"
              className="px-6 py-4 rounded-2xl bg-[#D4A43B] text-black font-bold hover:scale-[1.03] transition"
            >
              Discover Yourself
            </a>

            <a
              href="/guides"
              className="px-6 py-4 rounded-2xl border border-[#2a2112] hover:border-[#D4A43B]/40 transition"
            >
              Find Guides
            </a>

          </div>

          {/* USER EMAIL */}

          <div className="mt-6 text-sm text-[#D4A43B]">
            {user?.email}
          </div>

          {/* ARCHETYPE */}

          {profile?.archetype_data && (

            <div
              className="mt-6 inline-flex items-center gap-4 px-5 py-4 rounded-2xl border border-[#2a2112] bg-white/[0.03]"
              style={{
                boxShadow:`0 0 30px ${profile.archetype_data.glow}`
              }}
            >

              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{
                  background:profile.archetype_data.glow,
                  border:`1px solid ${profile.archetype_data.color}`
                }}
              >
                {profile.archetype_data.emoji}
              </div>

              <div>

                <div className="text-[#D4A43B] text-xs uppercase tracking-[0.2em]">
                  Archetype
                </div>

                <div
                  className="font-bold text-lg"
                  style={{
                    color:profile.archetype_data.color
                  }}
                >
                  {profile.archetype_data.name}
                </div>

              </div>

            </div>

          )}

        </div>

        {/* STATS GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">

          {/* XP */}

          <div className="rounded-[28px] border border-[#2a2112] bg-white/[0.03] backdrop-blur-xl p-7 hover:translate-y-[-4px] transition">

            <div className="text-[#D4A43B] text-xs uppercase tracking-[0.25em]">
              Current XP
            </div>

            <div className="text-6xl font-bold mt-5">
              240
            </div>

            <div className="mt-5 text-green-400">
              +12% this week
            </div>

          </div>

          {/* MISSIONS */}

          <div className="rounded-[28px] border border-[#2a2112] bg-white/[0.03] backdrop-blur-xl p-7 hover:translate-y-[-4px] transition">

            <div className="text-[#D4A43B] text-xs uppercase tracking-[0.25em]">
              Active Missions
            </div>

            <div className="text-6xl font-bold mt-5">
              5
            </div>

            <div className="mt-5 text-[#F7E8C5]/60">
              Stay consistent
            </div>

          </div>

          {/* SESSIONS */}

          <div className="rounded-[28px] border border-[#2a2112] bg-white/[0.03] backdrop-blur-xl p-7 hover:translate-y-[-4px] transition">

            <div className="text-[#D4A43B] text-xs uppercase tracking-[0.25em]">
              Guide Sessions
            </div>

            <div className="text-6xl font-bold mt-5">
              2
            </div>

            <div className="mt-5 text-[#F7E8C5]/60">
              Upcoming this week
            </div>

          </div>

          {/* MOMENTUM */}

          <div className="rounded-[28px] border border-[#2a2112] bg-white/[0.03] backdrop-blur-xl p-7 hover:translate-y-[-4px] transition">

            <div className="text-[#D4A43B] text-xs uppercase tracking-[0.25em]">
              Momentum
            </div>

            <div className="text-5xl font-bold mt-5">
              Strong
            </div>

            <div className="mt-5 text-[#4ea1ff]">
              Nortnspoil stable
            </div>

          </div>

        </div>

      </div>

    </div>

  );
}