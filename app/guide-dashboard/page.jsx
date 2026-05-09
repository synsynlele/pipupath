"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function GuideDashboardPage() {

  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [dayOfWeek, setDayOfWeek] = useState(1)

const [startTime, setStartTime] = useState("09:00")

const [endTime, setEndTime] = useState("17:00")

const [savingAvailability, setSavingAvailability] = useState(false)

  useEffect(() => {

    async function loadSessions() {

      const { data, error } = await supabase
        .from("sessions")
        .select("*")
        .order("scheduled_for", { ascending: true })

      if (!error && data) {
        setSessions(data)
      }

      setLoading(false)

    }

    loadSessions()

  }, [])

async function saveAvailability() {

  setSavingAvailability(true)

  const { error } = await supabase
    .from("guide_availability")
    .insert({

      guide_id: "PUT_GUIDE_ID_HERE",

      day_of_week: dayOfWeek,

      start_time: startTime,

      end_time: endTime,

      is_active: true,

    })

  setSavingAvailability(false)

  if(error){

    alert(error.message)

    return

  }

  alert("Availability saved!")

}

  return (

    <div className="min-h-screen bg-black text-white p-8">

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-5xl font-bold mb-3">
          Guide Dashboard
        </h1>

        <p className="text-white/60">
          Manage your sessions and availability
        </p>

      </div>

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
    Availability
  </h2>

  <div className="grid md:grid-cols-3 gap-5 mb-6">

    {/* DAY */}

    <div>

      <label className="block text-white/60 mb-3">
        Day
      </label>

      <select
        value={dayOfWeek}
        onChange={(e)=>
          setDayOfWeek(Number(e.target.value))
        }

        className="
          w-full
          bg-black
          border
          border-white/10
          rounded-2xl
          p-4
          text-white
        "
      >

        <option value={1}>Monday</option>
        <option value={2}>Tuesday</option>
        <option value={3}>Wednesday</option>
        <option value={4}>Thursday</option>
        <option value={5}>Friday</option>
        <option value={6}>Saturday</option>
        <option value={0}>Sunday</option>

      </select>

    </div>

    {/* START */}

    <div>

      <label className="block text-white/60 mb-3">
        Start Time
      </label>

      <input
        type="time"
        value={startTime}
        onChange={(e)=>
          setStartTime(e.target.value)
        }

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

    {/* END */}

    <div>

      <label className="block text-white/60 mb-3">
        End Time
      </label>

      <input
        type="time"
        value={endTime}
        onChange={(e)=>
          setEndTime(e.target.value)
        }

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

  </div>

  <button
    onClick={saveAvailability}

    disabled={savingAvailability}

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
      savingAvailability
        ? "Saving..."
        : "Save Availability"
    }

  </button>

</div>

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-5 mb-10">

        <div className="bg-zinc-900 rounded-3xl p-6 border border-white/10">

          <div className="text-white/50 text-sm mb-2">
            Total Sessions
          </div>

          <div className="text-4xl font-bold">
            {sessions.length}
          </div>

        </div>

        <div className="bg-zinc-900 rounded-3xl p-6 border border-white/10">

          <div className="text-white/50 text-sm mb-2">
            Upcoming
          </div>

          <div className="text-4xl font-bold">

            {
              sessions.filter(
                (s) =>
                  new Date(s.scheduled_for) > new Date()
              ).length
            }

          </div>

        </div>

        <div className="bg-zinc-900 rounded-3xl p-6 border border-white/10">

          <div className="text-white/50 text-sm mb-2">
            Completed
          </div>

          <div className="text-4xl font-bold">

            {
              sessions.filter(
                (s) =>
                  new Date(s.scheduled_for) < new Date()
              ).length
            }

          </div>

        </div>

      </div>

      {/* SESSION LIST */}

      <div className="bg-zinc-900 rounded-3xl border border-white/10 overflow-hidden">

        <div className="p-6 border-b border-white/10">

          <h2 className="text-2xl font-bold">
            Upcoming Sessions
          </h2>

        </div>

        {loading ? (

          <div className="p-10 text-white/50">
            Loading sessions...
          </div>

        ) : sessions.length === 0 ? (

          <div className="p-10 text-white/50">
            No sessions found
          </div>

        ) : (

          <div className="divide-y divide-white/5">

            {sessions.map((session) => (

              <div
                key={session.id}
                className="
                  p-6
                  flex
                  items-center
                  justify-between
                  hover:bg-white/5
                  transition
                "
              >

                <div>

                  <div className="font-semibold text-lg mb-1">
                    {session.student_name}
                  </div>

                  <div className="text-white/50 text-sm mb-1">
                    {session.student_email}
                  </div>

                  <div className="text-white/40 text-sm">
                    {new Date(
                      session.scheduled_for
                    ).toLocaleString()}
                  </div>

                </div>

                <div className="flex gap-3 items-center">

  <button
    className="
      bg-white/10
      hover:bg-white/20
      px-4
      py-2
      rounded-xl
      text-sm
      transition
    "
  >
    Notes
  </button>

  <button
    className="
      bg-red-500/20
      hover:bg-red-500/30
      text-red-300
      px-4
      py-2
      rounded-xl
      text-sm
      transition
    "
  >
    Cancel
  </button>

  <div
    className="
      px-4
      py-2
      rounded-full
      bg-yellow-500
      text-black
      font-semibold
      text-sm
    "
  >
    {session.status}
  </div>

</div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  )

}