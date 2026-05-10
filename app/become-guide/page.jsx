"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function BecomeGuidePage(){

  const router = useRouter()

  const [fullName, setFullName] = useState("")
  const [headline, setHeadline] = useState("")
  const [bio, setBio] = useState("")
  const [expertise, setExpertise] = useState("")
  const [price, setPrice] = useState("")

  const [loading, setLoading] = useState(false)

  async function createGuideProfile(){

    setLoading(true)

    const { data: userData } =
      await supabase.auth.getUser()

    if(!userData?.user){

      alert("Please login first")

      setLoading(false)

      return

    }

    const { error } = await supabase
      .from("guides")
      .insert({

        user_id: userData.user.id,

        full_name: fullName,

        headline,

        bio,

        hourly_rate: Number(price),

        expertise:
          expertise
            .split(",")
            .map(item => item.trim())

      })

    setLoading(false)

    if(error){

      alert(error.message)

      return

    }

    router.push("/guide-dashboard")

  }

  return (

    <div className="min-h-screen bg-black text-white p-8">

      <div className="max-w-3xl mx-auto">

        <div className="mb-10">

          <div className="text-yellow-500 uppercase tracking-[0.3em] text-sm mb-4">
            Become A Guide
          </div>

          <h1 className="text-5xl font-bold mb-4">
            Share Your Knowledge
          </h1>

          <p className="text-white/60 text-xl">
            Build your mentorship profile and start guiding students.
          </p>

        </div>

        <div
          className="
            bg-zinc-900
            border
            border-white/10
            rounded-3xl
            p-8
            space-y-6
          "
        >

          <input
            value={fullName}
            onChange={(e)=>setFullName(e.target.value)}
            placeholder="Full Name"

            className="
              w-full
              bg-black
              border
              border-white/10
              rounded-2xl
              p-5
            "
          />

          <input
            value={headline}
            onChange={(e)=>setHeadline(e.target.value)}
            placeholder="Headline"

            className="
              w-full
              bg-black
              border
              border-white/10
              rounded-2xl
              p-5
            "
          />

          <textarea
            value={bio}
            onChange={(e)=>setBio(e.target.value)}
            placeholder="Your Bio"

            className="
              w-full
              min-h-[180px]
              bg-black
              border
              border-white/10
              rounded-2xl
              p-5
            "
          />

          <input
            value={expertise}
            onChange={(e)=>setExpertise(e.target.value)}
            placeholder="Expertise separated by commas"

            className="
              w-full
              bg-black
              border
              border-white/10
              rounded-2xl
              p-5
            "
          />

          <input
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            placeholder="Hourly Rate"

            className="
              w-full
              bg-black
              border
              border-white/10
              rounded-2xl
              p-5
            "
          />

          <button

            onClick={createGuideProfile}

            disabled={loading}

            className="
              w-full
              bg-yellow-500
              hover:bg-yellow-400
              text-black
              font-bold
              py-5
              rounded-2xl
              transition
            "
          >

            {
              loading
                ? "Creating..."
                : "Create Guide Profile"
            }

          </button>

        </div>

      </div>

    </div>

  )

}