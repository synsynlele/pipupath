"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { supabase } from "../../lib/supabase";

export default function GuidesPage() {

  const [guides, setGuides] = useState([]);

  const [loading, setLoading] = useState(true);

  const [isGuide, setIsGuide] = useState(false);

  useEffect(() => {

    async function loadData() {

      const { data: userData } =
        await supabase.auth.getUser();

      if (userData?.user) {

        const { data: guideProfile } =
          await supabase
            .from("guides")
            .select("id")
            .eq("user_id", userData.user.id)
            .single();

        if (guideProfile) {
          setIsGuide(true);
        }

      }

      const { data } =
        await supabase
          .from("guides")
          .select("*")
          .order("created_at", {
            ascending: false
          });

      setGuides(data || []);

      setLoading(false);

    }

    loadData();

  }, []);

  if (loading) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

        <div className="text-center">

          <div className="text-3xl font-bold mb-4">
            Loading Guides...
          </div>

          <div className="text-white/50">
            Preparing mentorship marketplace
          </div>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-black text-white">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-20">

        {/* HERO */}

        <div className="mb-14 md:mb-20">

          <div className="text-yellow-500 uppercase tracking-[0.3em] text-xs mb-5">

            Human Guidance Layer

          </div>

          <h1
            className="
              text-5xl
              md:text-7xl
              font-bold
              leading-tight
              max-w-4xl
            "
          >
            Find Your Guide
          </h1>

          <p
            className="
              text-white/60
              text-base
              md:text-xl
              mt-6
              max-w-3xl
              leading-relaxed
            "
          >
            Connect with strategic guides aligned with your growth trajectory, business evolution and life direction.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">

            <Link
              href="/sessions"

              className="
                bg-white/5
                hover:bg-white/10
                border
                border-white/10
                px-7
                py-4
                rounded-2xl
                font-semibold
                transition
                text-center
              "
            >
              View Sessions
            </Link>

            {
              isGuide ? (

                <Link
                  href="/guide-dashboard"

                  className="
                    bg-yellow-500
                    hover:bg-yellow-400
                    text-black
                    px-7
                    py-4
                    rounded-2xl
                    font-bold
                    transition
                    text-center
                  "
                >
                  Guide Dashboard
                </Link>

              ) : (

                <Link
                  href="/become-guide"

                  className="
                    bg-yellow-500
                    hover:bg-yellow-400
                    text-black
                    px-7
                    py-4
                    rounded-2xl
                    font-bold
                    transition
                    text-center
                  "
                >
                  Become a Guide
                </Link>

              )
            }

          </div>

        </div>

        {/* GUIDES GRID */}

        {
          guides.length === 0 ? (

            <div
              className="
                bg-zinc-900
                border
                border-white/10
                rounded-3xl
                p-10
                text-white/50
              "
            >
              No guides available yet.
            </div>

          ) : (

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-6
                md:gap-8
              "
            >

              {
                guides.map((guide) => (

                  <div
                    key={guide.id}

                    className="
                      bg-[#080808]
                      border
                      border-white/10
                      rounded-[32px]
                      overflow-hidden
                      hover:border-yellow-500/30
                      transition
                      flex
                      flex-col
                    "
                  >

                    {/* IMAGE */}

                    <div
                      className="
                        aspect-[4/3]
                        overflow-hidden
                        bg-zinc-200
                      "
                    >

                      <img
                        src={
                          guide.profile_image ||
                          "https://placehold.co/600x500?text=Guide"
                        }

                        alt={guide?.full_name || "Guide"}

                        className="
                          w-full
                          h-full
                          object-cover
                        "
                      />

                    </div>

                    {/* CONTENT */}

                    <div className="p-6 flex flex-col flex-1">

                      <div className="flex items-start justify-between gap-4 mb-5">

                        <div>

                          <h2 className="text-2xl font-bold leading-tight">

                            {guide.full_name || "Guide"}

                          </h2>

                          <div className="text-yellow-500 text-sm mt-3">

                            {guide.headline || "Professional Guide"}

                          </div>

                        </div>

                        <div className="text-yellow-500 text-sm font-semibold whitespace-nowrap">

                          ★ 5

                        </div>

                      </div>

                      <p
                        className="
                          text-white/60
                          leading-relaxed
                          flex-1
                        "
                      >
                        {guide.bio || "No bio yet"}
                      </p>

                      {/* EXPERTISE */}

                      {
                        guide.expertise?.length > 0 && (

                          <div className="flex flex-wrap gap-2 mt-6">

                            {
                              guide.expertise
                                .slice(0, 3)
                                .map((item, index) => (

                                  <div
                                    key={index}

                                    className="
                                      px-3
                                      py-2
                                      rounded-xl
                                      bg-white/5
                                      border
                                      border-white/10
                                      text-xs
                                      text-white/70
                                    "
                                  >
                                    {item}
                                  </div>

                                ))
                            }

                          </div>

                        )
                      }

                      {/* FOOTER */}

                      <div className="mt-8 flex flex-col gap-4">

                        {
                          guide.hourly_rate && (

                            <div className="text-white/50 text-sm">

                              ₦{guide.hourly_rate}/session

                            </div>

                          )
                        }

                        <Link
                          href={`/guides/${guide.id}`}

                          className="
                            bg-yellow-500
                            hover:bg-yellow-400
                            text-black
                            font-bold
                            px-5
                            py-4
                            rounded-2xl
                            transition
                            text-center
                          "
                        >
                          View Guide
                        </Link>

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

  );

}