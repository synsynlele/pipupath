"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function SessionDetailPage(){

  const params = useParams()

  const [session, setSession] = useState(null)

  const [loading, setLoading] = useState(true)

  const [notes, setNotes] = useState("")

  const [savingNotes, setSavingNotes] = useState(false)
  
  const [aiSummary, setAiSummary] = useState("")

const [generatingSummary, setGeneratingSummary] = useState(false)

  useEffect(() => {

    async function loadSession(){

      const { data, error } = await supabase
        .from("sessions")
        .select(`
          *,
          guides (
            full_name,
            headline
          )
        `)
        .eq("id", params.id)
        .single()

      if(data){

        setSession(data)

        setNotes(data.guide_notes || "")

        setAiSummary(data.ai_summary || "")

      }

      setLoading(false)

    }

    if(params?.id){
      loadSession()
    }

  }, [params])

  async function saveNotes(){

  if(!session) return

  setSavingNotes(true)

  const { error } = await supabase
    .from("sessions")
    .update({
      guide_notes: notes
    })
    .eq("id", session.id)

  setSavingNotes(false)

  if(error){

    alert(error.message)

    return

  }

  alert("Notes saved!")

}

async function generateSummary(){

  if(!notes){

    alert("Add session notes first")

    return

  }

  setGeneratingSummary(true)

  const summary = `
SESSION SUMMARY

${notes.substring(0, 300)}

KEY INSIGHTS
- Student discussed growth challenges
- Strategic guidance was provided
- Actionable next steps identified

NEXT ACTIONS
- Continue implementation
- Monitor progress
- Schedule follow-up session
`

  setAiSummary(summary)

  const { error } = await supabase
    .from("sessions")
    .update({
      ai_summary: summary
    })
    .eq("id", session.id)

  setGeneratingSummary(false)

  if(error){

    alert(error.message)

    return

  }

}

  

  if(loading){

    return (
      <div className="min-h-screen bg-black text-white p-10">
        Loading session...
      </div>
    )

  }

  if(!session){

    return (
      <div className="min-h-screen bg-black text-white p-10">
        Session not found
      </div>
    )

  }

  const roomUrl =
    `https://meet.jit.si/${session.room_name}`

  return (

    <div className="min-h-screen bg-black text-white p-8">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="mb-10">

          <div className="text-yellow-500 uppercase text-sm tracking-[0.3em] mb-4">
            Guidance Session
          </div>

          <h1 className="text-5xl font-bold mb-4">
            {session.guides?.full_name}
          </h1>

          <p className="text-white/60 text-xl">
            {session.guides?.headline}
          </p>

        </div>

        {/* SESSION CARD */}

        <div
          className="
            bg-zinc-900
            border
            border-white/10
            rounded-3xl
            p-8
            mb-10
          "
        >

          <div className="grid md:grid-cols-2 gap-8">

            <div>

              <div className="text-white/50 text-sm mb-2">
                Scheduled Time
              </div>

              <div className="text-2xl font-bold">
                {
                  new Date(
                    session.scheduled_for
                  ).toLocaleString()
                }
              </div>

            </div>

            <div>

              <div className="text-white/50 text-sm mb-2">
                Status
              </div>

              <div
                className="
                  inline-flex
                  px-5
                  py-3
                  rounded-full
                  bg-yellow-500
                  text-black
                  font-bold
                "
              >
                {session.status}
              </div>

            </div>

          </div>

        </div>

        {/* LIVE ROOM */}

        <div
          className="
            bg-zinc-900
            border
            border-white/10
            rounded-3xl
            p-8
            mb-10
          "
        >

          <h2 className="text-3xl font-bold mb-6">
            Live Session Room
          </h2>

          <a
            href={roomUrl}
            target="_blank"

            className="
              inline-flex
              items-center
              justify-center
              bg-yellow-500
              text-black
              font-bold
              px-8
              py-5
              rounded-2xl
              hover:scale-[1.02]
              transition
            "
          >
            Join Live Session
          </a>

        </div>

        {/* SESSION NOTES */}

        <div
          className="
            bg-zinc-900
            border
            border-white/10
            rounded-3xl
            p-8
          "
        >

          <h2 className="text-3xl font-bold mb-6">
            Session Notes
          </h2>

          <textarea

            value={notes}

            onChange={(e)=>
              setNotes(e.target.value)
            }

            placeholder="
              Capture insights, breakthroughs,
              action plans, and guidance notes...
            "

            className="
              w-full
              min-h-[220px]
              bg-black
              border
              border-white/10
              rounded-2xl
              p-5
              text-white
              resize-none
              mb-6
            "
          />

          

           <button

  onClick={saveNotes}

  disabled={savingNotes}

  className="
    bg-yellow-500
    hover:bg-yellow-400
    text-black
    font-bold
    px-6
    py-4
    rounded-2xl
    transition
  "
>

  {
    savingNotes
      ? "Saving..."
      : "Save Notes"
  }

</button>

</div>

{/* AI SUMMARY */}

<div
  className="
    bg-zinc-900
    border
    border-white/10
    rounded-3xl
    p-8
    mt-10
  "
>

  <div className="flex items-center justify-between mb-6">

    <h2 className="text-3xl font-bold">
      AI Session Summary
    </h2>

    <button

      onClick={generateSummary}

      disabled={generatingSummary}

      className="
        bg-yellow-500
        hover:bg-yellow-400
        text-black
        font-bold
        px-5
        py-3
        rounded-2xl
        transition
      "
    >

      {
        generatingSummary
          ? "Generating..."
          : "Generate AI Summary"
      }

    </button>

  </div>

  <div
    className="
      bg-black
      border
      border-white/10
      rounded-2xl
      p-6
      whitespace-pre-wrap
      text-white/80
      leading-relaxed
      min-h-[220px]
    "
  >

    {
      aiSummary ||
      "AI summary will appear here..."
    }

  </div>

</div>


        </div>

      </div>

    </div>

  )

}