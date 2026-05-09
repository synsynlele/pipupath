"use client"

import { useEffect, useState } from "react"
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
const [bookedSlots, setBookedSlots] = useState<string[]>([])
const [timeSlots, setTimeSlots] = useState<string[]>([])



useEffect(() => {

  async function loadBookedSlots() {

    if (!date) return

    const startOfDay = `${date}T00:00:00`
    const endOfDay = `${date}T23:59:59`

    const { data, error } = await supabase
      .from("sessions")
      .select("scheduled_for")

      .eq("guide_id", guideId)

      .gte("scheduled_for", startOfDay)

      .lte("scheduled_for", endOfDay)

      .neq("status", "cancelled")

    if (!error && data) {

      const bookedTimes = data.map((session) => {

        const bookingDate = new Date(session.scheduled_for)

        return bookingDate.toISOString().slice(11,16)

      })

      setBookedSlots(bookedTimes)

    }

  }

  loadBookedSlots()

}, [date, guideId])

useEffect(() => {

  async function loadAvailability() {

    if (!date) return

    const selectedDay = new Date(date).getDay()

    const { data, error } = await supabase
      .from("guide_availability")
      .select("*")
      .eq("guide_id", guideId)
      .eq("day_of_week", selectedDay)
      .eq("is_active", true)

    if (error || !data || data.length === 0) {

      setTimeSlots([])

      return
    }

    const availability = data[0]

    const slots: string[] = []

    const startHour = parseInt(
      availability.start_time.split(":")[0]
    )

    const endHour = parseInt(
      availability.end_time.split(":")[0]
    )

    for (let hour = startHour; hour < endHour; hour++) {

      const formattedHour = hour
        .toString()
        .padStart(2, "0")

      slots.push(`${formattedHour}:00`)

    }

    setTimeSlots(slots)

  }

  loadAvailability()

}, [date, guideId])

  async function createBooking() {

   if (
  !studentName ||
  !studentEmail ||
  !date ||
  !time
) {
  alert("Please complete all booking fields")
  return
}

    setLoading(true)

    const scheduledFor = `${date}T${time}:00`
const bookedSlot = `${guideId}_${scheduledFor}`

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

        booked_slot: bookedSlot,
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

  onChange={(e) => setDate(e.target.value)}

  className="
    w-full
    bg-black
    border
    border-white/10
    rounded-2xl
    p-4
    text-white
    color-scheme-dark
  "
/>

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

{timeSlots.length === 0 && (

  <div className="col-span-3">

    <div
      className="
        bg-zinc-900
        border
        border-zinc-800
        rounded-2xl
        p-5
        text-zinc-400
        text-center
      "
    >
      No available slots for this day
    </div>

  </div>

)}

   {timeSlots.map((slot) => {

  const isBooked = bookedSlots.includes(slot)

  return (

    <button
      key={slot}
      type="button"

      disabled={isBooked}

      onClick={() => {

        if (!isBooked) {
          setTime(slot)
        }

      }}

      className={`
        rounded-2xl
        py-3
        font-semibold
        transition
        border

        ${
          isBooked
            ? "bg-zinc-900 text-zinc-600 border-zinc-800 cursor-not-allowed"

            : time === slot

            ? "bg-yellow-500 text-black border-yellow-500"

            : "bg-black text-white border-white/10 hover:border-white/30"
        }
      `}
    >

      {isBooked ? `${slot} • Booked` : slot}

    </button>

  )

})}

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