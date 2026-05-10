"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

export default function BookingModal({ guideId }) {

  const [open, setOpen] = useState(false);

  const [availability, setAvailability] = useState([]);

  const [selectedSlot, setSelectedSlot] = useState(null);

  const [studentName, setStudentName] = useState("");

  const [studentEmail, setStudentEmail] = useState("");

  const [notes, setNotes] = useState("");

  const [loadingSlots, setLoadingSlots] = useState(false);

  const [booking, setBooking] = useState(false);

  useEffect(() => {

    async function loadAvailability() {

      if (!guideId || !open) {
        return;
      }

      setLoadingSlots(true);

      const { data } =
        await supabase
          .from("guide_availability")
          .select("*")
          .eq("guide_id", guideId)
          .eq("is_active", true);

      setAvailability(data || []);

      setLoadingSlots(false);

    }

    loadAvailability();

  }, [guideId, open]);

  async function createBooking() {

    if (
      !selectedSlot ||
      !studentName ||
      !studentEmail
    ) {

      alert("Please complete all required fields");

      return;

    }

    setBooking(true);

    const roomName =
      `pipupath-${Date.now()}`;

    const now = new Date();

    const selectedDate = new Date();

    selectedDate.setDate(
      now.getDate() +
      (
        (
          selectedSlot.day_of_week -
          now.getDay() +
          7
        ) % 7
      )
    );

    const [hours, minutes] =
      selectedSlot.start_time.split(":");

    selectedDate.setHours(hours);

    selectedDate.setMinutes(minutes);

    selectedDate.setSeconds(0);

    const {
      data: authData
    } = await supabase.auth.getUser();

    const { error } =
      await supabase
        .from("sessions")
        .insert({

          guide_id: guideId,

          user_id:
            authData?.user?.id || null,

          student_name: studentName,

          student_email: studentEmail,

          notes,

          status: "scheduled",

          scheduled_for:
            selectedDate.toISOString(),

          room_name: roomName

        });

    setBooking(false);

    if (error) {

      alert(error.message);

      return;

    }

    alert("Session booked successfully!");

    setOpen(false);

    setStudentName("");

    setStudentEmail("");

    setNotes("");

    setSelectedSlot(null);

  }

  return (

    <>

      {/* OPEN BUTTON */}

      <button
        onClick={() => setOpen(true)}

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
        Book Session
      </button>

      {/* MODAL */}

      {
        open && (

          <div
            className="
              fixed
              inset-0
              z-50
              bg-black/80
              backdrop-blur-sm
              overflow-y-auto
              p-4
            "
          >

            <div
              className="
                max-w-2xl
                mx-auto
                bg-zinc-900
                border
                border-white/10
                rounded-3xl
                p-6
                md:p-8
                mt-10
                mb-10
              "
            >

              {/* HEADER */}

              <div className="flex items-start justify-between gap-6 mb-8">

                <div>

                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">

                    Book Session

                  </h2>

                  <p className="text-white/60 leading-relaxed">

                    Select an available slot and reserve your mentorship session.

                  </p>

                </div>

                <button
                  onClick={() => setOpen(false)}

                  className="
                    text-white/50
                    hover:text-white
                    text-3xl
                    leading-none
                  "
                >
                  ×
                </button>

              </div>

              {/* AVAILABILITY */}

              <div className="mb-8">

                <div className="text-lg font-semibold text-white mb-4">

                  Available Slots

                </div>

                {
                  loadingSlots ? (

                    <div className="text-white/50">
                      Loading slots...
                    </div>

                  ) : availability.length === 0 ? (

                    <div
                      className="
                        bg-black/30
                        border
                        border-white/10
                        rounded-2xl
                        p-5
                        text-white/50
                      "
                    >
                      No availability published yet.
                    </div>

                  ) : (

                    <div className="grid grid-cols-1 gap-4">

                      {
                        availability.map((slot) => (

                          <button
                            key={slot.id}

                            onClick={() =>
                              setSelectedSlot(slot)
                            }

                            className={`
                              p-5
                              rounded-2xl
                              border
                              transition
                              text-left

                              ${
                                selectedSlot?.id === slot.id

                                  ? "bg-yellow-500 text-black border-yellow-500"

                                  : "bg-black/30 border-white/10 text-white hover:border-yellow-500/40"
                              }
                            `}
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

                            <div className="opacity-80">

                              {slot.start_time} — {slot.end_time}

                            </div>

                          </button>

                        ))
                      }

                    </div>

                  )
                }

              </div>

              {/* FORM */}

              <div className="space-y-5">

                <div>

                  <label className="block text-white/60 mb-3">

                    Full Name

                  </label>

                  <input
                    type="text"

                    value={studentName}

                    onChange={(e) =>
                      setStudentName(e.target.value)
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

                    placeholder="Your full name"
                  />

                </div>

                <div>

                  <label className="block text-white/60 mb-3">

                    Email Address

                  </label>

                  <input
                    type="email"

                    value={studentEmail}

                    onChange={(e) =>
                      setStudentEmail(e.target.value)
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

                    placeholder="your@email.com"
                  />

                </div>

                <div>

                  <label className="block text-white/60 mb-3">

                    Session Notes

                  </label>

                  <textarea
                    rows={5}

                    value={notes}

                    onChange={(e) =>
                      setNotes(e.target.value)
                    }

                    className="
                      w-full
                      bg-black
                      border
                      border-white/10
                      rounded-2xl
                      p-4
                      text-white
                      resize-none
                    "

                    placeholder="What would you like guidance on?"
                  />

                </div>

              </div>

              {/* ACTIONS */}

              <div className="mt-10 flex flex-col md:flex-row gap-4">

                <button
                  onClick={createBooking}

                  disabled={booking}

                  className="
                    flex-1
                    bg-yellow-500
                    hover:bg-yellow-400
                    text-black
                    font-bold
                    px-6
                    py-5
                    rounded-2xl
                    transition
                  "
                >

                  {
                    booking
                      ? "Booking..."
                      : "Confirm Booking"
                  }

                </button>

                <button
                  onClick={() =>
                    setOpen(false)
                  }

                  className="
                    flex-1
                    bg-white/5
                    hover:bg-white/10
                    border
                    border-white/10
                    text-white
                    font-semibold
                    px-6
                    py-5
                    rounded-2xl
                    transition
                  "
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>

        )
      }

    </>

  );

}