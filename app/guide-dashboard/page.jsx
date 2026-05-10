"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function GuideDashboardPage() {

  const router = useRouter();

  const [sessions, setSessions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [uploadingImage, setUploadingImage] = useState(false);

  const [guideId, setGuideId] = useState(null);

  const [guide, setGuide] = useState(null);

  const [dayOfWeek, setDayOfWeek] = useState(1);

  const [startTime, setStartTime] = useState("09:00");

  const [endTime, setEndTime] = useState("17:00");

  const [savingAvailability, setSavingAvailability] = useState(false);

  useEffect(() => {

    async function initializeDashboard() {

      const { data: userData } =
        await supabase.auth.getUser();

      if (!userData?.user) {

        router.push("/");

        return;

      }

      const { data: guideData } =
        await supabase
          .from("guides")
          .select("*")
          .eq("user_id", userData.user.id)
          .single();

      if (!guideData) {

        router.push("/become-guide");

        return;

      }

      setGuide(guideData);

      setGuideId(guideData.id);

      const { data: sessionData } =
        await supabase
          .from("sessions")
          .select("*")
          .eq("guide_id", guideData.id)
          .order("scheduled_for", {
            ascending: true
          });

      setSessions(sessionData || []);

      setLoading(false);

    }

    initializeDashboard();

  }, [router]);

  async function uploadGuideImage(event) {

    const file = event.target.files?.[0];

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

    if (!guideId) {

      alert("Guide profile not found");

      return;

    }

    setSavingAvailability(true);

    const { error } = await supabase
      .from("guide_availability")
      .insert({
        guide_id: guideId,
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

    alert("Availability saved!");

  }

  if (loading) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

        <div className="text-center">

          <div className="text-2xl md:text-3xl font-bold mb-4">
            Loading Dashboard...
          </div>

          <div className="text-white/50">
            Preparing your guide workspace
          </div>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-black text-white px-4 md:px-8 py-6 md:py-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-10">

          <div className="mb-8">

            {
              guide?.profile_image ? (

                <img
                  src={guide.profile_image}
                  alt={guide?.full_name || "Guide"}
                  className="
                    w-28
                    h-28
                    md:w-32
                    md:h-32
                    rounded-3xl
                    object-cover
                    border
                    border-white/10
                  "
                />

              ) : (

                <div
                  className="
                    w-28
                    h-28
                    md:w-32
                    md:h-32
                    rounded-3xl
                    bg-white/5
                    border
                    border-white/10
                  "
                />

              )
            }

          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Guide Dashboard
          </h1>

          <p className="text-white/60 text-sm md:text-base max-w-2xl">
            Manage your sessions, availability and mentorship operations.
          </p>

          <label
            className="
              inline-flex
              mt-6
              cursor-pointer
              bg-yellow-500
              hover:bg-yellow-400
              text-black
              font-bold
              px-5
              py-3
              md:px-6
              md:py-4
              rounded-2xl
              transition
              text-sm
              md:text-base
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
              onChange={uploadGuideImage}
              className="hidden"
            />

          </label>

        </div>

        {/* AVAILABILITY */}

        <div
          className="
            bg-zinc-900
            border
            border-white/10
            rounded-3xl
            p-5
            md:p-8
            mb-10
          "
        >

          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Availability
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

            <div>

              <label className="block text-white/60 mb-3">
                Day
              </label>

              <select
                value={dayOfWeek}
                onChange={(e) =>
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

            <div>

              <label className="block text-white/60 mb-3">
                Start Time
              </label>

              <input
                type="time"
                value={startTime}
                onChange={(e) =>
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

            <div>

              <label className="block text-white/60 mb-3">
                End Time
              </label>

              <input
                type="time"
                value={endTime}
                onChange={(e) =>
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
              w-full
              md:w-auto
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">

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

          <div className="p-5 md:p-6 border-b border-white/10">

            <h2 className="text-2xl font-bold">
              Upcoming Sessions
            </h2>

          </div>

          {
            sessions.length === 0 ? (

              <div className="p-10 text-white/50">
                No sessions found
              </div>

            ) : (

              <div className="divide-y divide-white/5">

                {
                  sessions.map((session) => (

                    <div
                      key={session.id}

                      className="
                        p-5
                        md:p-6
                        flex
                        flex-col
                        md:flex-row
                        md:items-center
                        md:justify-between
                        gap-5
                        hover:bg-white/5
                        transition
                      "
                    >

                      <div>

                        <div className="font-semibold text-lg mb-1">
                          {session.student_name}
                        </div>

                        <div className="text-white/50 text-sm mb-1 break-all">
                          {session.student_email}
                        </div>

                        <div className="text-white/40 text-sm">
                          {
                            new Date(
                              session.scheduled_for
                            ).toLocaleString()
                          }
                        </div>

                      </div>

                      <div className="flex flex-wrap gap-3 items-center">

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