"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import NavBar from "@/components/NavBar";

export default function DashboardPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);

  const [profile, setProfile] = useState(null);

  const [sessions, setSessions] = useState([]);

  const [isGuide, setIsGuide] = useState(false);

  useEffect(() => {

    async function loadDashboard() {

      const { data: authData } =
        await supabase.auth.getUser();

      if (!authData?.user) {

        router.push("/");

        return;

      }

      const currentUser = authData.user;

      setUser(currentUser);

      const { data: profileData } =
        await supabase
          .from("user_profiles")
          .select("*")
          .eq("user_id", currentUser.id)
          .single();

      if (profileData) {

        setProfile(profileData);

      }

      const { data: guideData } =
        await supabase
          .from("guides")
          .select("id")
          .eq("user_id", currentUser.id)
          .single();

      let sessionQuery =
        supabase
          .from("sessions")
          .select("*");

      if (guideData) {

        setIsGuide(true);

        sessionQuery =
          sessionQuery.eq(
            "guide_id",
            guideData.id
          );

      } else {

        sessionQuery =
          sessionQuery.eq(
            "user_id",
            currentUser.id
          );

      }

      const { data: sessionData } =
        await sessionQuery;

      setSessions(sessionData || []);

      setLoading(false);

    }

    loadDashboard();

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
            Loading Dashboard...
          </div>

          <div className="text-white/50">
            Preparing your growth workspace
          </div>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gradient-to-b from-[#050300] to-[#0c0903] text-[#F7E8C5]">

      <NavBar />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">

        {/* HERO */}

        <div className="mb-14 md:mb-20">

          <div className="text-[#D4A43B] uppercase tracking-[0.35em] text-xs mb-5">

            Guided Growth System

          </div>

          <h1
            className="
              text-5xl
              md:text-7xl
              font-bold
              leading-[1.05]
              mb-5
            "
          >

            Welcome Back

          </h1>

          <p
            className="
              text-[#F7E8C5]/70
              text-base
              md:text-xl
              max-w-3xl
              leading-relaxed
            "
          >

            Continue compounding your growth, leverage and strategic momentum.

          </p>

          {/* CTA */}

          <div className="mt-10 flex flex-col sm:flex-row gap-4">

            <Link
              href="/discover"

              className="
                px-6
                py-4
                rounded-2xl
                bg-[#D4A43B]
                text-black
                font-bold
                hover:scale-[1.02]
                transition
                text-center
              "
            >
              Discover Yourself
            </Link>

            <Link
              href="/guides"

              className="
                px-6
                py-4
                rounded-2xl
                border
                border-[#2a2112]
                hover:border-[#D4A43B]/40
                transition
                text-center
              "
            >
              Find Guides
            </Link>

            {
              isGuide && (

                <Link
                  href="/guide-dashboard"

                  className="
                    px-6
                    py-4
                    rounded-2xl
                    border
                    border-[#D4A43B]/30
                    bg-[#D4A43B]/10
                    hover:bg-[#D4A43B]/20
                    transition
                    text-center
                  "
                >
                  Guide Dashboard
                </Link>

              )
            }

          </div>

          {/* USER */}

          <div className="mt-8 text-sm text-[#D4A43B]">

            {user?.email}

          </div>

          {/* ARCHETYPE */}

          {
            profile?.archetype_data && (

              <div
                className="
                  mt-8
                  inline-flex
                  items-center
                  gap-4
                  px-5
                  py-4
                  rounded-2xl
                  border
                  border-[#2a2112]
                  bg-white/[0.03]
                "

                style={{
                  boxShadow:
                    `0 0 30px ${profile.archetype_data.glow}`
                }}
              >

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    text-2xl
                  "

                  style={{
                    background:
                      profile.archetype_data.glow,

                    border:
                      `1px solid ${profile.archetype_data.color}`
                  }}
                >

                  {profile.archetype_data.emoji}

                </div>

                <div>

                  <div className="text-[#D4A43B] text-xs uppercase tracking-[0.2em]">

                    Archetype

                  </div>

                  <div
                    className="font-bold text-xl"

                    style={{
                      color:
                        profile.archetype_data.color
                    }}
                  >

                    {profile.archetype_data.name}

                  </div>

                </div>

              </div>

            )
          }

        </div>

        {/* STATS */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-6
            mb-14
          "
        >

          {/* TOTAL */}

          <div
            className="
              rounded-[28px]
              border
              border-[#2a2112]
              bg-white/[0.03]
              backdrop-blur-xl
              p-7
            "
          >

            <div className="text-[#D4A43B] text-xs uppercase tracking-[0.25em]">

              Total Sessions

            </div>

            <div className="text-5xl md:text-6xl font-bold mt-5">

              {sessions.length}

            </div>

          </div>

          {/* UPCOMING */}

          <div
            className="
              rounded-[28px]
              border
              border-[#2a2112]
              bg-white/[0.03]
              backdrop-blur-xl
              p-7
            "
          >

            <div className="text-[#D4A43B] text-xs uppercase tracking-[0.25em]">

              Upcoming

            </div>

            <div className="text-5xl md:text-6xl font-bold mt-5">

              {upcomingSessions.length}

            </div>

          </div>

          {/* COMPLETED */}

          <div
            className="
              rounded-[28px]
              border
              border-[#2a2112]
              bg-white/[0.03]
              backdrop-blur-xl
              p-7
            "
          >

            <div className="text-[#D4A43B] text-xs uppercase tracking-[0.25em]">

              Completed

            </div>

            <div className="text-5xl md:text-6xl font-bold mt-5">

              {completedSessions.length}

            </div>

          </div>

          {/* ROLE */}

          <div
            className="
              rounded-[28px]
              border
              border-[#2a2112]
              bg-white/[0.03]
              backdrop-blur-xl
              p-7
            "
          >

            <div className="text-[#D4A43B] text-xs uppercase tracking-[0.25em]">

              Account Type

            </div>

            <div className="text-3xl md:text-4xl font-bold mt-5">

              {
                isGuide
                  ? "Guide"
                  : "Explorer"
              }

            </div>

          </div>

        </div>

        {/* SESSION PREVIEW */}

        <div
          className="
            rounded-[32px]
            border
            border-[#2a2112]
            bg-white/[0.03]
            backdrop-blur-xl
            overflow-hidden
          "
        >

          <div className="p-6 md:p-8 border-b border-[#2a2112]">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div>

                <div className="text-3xl font-bold mb-3">

                  Recent Sessions

                </div>

                <div className="text-[#F7E8C5]/60">

                  Your latest mentorship interactions

                </div>

              </div>

              <Link
                href="/sessions"

                className="
                  px-5
                  py-3
                  rounded-2xl
                  border
                  border-[#2a2112]
                  hover:border-[#D4A43B]/40
                  transition
                  text-center
                "
              >
                View All Sessions
              </Link>

            </div>

          </div>

          {
            sessions.length === 0 ? (

              <div className="p-10 text-[#F7E8C5]/50">

                No sessions yet.

              </div>

            ) : (

              <div className="divide-y divide-[#2a2112]">

                {
                  sessions
                    .slice(0, 5)
                    .map((session) => (

                      <div
                        key={session.id}

                        className="
                          p-6
                          md:p-8
                          flex
                          flex-col
                          lg:flex-row
                          lg:items-center
                          lg:justify-between
                          gap-6
                        "
                      >

                        <div>

                          <div className="font-bold text-xl mb-3">

                            {
                              new Date(
                                session.scheduled_for
                              ).toLocaleString()
                            }

                          </div>

                          <div className="text-[#F7E8C5]/60">

                            Status: {session.status}

                          </div>

                        </div>

                        <Link
                          href={`/sessions/${session.id}`}

                          className="
                            px-5
                            py-4
                            rounded-2xl
                            bg-[#D4A43B]
                            text-black
                            font-bold
                            hover:scale-[1.02]
                            transition
                            text-center
                          "
                        >
                          Open Session
                        </Link>

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