"use client"

import { useEffect, useState } from "react"

import { supabase } from "../../../lib/supabase"

import BookingModal from "../../../components/sessions/BookingModal"

export default function GuidePage({
  params,
}: {
  params: { id: string }
}) {

  const [guide, setGuide] = useState<any>(null)

  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {

    async function loadGuide() {

      // LOAD USER

      const { data:userData } =
        await supabase.auth.getUser()

      if(userData?.user){

        const { data:profileData } =
          await supabase
            .from("user_profiles")
            .select("*")
            .eq("user_id", userData.user.id)
            .single()

        setProfile(profileData)

      }

      // LOAD GUIDE

      const { data } =
        await supabase
          .from("guides")
          .select("*")
          .eq("id", params.id)
          .single()

      setGuide(data)

    }

    loadGuide()

  }, [params.id])

  if (!guide) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">

      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* HERO */}

        <div className="flex flex-col md:flex-row gap-10">

          <img
            src={guide.avatar_url || "/placeholder.png"}
            alt=""
            className="w-40 h-40 rounded-full object-cover border border-white/20"
          />

          <div className="flex-1">

            <h1 className="text-5xl font-bold">
              {guide.full_name || "Guide"}
            </h1>

            <p className="text-yellow-400 mt-3 text-xl">
              {guide.headline || ""}
            </p>

            <div className="flex flex-wrap gap-3 mt-6">

              {guide.expertise?.map((item:any, index:number) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-white/10"
                >
                  {item}
                </span>
              ))}

            </div>

          </div>

        </div>

        {/* ABOUT */}

        <div className="mt-20">

          <h2 className="text-3xl font-bold mb-6">
            About
          </h2>

          <p className="text-white/70 text-lg leading-relaxed max-w-3xl">
            {guide.bio || "No bio yet"}
          </p>

        </div>

        {/* BOOKING */}

        <div className="mt-20 max-w-xl">

          {profile ? (

            <BookingModal
              guideId={guide.id}
              studentId={profile.id}
            />

          ) : (

            <div className="text-white/60">
              Please log in to book a session.
            </div>

          )}

        </div>

      </div>

    </div>
  )
}