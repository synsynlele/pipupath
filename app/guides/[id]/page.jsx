"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { supabase } from "../../../lib/supabase";

import BookingModal from "../../../components/sessions/BookingModal";

export default function GuidePage() {

  const router = useRouter();

  const params = useParams();

  const id = params?.id;

  const [guide, setGuide] = useState(null);

  const [availability, setAvailability] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadGuide() {

      const { data: guideData } =
        await supabase
          .from("guides")
          .select("*")
          .eq("id", id)
          .single();

      if (!guideData) {

        router.push("/guides");

        return;

      }

      setGuide(guideData);

      const { data: availabilityData } =
        await supabase
          .from("guide_availability")
          .select("*")
          .eq("guide_id", id)
          .eq("is_active", true);

      setAvailability(availabilityData || []);

      setLoading(false);

    }

    if (id) {
      loadGuide();
    }

  }, [id, router]);

  if (loading) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

        <div className="text-center">

          <div className="text-3xl font-bold mb-4">
            Loading Guide...
          </div>

          <div className="text-white/50">
            Preparing mentorship profile
          </div>

        </div>

      </div>

    );

  }

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
            lg:gap-12
            items-start
          "
        >

          {/* IMAGE */}

          <div className="flex-shrink-0">

            <img
              src={
                guide.profile_image ||
                "https://placehold.co/500x500?text=Guide"
              }

              alt={guide?.full_name || "Guide"}

              className="
                w-32
                h-32
                md:w-40
                md:h-40
                rounded-3xl
                object-cover
                border
                border-white/10
              "
            />

          </div>

          {/* CONTENT */}

          <div className="flex-1">

            <div className="mb-8">

              <h1 className="text-4xl md:text-6xl font-bold leading-tight">

                {guide.full_name || "Guide"}

              </h1>

              <p className="text-yellow-400 mt-4 text-lg md:text-2xl">

                {guide.headline || "Professional Guide"}

              </p>

              {
                guide.hourly_rate && (

                  <div
                    className="
                      inline-flex
                      mt-5
                      px-5
                      py-3
                      rounded-2xl
                      bg-yellow-500
                      text-black
                      font-bold
                      text-sm
                      md:text-base
                    "
                  >
                    ₦{guide.hourly_rate}/session
                  </div>

                )
              }

            </div>

            {/* EXPERTISE */}

            <div className="flex flex-wrap gap-3">

              {
                guide.expertise?.map((item, index) => (

                  <div
                    key={index}

                    className="
                      px-4
                      py-2
                      rounded-2xl
                      bg-white/10
                      border
                      border-white/10
                      text-sm
                    "
                  >
                    {item}
                  </div>

                ))
              }

            </div>

          </div>

        </div>

        {/* ABOUT */}

        <div className="mt-16 md:mt-24">

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            About
          </h2>

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

            <p
              className="
                text-white/70
                text-base
                md:text-lg
                leading-relaxed
              "
            >
              {guide.bio || "No bio yet"}
            </p>

          </div>

        </div>

        {/* AVAILABILITY */}

        <div className="mt-16 md:mt-24">

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Availability
          </h2>

          {
            availability.length === 0 ? (

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
                No availability published yet.
              </div>

            ) : (

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {
                  availability.map((slot) => (

                    <div
                      key={slot.id}

                      className="
                        bg-zinc-900
                        border
                        border-white/10
                        rounded-3xl
                        p-6
                      "
                    >

                      <div className="font-bold text-lg mb-2">

                        {
                          [
                            "Sunday",
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday"
                          ][slot.day_of_week]
                        }

                      </div>

                      <div className="text-white/60">

                        {slot.start_time} — {slot.end_time}

                      </div>

                    </div>

                  ))
                }

              </div>

            )
          }

        </div>

        {/* BOOKING */}

        <div className="mt-16 md:mt-24">

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

            <div className="mb-8">

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Book Session
              </h2>

              <p className="text-white/60 max-w-2xl">
                Schedule a mentorship session and begin guided growth.
              </p>

            </div>

            <BookingModal
              guideId={guide.id}
            />

          </div>

        </div>

      </div>

    </div>

  );

}