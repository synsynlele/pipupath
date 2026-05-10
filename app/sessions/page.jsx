"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { supabase } from "@/lib/supabase";

import { useRouter } from "next/navigation";

export default function SessionsPage() {

  const router = useRouter();

  const [sessions, setSessions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [isGuide, setIsGuide] = useState(false);

  useEffect(() => {

    async function loadSessions() {

      const { data: authData } =
        await supabase.auth.getUser();

      if (!authData?.user) {

        router.push("/");

        return;

      }

      const user = authData.user;

      const { data: guideData } =
        await supabase
          .from("guides")
          .select("id")
          .eq("user_id", user.id)
          .single();

      let query =
        supabase
          .from("sessions")
          .select(`
            *,
            guides (
              full_name,
              headline,
              profile_image
            )
          `);

      if (guideData) {

        setIsGuide(true);

        query =
          query.eq(
            "guide_id",
            guideData.id
          );

      } else {

        query =
          query.eq(
            "user_id",
            user.id
          );

      }

      const { data, error } =
        await query.order(
          "scheduled_for",
          {
            ascending: true
          }
        );

      if (!error && data) {

        setSessions(data);

      }

      setLoading(false);

    }

    loadSessions();

  }, [router]);

  const upcomingSessions =
    sessions.filter(
      (session) =>
        new Date(session.scheduled_for) >=
        new Date()
    );

  const completedSessions =
    sessions.filter(
      (session) =>
        new Date(session.scheduled_for) <
        new Date()
    );

  if (loading) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

        <div className="text-center">

          <div className="text-3xl font-bold mb-4">
            Loading Sessions...
          </div>

          <div className="text-white/50">
            Preparing session workspace
          </div>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-black text-white">

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-20">

        {/* HEADER */}

        <div className="mb-14">

          <Link
            href="/dashboard"

            className="
              inline-flex
              items-center
              gap-2
              text-white/50
              hover:text-white
              transition
            "
          >
            ← Back to Dashboard
          </Link>

          <div className="mt-8">

            <div className="text-yellow-500 uppercase tracking-[0.3em] text-xs mb-5">

              Session Workspace

            </div>

            <h1
              className="
                text-5xl
                md:text-7xl
                font-bold
                leading-tight
                mb-5
              "
            >

              {
                isGuide
                  ? "Guide Sessions"
                  : "Your Sessions"
              }

            </h1>

            <p className="text-white/60 text-lg max-w-3xl leading-relaxed">

              {
                isGuide

                  ? "Manage mentorship sessions, live rooms and upcoming conversations."

                  : "Track upcoming guidance sessions and continue your growth journey."
              }

            </p>

          </div>

        </div>

        {/* UPCOMING */}

        <div className="mb-16">

          <h2 className="text-3xl md:text-4xl font-bold mb-8">

            Upcoming Sessions

          </h2>

          {
            upcomingSessions.length === 0 ? (

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

              <div className="space-y-6">

                {
                  upcomingSessions.map((session) => (

                    <div
                      key={session.id}

                      className="
                        bg-zinc-900
                        border
                        border-white/10
                        rounded-3xl
                        p-6
                        md:p-8
                      "
                    >

                      <div
                        className="
                          flex
                          flex-col
                          lg:flex-row
                          lg:items-center
                          lg:justify-between
                          gap-8
                        "
                      >

                        {/* LEFT */}

                        <div
                          className="
                            flex
                            flex-col
                            md:flex-row
                            gap-6
                            md:items-center
                          "
                        >

                          <img
                            src={
                              session.guides
                                ?.profile_image ||

                              "https://placehold.co/300x300?text=Guide"
                            }

                            alt={
                              session.guides
                                ?.full_name ||
                              "Guide"
                            }

                            className="
                              w-24
                              h-24
                              rounded-3xl
                              object-cover
                              border
                              border-white/10
                            "
                          />

                          <div>

                            <div className="text-2xl font-bold mb-2">

                              {
                                session.guides
                                  ?.full_name
                              }

                            </div>

                            <div className="text-yellow-500 mb-4">

                              {
                                session.guides
                                  ?.headline
                              }

                            </div>

                            <div className="text-white/60 mb-2">

                              {
                                new Date(
                                  session.scheduled_for
                                ).toLocaleString()
                              }

                            </div>

                            {
                              isGuide && (

                                <div className="text-white/40 text-sm break-all">

                                  {
                                    session.student_email
                                  }

                                </div>

                              )
                            }

                          </div>

                        </div>

                        {/* RIGHT */}

                        <div
                          className="
                            flex
                            flex-col
                            sm:flex-row
                            gap-4
                            sm:items-center
                          "
                        >

                          <Link
                            href={`/sessions/${session.id}`}

                            className="
                              bg-yellow-500
                              hover:bg-yellow-400
                              text-black
                              font-bold
                              px-6
                              py-4
                              rounded-2xl
                              transition
                              text-center
                            "
                          >
                            Open Session
                          </Link>

                          <div
                            className="
                              inline-flex
                              items-center
                              justify-center
                              px-5
                              py-3
                              rounded-full
                              bg-yellow-500
                              text-black
                              font-bold
                              text-sm
                            "
                          >

                            {session.status}

                          </div>

                        </div>

                      </div>

                    </div>

                  ))
                }

              </div>

            )
          }

        </div>

        {/* COMPLETED */}

        <div>

          <h2 className="text-3xl md:text-4xl font-bold mb-8">

            Completed Sessions

          </h2>

          {
            completedSessions.length === 0 ? (

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

              <div className="space-y-6">

                {
                  completedSessions.map((session) => (

                    <div
                      key={session.id}

                      className="
                        bg-zinc-900
                        border
                        border-white/10
                        rounded-3xl
                        p-6
                        md:p-8
                      "
                    >

                      <div
                        className="
                          flex
                          flex-col
                          lg:flex-row
                          lg:items-center
                          lg:justify-between
                          gap-8
                        "
                      >

                        {/* LEFT */}

                        <div
                          className="
                            flex
                            flex-col
                            md:flex-row
                            gap-6
                            md:items-center
                          "
                        >

                          <img
                            src={
                              session.guides
                                ?.profile_image ||

                              "https://placehold.co/300x300?text=Guide"
                            }

                            alt={
                              session.guides
                                ?.full_name ||
                              "Guide"
                            }

                            className="
                              w-24
                              h-24
                              rounded-3xl
                              object-cover
                              border
                              border-white/10
                            "
                          />

                          <div>

                            <div className="text-2xl font-bold mb-2">

                              {
                                session.guides
                                  ?.full_name
                              }

                            </div>

                            <div className="text-white/60">

                              {
                                new Date(
                                  session.scheduled_for
                                ).toLocaleString()
                              }

                            </div>

                          </div>

                        </div>

                        {/* RIGHT */}

                        <div
                          className="
                            flex
                            flex-col
                            sm:flex-row
                            gap-4
                            sm:items-center
                          "
                        >

                          <Link
                            href={`/sessions/${session.id}`}

                            className="
                              bg-white/10
                              hover:bg-white/20
                              text-white
                              font-semibold
                              px-6
                              py-4
                              rounded-2xl
                              transition
                              text-center
                            "
                          >
                            View Session
                          </Link>

                          <div
                            className="
                              inline-flex
                              items-center
                              justify-center
                              px-5
                              py-3
                              rounded-full
                              bg-white/10
                              text-white
                              text-sm
                            "
                          >

                            Completed

                          </div>

                        </div>

                      </div>

                    </div>

                  ))
                }

              </div>

            )
          }

        </div>

      </div>

    </div>

  );

}