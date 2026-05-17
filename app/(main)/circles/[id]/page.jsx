"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import BuilderShell
from "@/components/layout/BuilderShell";

import BuilderCard
from "@/components/ui/BuilderCard";

import GlowButton
from "@/components/ui/GlowButton";

import FloatingInput
from "@/components/ui/FloatingInput";

import { supabase }
from "@/lib/supabase";

import {
  logEvent
} from "@/lib/logEvent";

export default function CircleDetailPage() {

  const params =
    useParams();

  const [circle, setCircle] =
    useState(null);

  const [checkins, setCheckins] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [
    todayProgress,
    setTodayProgress,
  ] = useState("");

  const [
    tomorrowGoal,
    setTomorrowGoal,
  ] = useState("");

  async function loadCircle() {

    const {
      data: circleData,
    } =
      await supabase
        .from(
          "accountability_circles"
        )
        .select(`
          *,
          accountability_circle_members(count)
        `)
        .eq(
          "id",
          params.id
        )
        .single();

    setCircle(circleData);

    const {
      data: checkinData,
    } =
      await supabase
        .from(
          "accountability_circle_checkins"
        )
        .select("*")
        .eq(
          "circle_id",
          params.id
        )
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    setCheckins(
      checkinData || []
    );

    setLoading(false);
  }

  useEffect(() => {

    if (params?.id) {

      loadCircle();
    }

  }, [params]);

  async function submitCheckin() {

    if (
      !todayProgress ||
      !tomorrowGoal
    ) {

      alert(
        "Complete both check-in fields."
      );

      return;
    }

    setSubmitting(true);

    try {

      const {
        data: authData,
      } =
        await supabase.auth.getUser();

      const user =
        authData?.user;

      if (!user) return;

      const {
        error,
      } =
        await supabase
          .from(
            "accountability_circle_checkins"
          )
          .insert({

            circle_id:
              params.id,

            user_id:
              user.id,

            today_progress:
              todayProgress,

            tomorrow_goal:
              tomorrowGoal,
          });

      if (error) {

  console.error(error);

  alert(
    "Failed to submit check-in."
  );

} else {

  await logEvent({

    userId:
      user.id,

    type:
      "daily_checkin",

    title:
      "Submitted daily check-in",

    metadata: {

      circleId:
        params.id,
    },
  });

  setTodayProgress("");
  setTomorrowGoal("");

  loadCircle();

  alert(
    "Check-in submitted."
  );
}

    } catch (error) {

      console.error(error);

    } finally {

      setSubmitting(false);
    }
  }

  if (loading) {

    return (

      <BuilderShell
        title="Circle"
        subtitle="Loading..."
      >

        <BuilderCard>

          <p className="text-slate-400">

            Loading accountability circle...

          </p>

        </BuilderCard>

      </BuilderShell>
    );
  }

  if (!circle) {

    return (

      <BuilderShell
        title="Circle"
        subtitle="Not Found"
      >

        <BuilderCard>

          <p className="text-slate-400">

            Circle not found.

          </p>

        </BuilderCard>

      </BuilderShell>
    );
  }

  return (

    <BuilderShell
      title={circle.name}
      subtitle="Shared Momentum"
    >

      <div className="flex flex-col gap-5">

        {/* HERO */}

        <BuilderCard>

          <div className="mb-4 w-fit rounded-full border border-purple-400/20 bg-purple-500/10 px-3 py-1 text-xs text-purple-300">

            ACCOUNTABILITY CIRCLE

          </div>

          <h1 className="text-4xl font-bold text-white">

            {circle.name}

          </h1>

          <p className="mt-4 max-w-2xl text-slate-400 leading-relaxed">

            {circle.focus}

          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

              <p className="text-sm text-slate-400">

                Weekly Goal

              </p>

              <h3 className="mt-2 text-lg font-semibold text-white">

                {
                  circle.weekly_goal ||
                  "Stay consistent."
                }

              </h3>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

              <p className="text-sm text-slate-400">

                Members

              </p>

              <h3 className="mt-2 text-3xl font-bold text-white">

                {
                  circle
                    .accountability_circle_members?.[0]
                    ?.count || 0
                }

              </h3>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

              <p className="text-sm text-slate-400">

                Check-Ins

              </p>

              <h3 className="mt-2 text-3xl font-bold text-white">

                {checkins.length}

              </h3>

            </div>

          </div>

          {circle.whatsapp_link && (

            <a
              href={
                circle.whatsapp_link
              }
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-8
                block
                rounded-2xl
                bg-green-500
                px-6
                py-4
                text-center
                font-semibold
                text-white
                transition-all
                hover:scale-[1.01]
              "
            >

              Open Circle WhatsApp Group

            </a>

          )}

        </BuilderCard>

        {/* CHECK-IN */}

        <BuilderCard>

          <h2 className="text-2xl font-semibold text-white">

            Daily Builder Check-In

          </h2>

          <p className="mt-3 text-slate-400">

            Share your progress and next action with the circle.

          </p>

          <div className="mt-6 flex flex-col gap-5">

            <FloatingInput
              value={todayProgress}
              onChange={(e) =>
                setTodayProgress(
                  e.target.value
                )
              }
              placeholder="What did you complete today?"
            />

            <FloatingInput
              value={tomorrowGoal}
              onChange={(e) =>
                setTomorrowGoal(
                  e.target.value
                )
              }
              placeholder="What will you execute tomorrow?"
            />

            <GlowButton
              onClick={
                submitCheckin
              }

              disabled={submitting}
            >

              {
                submitting
                  ? "Submitting Check-In..."
                  : "Submit Check-In"
              }

            </GlowButton>

          </div>

        </BuilderCard>

        {/* CHECK-INS */}

        <div className="space-y-4">

          {checkins.map(
            (checkin) => (

              <BuilderCard
                key={checkin.id}
              >

                <div className="mb-3 w-fit rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">

                  BUILDER CHECK-IN

                </div>

                <div className="space-y-5">

                  <div>

                    <p className="text-xs uppercase tracking-wide text-slate-500">

                      Today’s Progress

                    </p>

                    <p className="mt-2 text-slate-300 leading-relaxed">

                      {
                        checkin.today_progress
                      }

                    </p>

                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-wide text-slate-500">

                      Tomorrow’s Goal

                    </p>

                    <p className="mt-2 text-slate-300 leading-relaxed">

                      {
                        checkin.tomorrow_goal
                      }

                    </p>

                  </div>

                </div>

              </BuilderCard>

            )
          )}

        </div>

      </div>

    </BuilderShell>
  );
}