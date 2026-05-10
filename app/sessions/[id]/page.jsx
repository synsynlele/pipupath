"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { supabase } from "../../../lib/supabase";

export default function SessionDetailPage() {

  const params = useParams();

  const router = useRouter();

  const [session, setSession] = useState(null);

  const [loading, setLoading] = useState(true);

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {

    async function loadSession() {

      const { data: authData } =
        await supabase.auth.getUser();

      if (!authData?.user) {

        router.push("/");

        return;

      }

      const { data, error } =
        await supabase
          .from("sessions")
          .select(`
            *,
            guides (
              full_name,
              headline,
              profile_image
            )
          `)
          .eq("id", params.id)
          .single();

      if (!data || error) {

        setLoading(false);

        return;

      }

      const isOwner =
        data.user_id === authData.user.id;

      const { data: guideData } =
        await supabase
          .from("guides")
          .select("id")
          .eq("user_id", authData.user.id)
          .single();

      const isGuide =
        guideData?.id === data.guide_id;

      if (!isOwner && !isGuide) {

        router.push("/dashboard");

        return;

      }

      setAuthorized(true);

      setSession(data);

      setLoading(false);

    }

    if (params?.id) {
      loadSession();
    }

  }, [params, router]);

  if (loading) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

        <div className="text-center">

          <div className="text-3xl font-bold mb-4">
            Loading Session...
          </div>

          <div className="text-white/50">
            Preparing session workspace
          </div>

        </div>

      </div>

    );

  }

  if (!authorized || !session) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

        <div className="text-center">

          <div className="text-3xl font-bold mb-4">
            Session Not Available
          </div>

          <div className="text-white/50 mb-8">
            You do not have access to this session.
          </div>

          <button
            onClick={() =>
              router.push("/dashboard")
            }

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
            Return to Dashboard
          </button>

        </div>

      </div>

    );

  }

  const roomUrl =
    `https://meet.jit.si/${session.room_name}`;

  return (

    <div className="min-h-screen bg-black text-white">

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-20">

        {/* BACK */}

        <button
          onClick={() => router.back()}

          className="
            inline-flex
            items-center
            gap-2
            text-white/60
            hover:text-white
            mb-10
            transition
          "
        >
          ← Back
        </button>

        {/* HERO */}

        <div
          className="
            flex
            flex-col
            lg:flex-row
            gap-8
            lg:gap-10
            items-start
            mb-12
          "
        >

          {/* IMAGE */}

          <div className="flex-shrink-0">

            <img
              src={
                session.guides?.profile_image ||
                "https://placehold.co/400x400?text=Guide"
              }

              alt={
                session.guides?.full_name ||
                "Guide"
              }

              className="
                w-28
                h-28
                md:w-36
                md:h-36
                rounded-3xl
                object-cover
                border
                border-white/10
              "
            />

          </div>

          {/* CONTENT */}

          <div className="flex-1">

            <div className="text-yellow-500 uppercase tracking-[0.3em] text-xs mb-5">

              Guidance Session

            </div>

            <h1
              className="
                text-4xl
                md:text-6xl
                font-bold
                leading-tight
                mb-4
              "
            >

              {session.guides?.full_name}

            </h1>

            <p className="text-white/60 text-lg md:text-2xl max-w-3xl leading-relaxed">

              {session.guides?.headline}

            </p>

          </div>

        </div>

        {/* SESSION INFO */}

        <div
          className="
            bg-zinc-900
            border
            border-white/10
            rounded-3xl
            p-6
            md:p-8
            mb-10
          "
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* TIME */}

            <div>

              <div className="text-white/50 text-sm mb-3">

                Scheduled Time

              </div>

              <div className="text-2xl md:text-3xl font-bold leading-tight">

                {
                  new Date(
                    session.scheduled_for
                  ).toLocaleString()
                }

              </div>

            </div>

            {/* STATUS */}

            <div>

              <div className="text-white/50 text-sm mb-3">

                Session Status

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
            p-6
            md:p-8
          "
        >

          <h2 className="text-3xl md:text-4xl font-bold mb-5">

            Live Session Room

          </h2>

          <p className="text-white/60 leading-relaxed max-w-2xl mb-8">

            Enter the private live session room to begin your mentorship conversation.

          </p>

          <a
            href={roomUrl}
            target="_blank"
            rel="noopener noreferrer"

            className="
              inline-flex
              items-center
              justify-center
              bg-yellow-500
              hover:bg-yellow-400
              text-black
              font-bold
              px-8
              py-5
              rounded-2xl
              transition
              w-full
              md:w-auto
            "
          >

            Join Live Session

          </a>

        </div>

      </div>

    </div>

  );

}