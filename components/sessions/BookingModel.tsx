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

  const [open, setOpen] = useState(false)

  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [note, setNote] = useState("")

  const [loading, setLoading] = useState(false)

  async function createBooking() {

    if (!date || !time) {
      alert("Select date and time")
      return
    }

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

    setOpen(false)

    setDate("")
    setTime("")
    setNote("")
  }

  return (
    <>
      {/* OPEN BUTTON */}

      <button
        onClick={() => setOpen(true)}
        className="
          w-full
          bg-yellow-500
          hover:bg-yellow-400
          text-black
          rounded-2xl
          py-5
          font-bold
          text-lg
          transition
        "
      >
        Book Session
      </button>

      {/* MODAL */}

      {open && (

        <div
          className="
            fixed
            inset-0
            bg-black/80
            z-50
            flex
            items-center
            justify-center
            p-6
          "
        >

          <div
            className="
              bg-[#111]
              border
              border-white/10
              rounded-3xl
              p-8
              w-full
              max-w-xl
            "
          >

            {/* HEADER */}

            <div className="flex items-center justify-between mb-8">

              <h2 className="text-3xl font-bold text-white">
                Book Session
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-white/60 text-2xl"
              >
                ×
              </button>

            </div>

            {/* FORM */}

            <div className="space-y-5">

              <div>
                <label className="text-white/70 block mb-2">
                  Select Date
                </label>

                <input
                  type="date"
                  value={date}
                  onChange={(e)=>setDate(e.target.value)}
                  className="
                    w-full
                    bg-black
                    border
                    border-white/10
                    rounded-2xl
                    p-4
                    text-white
                  "
                />
              </div>

              <div>
                <label className="text-white/70 block mb-2">
                  Select Time
                </label>

                <input
                  type="time"
                  value={time}
                  onChange={(e)=>setTime(e.target.value)}
                  className="
                    w-full
                    bg-black
                    border
                    border-white/10
                    rounded-2xl
                    p-4
                    text-white
                  "
                />
              </div>

              <div>
                <label className="text-white/70 block mb-2">
                  Optional Note
                </label>

                <textarea
                  placeholder="Tell the guide what you need help with..."
                  value={note}
                  onChange={(e)=>setNote(e.target.value)}
                  className="
                    w-full
                    bg-black
                    border
                    border-white/10
                    rounded-2xl
                    p-4
                    h-32
                    text-white
                  "
                />
              </div>

              <button
                onClick={createBooking}
                disabled={loading}
                className="
                  w-full
                  bg-yellow-500
                  hover:bg-yellow-400
                  text-black
                  rounded-2xl
                  py-5
                  font-bold
                  text-lg
                  transition
                "
              >
                {loading ? "Booking..." : "Confirm Booking"}
              </button>

            </div>

          </div>

        </div>

      )}
    </>
  )
}