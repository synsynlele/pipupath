"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { supabase } from "../../lib/supabase";

import NavBar from "@/components/NavBar";

export default function GuideDashboardPage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [uploadingImage, setUploadingImage] =
    useState(false);

  const [savingAvailability, setSavingAvailability] =
    useState(false);

  const [guide, setGuide] =
    useState(null);

  const [sessions, setSessions] =
    useState([]);

  const [availability, setAvailability] =
    useState([]);

  const [dayOfWeek, setDayOfWeek] =
    useState(1);

  const [startTime, setStartTime] =
    useState("09:00");

  const [endTime, setEndTime] =
    useState("17:00");

  useEffect(() => {

    async function initializeDashboard() {

      const { data: authData } =
        await supabase.auth.getUser();

      if (!authData?.user) {

        router.push("/");

        return;

      }

      const { data: guideData } =
        await supabase
          .from("guides")
          .select("*")
          .eq("user_id", authData.user.id)
          .single();

      if (!guideData) {

        router.push("/become-guide");

        return;

      }

      setGuide(guideData);

      const { data: sessionData } =
        await supabase
          .from("sessions")
          .select("*")
          .eq("guide_id", guideData.id)
          .order(
            "scheduled_for",
            {
              ascending: true
            }
          );

      const { data: availabilityData } =
        await supabase
          .from("guide_availability")
          .select("*")
          .eq("guide_id", guideData.id)
          .eq("is_active", true)
          .order("day_of_week");

      setSessions(sessionData || []);

      setAvailability(
        availabilityData || []
      );

      setLoading(false);

    }

    initializeDashboard();

  }, [router]);

  async function uploadGuideImage(event) {

    const file =
      event.target.files?.[0];

    if (!file || !guide) {
      return;
    }

    setUploadingImage(true);

    const fileExt =
      file.name.split(".").pop();

    const fileName =
      `${guide.id}-${Date.now()}.${fileExt}`;

    const { error: uploadError } =
      await supabase.storage
        .from("guide-images")
        .upload(fileName, file);

    if (uploadError) {

      alert(uploadError.message);

      setUploadingImage(false);

      return;

    }

    const {
      data: { publicUrl }
    } = supabase.storage
      .from("guide-images")
      .getPublicUrl(fileName);

    const { error: updateError } =
      await supabase
        .from("guides")
        .update({
          profile_image: publicUrl
        })
        .eq("id", guide.id);

    setUploadingImage(false);

    if (updateError) {

      alert(updateError.message);

      return;

    }

    setGuide({
      ...guide,
      profile_image: publicUrl
    });

  }

  async function saveAvailability() {

    if (!guide?.id) {

      alert("Guide profile missing");

      return;

    }

    setSavingAvailability(true);

    const { error } =
      await supabase
        .from("guide_availability")
        .insert({

          guide_id: guide.id,

          day_of_week: dayOfWeek,

          start_time: startTime,

          end_time: endTime,

          is_active: true

        });

    setSavingAvailability(false);

    if (error) {

      alert(error.message);

      return;

    }

    const { data } =
      await supabase
        .from("guide_availability")
        .select("*")
        .eq("guide_id", guide.id)
        .eq("is_active", true)
        .order("day_of_week");

    setAvailability(data || []);

    alert("Availability saved!");

  }

  async function removeAvailability(id) {

    await supabase
      .from("guide_availability")
      .delete()
      .eq("id", id);

    setAvailability(
      availability.filter(
        (slot) =>
          slot.id !== id
      )
    );

  }

  const upcomingSessions =
    sessions.filter(
      (session) =>
        new Date(
          session.scheduled_for
        ) >= new Date()
    );

  const completedSessions =
    sessions.filter(
      (session) =>
        new Date(
          session.scheduled_for
        ) < new Date()
    );

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  if (loading) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

        <div className="text-center">

          <div className="text-3xl font-bold mb-4">

            Loading Guide Dashboard...

          </div>

          <div className="text-white/50">

            Preparing transformation workspace

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

        <div className="mb-16">

          <div className="text-[#D4A43B] uppercase tracking-[0.35em] text-xs mb-5">

            Transformation Operator Dashboard

          </div>

          <div
            className="
              flex
              flex-col
              xl:flex-row
              xl:items-center
              xl:justify-between
              gap-10
            "
          >

            {/* LEFT */}

            <div
              className="
                flex
                flex-col
                md:flex-row
                gap-8
                md:items-center
              "
            >

              {/* IMAGE */}

              <div className="relative">

                {
                  guide?.profile_image ? (

                    <img
                      src={
                        guide.profile_image
                      }

                      alt={
                        guide.full_name
                      }

                      className="
                        w-36
                        h-36
                        rounded-[32px]
                        object-cover
                        border
                        border-[#2a2112]
                        shadow-[0_20px_60px_rgba(0,0,0,0.4)]
                      "
                    />

                  ) : (

                    <div
                      className="
                        w-36
                        h-36
                        rounded-[32px]
                        border
                        border-[#2a2112]
                        bg-[#120d06]
                      "
                    />

                  )
                }

              </div>

              {/* TEXT */}

              <div>

                <h1
                  className="
                    text-5xl
                    md:text-7xl
                    font-bold
                    leading-[1.03]
                    mb-5
                  "
                >

                  {guide?.full_name}

                </h1>

                <div
                  className="
                    text-[#D4A43B]
                    text-xl
                    mb-6
                  "
                >

                  {
                    guide?.headline
                  }

                </div>

                <p
                  className="
                    text-[#F7E8C5]/65
                    text-lg
                    leading-relaxed
                    max-w-3xl
                  "
                >

                  {
                    guide?.bio
                  }

                </p>

                {/* EXPERTISE */}

                {
                  guide?.expertise?.length > 0 && (

                    <div className="flex flex-wrap gap-3 mt-8">

                      {
                        guide.expertise.map(
                          (
                            item,
                            index
                          ) => (

                            <div
                              key={index}

                              className="
                                px-4
                                py-2
                                rounded-2xl
                                border
                                border-[#2a2112]
                                bg-white/[0.03]
                                text-sm
                              "
                            >

                              {item}

                            </div>

                          )
                        )
                      }

                    </div>

                  )
                }

              </div>

            </div>

            {/* ACTIONS */}

            <div className="flex flex-col gap-4 w-full xl:w-auto">

              <label
                className="
                  cursor-pointer
                  bg-[#D4A43B]
                  hover:bg-[#e5b84b]
                  text-black
                  font-bold
                  px-7
                  py-5
                  rounded-2xl
                  transition
                  text-center
                "
              >

                {
                  uploadingImage

                    ? "Uploading..."

                    : "Upload Profile Image"
                }

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    uploadGuideImage
                  }

                  className="hidden"
                />

              </label>

              <Link
                href={`/guides/${guide?.id}`}

                className="
                  border
                  border-[#2a2112]
                  hover:border-[#D4A43B]/40
                  px-7
                  py-5
                  rounded-2xl
                  transition
                  text-center
                "
              >

                View Public Profile

              </Link>

            </div>

          </div>

        </div>

        {/* METRICS */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-6
            mb-16
          "
        >

          {/* TOTAL */}

          <div
            className="
              rounded-[32px]
              border
              border-[#2a2112]
              bg-white/[0.03]
              p-7
            "
          >

            <div className="text-[#D4A43B] text-xs uppercase tracking-[0.3em] mb-5">

              Total Sessions

            </div>

            <div className="text-6xl font-bold">

              {sessions.length}

            </div>

          </div>

          {/* UPCOMING */}

          <div
            className="
              rounded-[32px]
              border
              border-[#2a2112]
              bg-white/[0.03]
              p-7
            "
          >

            <div className="text-[#D4A43B] text-xs uppercase tracking-[0.3em] mb-5">

              Upcoming

            </div>

            <div className="text-6xl font-bold">

              {
                upcomingSessions.length
              }

            </div>

          </div>

          {/* COMPLETED */}

          <div
            className="
              rounded-[32px]
              border
              border-[#2a2112]
              bg-white/[0.03]
              p-7
            "
          >

            <div className="text-[#D4A43B] text-xs uppercase tracking-[0.3em] mb-5">

              Completed

            </div>

            <div className="text-6xl font-bold">

              {
                completedSessions.length
              }

            </div>

          </div>

          {/* RATE */}

          <div
            className="
              rounded-[32px]
              border
              border-[#2a2112]
              bg-white/[0.03]
              p-7
            "
          >

            <div className="text-[#D4A43B] text-xs uppercase tracking-[0.3em] mb-5">

              Session Rate

            </div>

            <div className="text-4xl font-bold">

              ₦{
                guide?.hourly_rate ||
                0
              }

            </div>

          </div>

        </div>

        {/* MAIN GRID */}

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-3
            gap-8
          "
        >

          {/* LEFT COLUMN */}

          <div className="xl:col-span-2 space-y-8">

            {/* ACTIVE SESSIONS */}

            <div
              className="
                rounded-[36px]
                border
                border-[#2a2112]
                bg-white/[0.03]
                overflow-hidden
              "
            >

              <div className="p-6 md:p-8 border-b border-[#2a2112]">

                <div className="flex items-center justify-between gap-4">

                  <div>

                    <h2 className="text-3xl font-bold mb-3">

                      Active Transformations

                    </h2>

                    <div className="text-[#F7E8C5]/60">

                      Students currently booked into your guidance system

                    </div>

                  </div>

                  <Link
                    href="/sessions"

                    className="
                      hidden
                      md:flex
                      px-5
                      py-3
                      rounded-2xl
                      border
                      border-[#2a2112]
                      hover:border-[#D4A43B]/40
                      transition
                    "
                  >

                    All Sessions

                  </Link>

                </div>

              </div>

              {
                upcomingSessions.length === 0 ? (

                  <div className="p-10 text-[#F7E8C5]/50">

                    No active sessions yet.

                  </div>

                ) : (

                  <div className="divide-y divide-[#2a2112]">

                    {
                      upcomingSessions.map(
                        (
                          session
                        ) => (

                          <div
                            key={
                              session.id
                            }

                            className="
                              p-6
                              md:p-8
                              flex
                              flex-col
                              lg:flex-row
                              lg:items-center
                              lg:justify-between
                              gap-8
                            "
                          >

                            {/* LEFT */}

                            <div>

                              <div className="text-2xl font-bold mb-3">

                                {
                                  session.student_name
                                }

                              </div>

                              <div className="text-[#F7E8C5]/50 mb-3 break-all">

                                {
                                  session.student_email
                                }

                              </div>

                              <div className="text-[#F7E8C5]/40">

                                {
                                  new Date(
                                    session.scheduled_for
                                  ).toLocaleString()
                                }

                              </div>

                              {
                                session.notes && (

                                  <div
                                    className="
                                      mt-5
                                      rounded-2xl
                                      bg-black/20
                                      border
                                      border-[#2a2112]
                                      p-4
                                      text-[#F7E8C5]/70
                                      leading-relaxed
                                    "
                                  >

                                    {
                                      session.notes
                                    }

                                  </div>

                                )
                              }

                            </div>

                            {/* RIGHT */}

                            <div className="flex flex-col gap-4 w-full lg:w-auto">

                              <Link
                                href={`/sessions/${session.id}`}

                                className="
                                  bg-[#D4A43B]
                                  hover:bg-[#e5b84b]
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
                                  px-5
                                  py-3
                                  rounded-2xl
                                  border
                                  border-[#2a2112]
                                  text-center
                                  text-[#F7E8C5]/70
                                "
                              >

                                {
                                  session.status
                                }

                              </div>

                            </div>

                          </div>

                        )
                      )
                    }

                  </div>

                )
              }

            </div>

          </div>

          {/* RIGHT COLUMN */}

          <div className="space-y-8">

            {/* AVAILABILITY */}

            <div
              className="
                rounded-[36px]
                border
                border-[#2a2112]
                bg-white/[0.03]
                p-6
              "
            >

              <h2 className="text-3xl font-bold mb-8">

                Availability

              </h2>

              <div className="space-y-5">

                {/* DAY */}

                <div>

                  <label className="block text-[#D4A43B] text-sm mb-3">

                    Day

                  </label>

                  <select
                    value={dayOfWeek}

                    onChange={(e) =>
                      setDayOfWeek(
                        Number(
                          e.target.value
                        )
                      )
                    }

                    className="
                      w-full
                      bg-black/30
                      border
                      border-[#2a2112]
                      rounded-2xl
                      p-4
                      outline-none
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

                  <label className="block text-[#D4A43B] text-sm mb-3">

                    Start Time

                  </label>

                  <input
                    type="time"

                    value={startTime}

                    onChange={(e) =>
                      setStartTime(
                        e.target.value
                      )
                    }

                    className="
                      w-full
                      bg-black/30
                      border
                      border-[#2a2112]
                      rounded-2xl
                      p-4
                      outline-none
                    "
                  />

                </div>

                {/* END */}

                <div>

                  <label className="block text-[#D4A43B] text-sm mb-3">

                    End Time

                  </label>

                  <input
                    type="time"

                    value={endTime}

                    onChange={(e) =>
                      setEndTime(
                        e.target.value
                      )
                    }

                    className="
                      w-full
                      bg-black/30
                      border
                      border-[#2a2112]
                      rounded-2xl
                      p-4
                      outline-none
                    "
                  />

                </div>

                {/* SAVE */}

                <button
                  onClick={
                    saveAvailability
                  }

                  disabled={
                    savingAvailability
                  }

                  className="
                    w-full
                    bg-[#D4A43B]
                    hover:bg-[#e5b84b]
                    text-black
                    font-bold
                    py-5
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

            </div>

            {/* ACTIVE AVAILABILITY */}

            <div
              className="
                rounded-[36px]
                border
                border-[#2a2112]
                bg-white/[0.03]
                p-6
              "
            >

              <h2 className="text-2xl font-bold mb-6">

                Active Slots

              </h2>

              {
                availability.length === 0 ? (

                  <div className="text-[#F7E8C5]/50">

                    No availability slots yet.

                  </div>

                ) : (

                  <div className="space-y-4">

                    {
                      availability.map(
                        (
                          slot
                        ) => (

                          <div
                            key={slot.id}

                            className="
                              rounded-2xl
                              border
                              border-[#2a2112]
                              bg-black/20
                              p-5
                            "
                          >

                            <div className="font-bold mb-2">

                              {
                                days[
                                  slot.day_of_week
                                ]
                              }

                            </div>

                            <div className="text-[#F7E8C5]/60 mb-4">

                              {
                                slot.start_time
                              }

                              {" — "}

                              {
                                slot.end_time
                              }

                            </div>

                            <button
                              onClick={() =>
                                removeAvailability(
                                  slot.id
                                )
                              }

                              className="
                                text-red-400
                                hover:text-red-300
                                text-sm
                              "
                            >

                              Remove Slot

                            </button>

                          </div>

                        )
                      )
                    }

                  </div>

                )
              }

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}