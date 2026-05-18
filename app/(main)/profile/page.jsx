"use client";

import BuilderShell
from "@/components/layout/BuilderShell";

import BuilderCard
from "@/components/ui/BuilderCard";

import useProfileStore
from "@/stores/profileStore";

import useMissionStore
from "@/stores/missionStore";

export default function ProfilePage() {

  const {

  builderProfile,

  builderLevel,

  streak,

  momentumState,

} = useProfileStore();

  const {
    missions,
  } = useMissionStore();

  const completedMissions =
    missions.filter(
      (mission) =>
        mission.completed
    );

  return (

    <BuilderShell
      title="Builder Profile"
      subtitle="Identity Evolution"
    >

      <div className="flex flex-col pb-32">

        {/* HERO */}

        <div className="flex flex-col items-start">

          <div className="mb-4 w-fit rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">

            BUILDER IDENTITY

          </div>

          <h1 className="text-5xl font-bold leading-tight tracking-tight text-white">

            {
              builderProfile?.identity
              || "Builder"
            }

          </h1>

          <p className="mt-5 text-lg leading-relaxed text-slate-400">

            Your builder profile evolves
            as you complete missions,
            gain skills, and create value.

          </p>

        </div>

{/* BUILDER STATUS */}

<div className="mt-10 grid grid-cols-2 gap-4">

  <BuilderCard>

    <p className="text-sm text-slate-400">

      Momentum State

    </p>

    <h2 className="mt-2 text-2xl font-bold text-white">

      {momentumState}

    </h2>

  </BuilderCard>

  <BuilderCard>

    <p className="text-sm text-slate-400">

      Builder Streak

    </p>

    <h2 className="mt-2 text-2xl font-bold text-white">

      {streak} days

    </h2>

  </BuilderCard>

</div>


        {/* STATS */}

        <div className="mt-5 grid grid-cols-3 gap-4">

          <BuilderCard>

            <div className="text-3xl font-bold text-white">

              {missions.length}

            </div>

            <p className="mt-2 text-sm text-slate-400">

              Missions Created

            </p>

          </BuilderCard>

          <BuilderCard>

            <div className="text-3xl font-bold text-white">

              {
                completedMissions.length
              }

            </div>

            <p className="mt-2 text-sm text-slate-400">

              Missions Completed

            </p>

          </BuilderCard>

<BuilderCard>

  <div className="text-3xl font-bold text-white">

    {builderLevel}

  </div>

  <p className="mt-2 text-sm text-slate-400">

    Builder Level

  </p>

</BuilderCard>

        </div>

        {/* STRENGTHS */}

        <BuilderCard className="mt-5">

          <h2 className="text-2xl font-semibold text-white">

            Natural Strengths

          </h2>

          <div className="mt-5 flex flex-wrap gap-3">

            {
              builderProfile?.strengths?.map(
                (strength) => (

                  <div
                    key={strength}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"
                  >

                    {strength}

                  </div>

                )
              )
            }

          </div>

        </BuilderCard>

        {/* SKILLS */}

        <BuilderCard className="mt-5">

          <h2 className="text-2xl font-semibold text-white">

            Growth Skills

          </h2>

          <div className="mt-5 flex flex-wrap gap-3">

            {
              builderProfile?.skills?.map(
                (skill) => (

                  <div
                    key={skill}
                    className="rounded-full border border-blue-400/10 bg-blue-500/10 px-4 py-2 text-sm text-blue-200"
                  >

                    {skill}

                  </div>

                )
              )
            }

          </div>

        </BuilderCard>

        {/* DIRECTION */}

        <BuilderCard className="mt-5">

          <h2 className="text-2xl font-semibold text-white">

            Current Direction

          </h2>

          <p className="mt-4 text-slate-400">

            {
              builderProfile?.earningPath
              || "Your direction will evolve as you continue building."
            }

          </p>

        </BuilderCard>

      </div>

    </BuilderShell>
  );
}