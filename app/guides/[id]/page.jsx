'use client';

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import NavBar from "@/components/NavBar";

import { supabase } from "@/lib/supabase";

export default function GuideProfilePage(){

  const params = useParams();

  const [guide,setGuide] = useState(null);

  const [profile,setProfile] = useState(null);

  useEffect(()=>{

    async function loadGuide(){

      // LOAD GUIDE

      const { data:guideData } =
        await supabase
          .from("guides")
          .select("*")
          .eq("id", params.id)
          .single();

      if(guideData){
        setGuide(guideData);
      }

      // LOAD USER PROFILE

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

    }

    if(params?.id){
      loadGuide();
    }

  },[params]);

  if(!guide){

    return (

      <div className="min-h-screen bg-[#050300] text-white">

        <NavBar />

        <div className="p-10">
          Loading Guide...
        </div>

      </div>

    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-b from-[#050300] to-[#0c0903] text-[#F7E8C5]">

      <NavBar />

      <div className="max-w-6xl mx-auto px-6 py-14">

        {/* HERO */}

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* IMAGE */}

          <div className="rounded-[36px] overflow-hidden border border-[#2a2112] bg-white/[0.03]">

            <img
              src={guide.avatar_url}
              alt={guide.full_name}
              className="w-full h-[620px] object-cover"
            />

          </div>

          {/* CONTENT */}

          <div>

            <div className="text-[#D4A43B] uppercase tracking-[0.35em] text-xs mb-5">
              Strategic Guide
            </div>

            <h1 className="text-6xl font-bold leading-[1.05] mb-5">
              {guide.full_name}
            </h1>

            <div className="text-[#D4A43B] text-xl mb-8">
              {guide.headline}
            </div>

            <p className="text-[#F7E8C5]/75 text-xl leading-relaxed mb-10">
              {guide.bio}
            </p>

            {/* STATS */}

            <div className="grid grid-cols-2 gap-5 mb-10">

              <div className="rounded-2xl border border-[#2a2112] bg-white/[0.03] p-6">

                <div className="text-[#D4A43B] text-sm mb-3">
                  Rating
                </div>

                <div className="text-4xl font-bold">
                  ★ {guide.rating}
                </div>

              </div>

              <div className="rounded-2xl border border-[#2a2112] bg-white/[0.03] p-6">

                <div className="text-[#D4A43B] text-sm mb-3">
                  Sessions
                </div>

                <div className="text-4xl font-bold">
                  {guide.sessions_count}
                </div>

              </div>

            </div>

            {/* EXPERTISE */}

            <div className="mb-10">

              <div className="text-[#D4A43B] text-sm uppercase tracking-[0.2em] mb-5">
                Expertise
              </div>

              <div className="flex flex-wrap gap-4">

                {guide.expertise.map((item,index)=>(

                  <div
                    key={index}
                    className="px-5 py-3 rounded-2xl bg-[#120d06] border border-[#2a2112]"
                  >
                    {item}
                  </div>

                ))}

              </div>

            </div>

            {/* ARCHETYPE MATCH */}

            {profile?.archetype &&
              guide.archetypes.includes(profile.archetype) && (

              <div className="mb-10 rounded-2xl border border-green-500/20 bg-green-500/10 p-6">

                <div className="text-green-400 font-bold text-lg mb-2">
                  Archetype Match
                </div>

                <div className="text-[#F7E8C5]/75">
                  This guide aligns well with your growth archetype.
                </div>

              </div>

            )}

            {/* CTA */}

            <button
              className="w-full py-5 rounded-2xl bg-[#D4A43B] text-black font-bold text-lg hover:scale-[1.02] transition"
            >
              Book Session
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}