"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function BookingModal({
  guideId,
  studentId,
}: {
  guideId: string
  studentId: string
}) {

  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [note, setNote] = useState("")

  const [loading, setLoading] = useState(false)

  async function createBooking() {

    setLoading(true)

    const scheduledFor = `${date}T${time}:00`

    const { error } = await supabase
      .from("sessions")
      .insert({
        guide_id: guideId,
        student_id: studentId,

        title: "Guidance Session",

        description: note,

        status: "pending",

        scheduled_for: scheduledFor,
      })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    alert("Session booked successfully")
  }

  return (
    <div className="bg-white/5 rounded-3xl p-8 mt-10">

      <h2 className="text-2xl font-bold mb-6">
        Book Session
      </h2>

      <div className="space-y-5">

        <input
          type="date"
          value={date}
          onChange={(e)=>setDate(e.target.value)}
          className="w-full bg-black border border-white/10 rounded-2xl p-4"
        />

        <input
          type="time"
          value={time}
          onChange={(e)=>setTime(e.target.value)}
          className="w-full bg-black border border-white/10 rounded-2xl p-4"
        />

        <textarea
          placeholder="Optional note..."
          value={note}
          onChange={(e)=>setNote(e.target.value)}
          className="w-full bg-black border border-white/10 rounded-2xl p-4 h-32"
        />

        <button
          onClick={createBooking}
          disabled={loading}
          className="
            w-full
            bg-white
            text-black
            rounded-2xl
            py-4
            font-semibold
          "
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>

      </div>

    </div>
  )
}