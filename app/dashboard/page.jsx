'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import NavBar from "@/components/NavBar";

export default function DashboardPage(){

  const [user,setUser] = useState(null);

  useEffect(()=>{

    async function loadUser(){

      const { data } = await supabase.auth.getUser();

      if(data?.user){
        setUser(data.user);
      }
    }

    loadUser();

  },[]);

  return (

    <div className="min-h-screen bg-[#050505] text-white">

      <NavBar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HERO */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold leading-tight">
            Welcome Back
          </h1>

          <p className="text-zinc-400 mt-3 text-lg">
            Continue your guided growth journey.
          </p>

          <div className="mt-4 text-sm text-zinc-500">
            {user?.email}
          </div>

        </div>

        {/* CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* CARD 1 */}

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

            <div className="text-zinc-400 text-sm">
              Current XP
            </div>

            <div className="text-4xl font-bold mt-3">
              240
            </div>

            <div className="mt-4 text-green-400 text-sm">
              +12% this week
            </div>

          </div>

          {/* CARD 2 */}

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

            <div className="text-zinc-400 text-sm">
              Active Missions
            </div>

            <div className="text-4xl font-bold mt-3">
              5
            </div>

            <div className="mt-4 text-zinc-500 text-sm">
              Stay consistent
            </div>

          </div>

          {/* CARD 3 */}

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

            <div className="text-zinc-400 text-sm">
              Guide Sessions
            </div>

            <div className="text-4xl font-bold mt-3">
              2
            </div>

            <div className="mt-4 text-zinc-500 text-sm">
              Upcoming this week
            </div>

          </div>

          {/* CARD 4 */}

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

            <div className="text-zinc-400 text-sm">
              Momentum
            </div>

            <div className="text-4xl font-bold mt-3">
              Strong
            </div>

            <div className="mt-4 text-blue-400 text-sm">
              Nortnspoil stable
            </div>

          </div>

        </div>

      </div>

    </div>

  );
}