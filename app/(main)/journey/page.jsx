"use client";

import { useEffect }
from "react";

import { useRouter }
from "next/navigation";

import BuilderShell
from "@/components/layout/BuilderShell";

import BuilderCard
from "@/components/ui/BuilderCard";

import GlowButton
from "@/components/ui/GlowButton";

import ProtectedRoute
from "@/components/auth/ProtectedRoute";

import { supabase }
from "@/lib/supabase";

import useMissionStore
from "@/stores/missionStore";

import useProfileStore
from "@/stores/profileStore";

import {
  logEvent
} from "@/lib/logEvent";

export default function JourneyPage() {

  const router =
    useRouter();

  const {
    missions,
    completeMission,
  } =
    useMissionStore();

  const {
    builderLevel,
    streak,
    momentumState,
    dailyCheckIn,
    lastCheckIn,

    completeMission:
      evolveBuilder,
  } =
    useProfileStore();

  useEffect(() => {

    const today =
      new Date()
        .toDateString();

    if (
      lastCheckIn !==
      today
    ) {

      dailyCheckIn();
    }

  }, []);

  return (

    <ProtectedRoute>

      <BuilderShell
        title="Your Journey"
        subtitle="Builder Operating System"
      >

        <div className="flex flex-col pb-32">

          {/* TITLE */}

          <h1 className="text-5xl font-bold leading-tight tracking-tight text-white">

            Build momentum
            every day.

          </h1>

          <p className="mt-5 text-lg leading-relaxed text-slate-400">

            Your missions,
            growth,
            skills,
            and opportunities
            live here.

          </p>

          {/* ACTION */}

          <div className="mt-8">

            <GlowButton
              onClick={() =>
                router.push(
                  "/magicpen"
                )
              }
            >

              Open MagicPen

            </GlowButton>

          </div>

<div className="mt-4">

  <GlowButton
    onClick={() =>
      router.push(
        "/nortnspoil"
      )
    }
  >

    Open NortnSpoil

  </GlowButton>

</div>


<div className="mt-4">

  <a
    href="/vault"
    className="
      inline-flex
      rounded-2xl
      border
      border-white/10
      bg-white/5
      px-5
      py-3
      text-sm
      font-semibold
      text-slate-300
      transition-all
      hover:bg-white/10
    "
  >

    Open Mission Vault

  </a>

</div>


          {/* MOMENTUM */}

          <div className="mt-10">

            <BuilderCard>

              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                <div>

                  <div className="mb-3 w-fit rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">

                    TODAY'S BUILDER STATUS

                  </div>

                  <h2 className="text-3xl font-bold text-white">

                    {momentumState}

                  </h2>

                  <p className="mt-3 max-w-xl text-slate-400 leading-relaxed">

                    Your builder momentum evolves based on consistency,
                    completed missions,
                    and daily engagement.

                  </p>

                </div>

                <div className="grid grid-cols-2 gap-4">

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                    <p className="text-sm text-slate-400">

                      Builder Level

                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-white">

                      {builderLevel}

                    </h3>

                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                    <p className="text-sm text-slate-400">

                      Streak

                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-white">

                      {streak}

                    </h3>

                  </div>

                </div>

              </div>

            </BuilderCard>

          </div>

          {/* MISSIONS */}

          <div className="mt-10 space-y-5">

            {missions.length === 0 ? (

              <BuilderCard>

                <h2 className="text-2xl font-semibold text-white">

                  No missions yet

                </h2>

                <p className="mt-4 text-slate-400">

                  Open MagicPen and generate
                  your first mission.

                </p>

              </BuilderCard>

            ) : (

              missions

  .filter(
    (mission) =>

      mission.status !==
      "completed"
  )

  .map(
                (mission) => (

                  <BuilderCard
                    key={mission.id}
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <div
                          className={`
                            mb-3
                            w-fit
                            rounded-full
                            px-3
                            py-1
                            text-xs

                            ${
                              mission.status ===
                              "completed"
                                ? `
                                  border border-green-400/20
                                  bg-green-500/10
                                  text-green-300
                                `
                                : `
                                  border border-blue-400/20
                                  bg-blue-500/10
                                  text-blue-300
                                `
                            }
                          `}
                        >

                          {
                            mission.status ===
                            "completed"
                              ? "COMPLETED"
                              : "ACTIVE MISSION"
                          }

                        </div>

                        <h2 className="text-2xl font-semibold text-white">

                          {mission.title}

                        </h2>

                        <p className="mt-4 text-slate-400">

                          {mission.description}

                        </p>

                      </div>

                    </div>

                    {/* STEPS */}

                    <div className="mt-6 space-y-3">

                      {mission.steps?.map(
                        (
                          step,
                          index
                        ) => (

                          <div
                            key={index}
                            className="flex gap-4"
                          >

                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-sm text-slate-300">

                              {index + 1}

                            </div>

                            <p className="text-slate-300">

                              {step}

                            </p>

                          </div>

                        )
                      )}

                    </div>

                    {/* COMPLETE */}

                    {
                      mission.status !==
                        "completed" && (

                        <div className="mt-8">

                          <GlowButton
                            onClick={async () => {

                              completeMission(
                                mission.id
                              );

                              evolveBuilder();

                              const {
                                error,
                              } =
                                await supabase
                                  .from(
                                    "user_missions"
                                  )
                                  .update({

                                    status:
                                      "completed",

                                    completed_at:
                                      new Date(),
                                  })

                                  .eq(
                                    "id",
                                    mission.id
                                  );

const {
  data: authData,
} =
  await supabase.auth.getUser();

const user =
  authData?.user;

if (user) {

  await logEvent({

    userId:
      user.id,

    type:
      "mission_completed",

    title:
      `Completed ${mission.title}`,

    metadata: {

      missionId:
        mission.id,
    },
  });
}

                              if (error) {

                                console.error(
                                  error
                                );
                              }
                            }}
                          >

                            Mark Mission Complete

                          </GlowButton>

                        </div>
                      )
                    }

                  </BuilderCard>

                )
              )

            )}

          </div>

        </div>

      </BuilderShell>

    </ProtectedRoute>
  );
}