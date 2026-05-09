"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function BookingModal({
  guideId,
  
}: {
  guideId: string
 
}) {

  const [open, setOpen] = useState(false)

  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [note, setNote] = useState("")
  const [studentName, setStudentName] = useState("")
const [studentEmail, setStudentEmail] = useState("")

  const [loading, setLoading] = useState(false)

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
]

  async function createBooking() {

    if (
  !studentName ||
  !studentEmail ||
  !date ||
  !time
)
      alert("Please complete all booking fields")
      return
    }

    setLoading(true)

    const scheduledFor = `${date}T${time}:00`

    const { error } = await supabase
      .from("sessions")
      .insert({
        guide_id: guideId,
        student_name: studentName,
student_email: studentEmail,

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

    alert("Session booked successfully!")

window.location.reload()

    setOpen(false)

    setDate("")
    setTime("")
    setNote("")
  }

  return (
    <>
      {/* OPEN BUTTON */}

      <button
        onClick={() => {
  
  setOpen(true)
}}
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
    overflow-y-auto
    flex
    items-start
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
    my-10
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
    Your Name
  </label>

  <input
    type="text"
    placeholder="Enter your name"
    value={studentName}
    onChange={(e)=>setStudentName(e.target.value)}
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
    Your Email
  </label>

  <input
    type="email"
    placeholder="Enter your email"
    value={studentEmail}
    onChange={(e)=>setStudentEmail(e.target.value)}
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
                  Select Date
                </label>

                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
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

  <label className="text-white/70 block mb-4">
    Select Time Slot
  </label>

  <div className="grid grid-cols-3 gap-3">

    {timeSlots.map((slot)=>(

      <button
        key={slot}
        type="button"
        onClick={()=>setTime(slot)}
        className={`
          rounded-2xl
          py-3
          font-semibold
          transition
          border

          ${
            time === slot
              ? "bg-yellow-500 text-black border-yellow-500"
              : "bg-black text-white border-white/10 hover:border-white/30"
          }
        `}
      >
        {slot}
      </button>

    ))}

  </div>

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