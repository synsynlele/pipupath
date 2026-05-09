"use client"

import { useEffect, useState } from "react"

import { useParams } from "next/navigation"

import { supabase } from "../../../lib/supabase"

import BookingModal from "../../../components/sessions/BookingModal"

export default function GuidePage() {

  const [guide, setGuide] = useState<any>(null)

  const [profile, setProfile] = useState<any>(null)

const [availability, setAvailability] = useState<any[]>([])

const params = useParams()

const id = params?.id as string

  useEffect(() => {

    async function loadGuide() {

      // LOAD USER

      

      // LOAD GUIDE

      const { data } =
        await supabase
          .from("guides")
          .select("*")
          .eq("id", id)
          .single()

      setGuide(data)

     const { data:availabilityData } =
  await supabase
    .from("guide_availability")
    .select("*")
    .eq("guide_id", id)
    .eq("is_active", true)

setAvailability(availabilityData || [])

    }

    loadGuide()

  }, [id])

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

       {/* AVAILABILITY */}

<div className="mt-20">

  <h2 className="text-3xl font-bold mb-6">
    Availability
  </h2>

  <div className="space-y-4">

    {availability.map((slot:any)=>(

      <div
        key={slot.id}
        className="bg-white/5 border border-white/10 rounded-2xl p-5"
      >

        <div className="font-semibold">
          {
            [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ][slot.day_of_week]
          }
        </div>

        <div className="text-white/60 mt-1">
          {slot.start_time} — {slot.end_time}
        </div>

      </div>

    ))}

  </div>

</div>

        {/* BOOKING */}

        <div className="mt-20 max-w-xl">

         <BookingModal
  guideId={guide.id}
/>

        </div>

      </div>

    </div>
  )
}