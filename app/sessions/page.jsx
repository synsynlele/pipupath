"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function SessionsPage() {

  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function loadSessions() {

      const { data, error } = await supabase
        .from("sessions")
        .select(`
          *,
          guides (
          full_name,
          headline
          )
        `)
        .order("scheduled_for", { ascending: true })

      if (!error && data) {
        setSessions(data)
      }

      setLoading(false)

    }

    loadSessions()

  }, [])

  const upcomingSessions = sessions.filter(
    (session) =>
      new Date(session.scheduled_for) >= new Date()
  )

  const completedSessions = sessions.filter(
    (session) =>
      new Date(session.scheduled_for) < new Date()
  )

  return (

    <div className="min-h-screen bg-black text-white p-8">

      {/* HEADER */}

      <div className="mb-12">

        <Link
          href="/"
          className="text-white/50 hover:text-white transition"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="text-5xl font-bold mt-5 mb-3">
          Your Sessions
        </h1>

        <p className="text-white/60">
          Track your upcoming and completed guidance sessions
        </p>

      </div>

      {/* UPCOMING */}

      <div className="mb-12">

        <h2 className="text-3xl font-bold mb-6">
          Upcoming Sessions
        </h2>

        {loading ? (

          <div className="text-white/50">
            Loading...
          </div>

        ) : upcomingSessions.length === 0 ? (

          <div
            className="
              bg-zinc-900
              border
              border-white/10
              rounded-3xl
              p-8
              text-white/50
            "
          >
            No upcoming sessions
          </div>

        ) : (

          <div className="space-y-5">

            {upcomingSessions.map((session) => (

              <div
                key={session.id}
                className="
                  bg-zinc-900
                  border
                  border-white/10
                  rounded-3xl
                  p-6
                  flex
                  items-center
                  justify-between
                "
              >

                <div>

                  <div className="text-2xl font-bold mb-2">
                    {session.guides?.full_name}
                  </div>

                  <div className="text-yellow-500 mb-3">
                    {session.guides?.headline}
                  </div>

                  <div className="text-white/60 mb-1">
                    {new Date(
                      session.scheduled_for
                    ).toLocaleString()}
                  </div>

                  <div className="text-white/40 text-sm">
                    {session.student_email}
                  </div>

                </div>

                <div className="flex gap-3 items-center">

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

      {/* COMPLETED */}

      <div>

        <h2 className="text-3xl font-bold mb-6">
          Completed Sessions
        </h2>

        {completedSessions.length === 0 ? (

          <div
            className="
              bg-zinc-900
              border
              border-white/10
              rounded-3xl
              p-8
              text-white/50
            "
          >
            No completed sessions yet
          </div>

        ) : (

          <div className="space-y-5">

            {completedSessions.map((session) => (

              <div
                key={session.id}
                className="
                  bg-zinc-900
                  border
                  border-white/10
                  rounded-3xl
                  p-6
                  flex
                  items-center
                  justify-between
                "
              >

                <div>

                  <div className="text-2xl font-bold mb-2">
                    {session.guides?.full_name}
                  </div>

                  <div className="text-white/60">
                    {new Date(
                      session.scheduled_for
                    ).toLocaleString()}
                  </div>

                </div>

                <div
                  className="
                    px-4
                    py-2
                    rounded-full
                    bg-white/10
                    text-white
                    text-sm
                  "
                >
                  Completed
                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  )

}