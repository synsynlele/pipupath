'use client';

import { useEffect, useState } from "react";

import NavBar from "@/components/NavBar";

import { supabase } from "@/lib/supabase";

export default function GuidesPage(){

  const [guides,setGuides] = useState([]);

  const [profile,setProfile] = useState(null);

  useEffect(()=>{

    async function loadData(){

      // LOAD USER

      const { data:userData } =
        await supabase.auth.getUser();

      if(userData?.user){

        const { data:profileData } =
          await supabase
            .from("user_profiles")
            .select("*")
            .eq("user_id", userData.user.id)
            .single();

        if(profileData){
          setProfile(profileData);
        }
      }

      // LOAD GUIDES

      const { data } =
        await supabase
          .from("guides")
          .select("*");

      if(data){
        setGuides(data);
      }

    }

    loadData();

  },[]);

  return (

    <div className="min-h-screen bg-gradient-to-b from-[#050300] to-[#0c0903] text-[#F7E8C5]">

      <NavBar />

      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* HERO */}

        <div className="mb-14">

          <div className="text-[#D4A43B] uppercase tracking-[0.35em] text-xs mb-5">
            Human Guidance Layer
          </div>

          <h1 className="text-6xl font-bold leading-[1.05] mb-5">
            Find Your Guide
          </h1>

          <p className="text-[#F7E8C5]/70 text-xl max-w-3xl leading-relaxed">
            Connect with strategic guides aligned with your growth archetype and trajectory.
          </p>

        </div>

        {/* MATCHED ARCHETYPE */}

        {profile?.archetype_data && (

          <div className="mb-10 inline-flex items-center gap-4 px-5 py-4 rounded-2xl border border-[#2a2112] bg-white/[0.03]">

            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
              style={{
                background:profile.archetype_data.glow
              }}
            >
              {profile.archetype_data.emoji}
            </div>

            <div>

              <div className="text-[#D4A43B] text-xs uppercase tracking-[0.2em]">
                Your Archetype
              </div>

              <div className="font-bold text-lg">
                {profile.archetype_data.name}
              </div>

            </div>

          </div>

        )}

        {/* GUIDES GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {guides.map((guide,index)=>(

            <div
              key={index}
              className="rounded-[30px] border border-[#2a2112] bg-white/[0.03] backdrop-blur-xl overflow-hidden"
            >

              {/* IMAGE */}

              <div className="h-64 overflow-hidden">

                <img
                  src={guide.avatar_url}
                  alt={guide.full_name}
                  className="w-full h-full object-cover"
                />

              </div>

              {/* CONTENT */}

              <div className="p-7">

                <div className="flex items-center justify-between mb-4">

                  <h2 className="text-2xl font-bold">
                    {guide.full_name}
                  </h2>

                  <div className="text-[#D4A43B]">
                    ★ {guide.rating}
                  </div>

                </div>

                <div className="text-[#D4A43B] text-sm mb-5">
                  {guide.headline}
                </div>

                <p className="text-[#F7E8C5]/70 leading-relaxed mb-6">
                  {guide.bio}
                </p>

                {/* EXPERTISE */}

                <div className="flex flex-wrap gap-3 mb-6">

                  {guide.expertise.map((item,i)=>(

                    <div
                      key={i}
                      className="px-4 py-2 rounded-xl bg-[#120d06] border border-[#2a2112] text-sm"
                    >
                      {item}
                    </div>

                  ))}

                </div>

                {/* MATCH */}

                {profile?.archetype &&
                  guide.archetypes.includes(profile.archetype) && (

                  <div className="mb-6 text-green-400 text-sm">
                    Archetype Match
                  </div>

                )}

                {/* ACTION */}

                <button
                  className="w-full py-4 rounded-2xl bg-[#D4A43B] text-black font-bold hover:scale-[1.02] transition"
                >
                  View Guide
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}