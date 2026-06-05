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

  builderXP,

  evolutionStage,

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

        <div className="flex items-start justify-between">

          <div className="mb-4 w-fit rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">

            BUILDER IDENTITY

          </div>

          <div>

  <h1 className="text-5xl font-bold leading-tight tracking-tight text-white">

    {
      builderProfile?.displayName
      || "Anonymous Builder"
    }

  </h1>

  <p className="mt-3 text-lg text-blue-300">

    {
      builderProfile?.identity
      || "Builder"
    }

  </p>

</div>

          <p className="mt-5 text-lg leading-relaxed text-slate-400">

            Your builder profile evolves
            as you complete missions,
            gain skills, and create value.

          </p>

<div>

  <button

    onClick={() =>
      window.location.href =
      "/settings"
    }

    className="
      rounded-2xl
      border
      border-white/10
      bg-white/5
      px-5
      py-3
      text-sm
      text-slate-300
      transition-all
      hover:bg-white/10
    "

  >

    ⚙ Edit Profile

  </button>

</div>

        </div>



{/* EVOLUTION */}

<BuilderCard className="mt-10">

  <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

    <div>

      <div className="mb-3 inline-flex rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300">

        EVOLUTION STAGE

      </div>

      <h2 className="text-4xl font-bold text-white">

        {evolutionStage}

      </h2>

      <p className="mt-4 text-slate-400">

        Your identity is evolving through action and consistency.

      </p>

    </div>

    <div className="w-full max-w-md">

      <div className="flex justify-between text-sm">

        <span className="text-slate-400">

          Builder XP

        </span>

        <span className="text-slate-300">

          {builderXP} XP

        </span>

      </div>

      <div className="mt-3 h-4 overflow-hidden rounded-full bg-white/5">

        <div

          className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-blue-400 to-violet-500"

          style={{

            width:
            `${Math.min(builderXP % 100,100)}%`

          }}

        />

      </div>

    </div>

  </div>

</BuilderCard>


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

{/* BUILDER MISSION */}

<BuilderCard className="mt-5">

  <h2 className="text-2xl font-semibold text-white">

    Builder Mission

  </h2>

  <p className="mt-5 text-slate-400 leading-relaxed">

    {
      builderProfile?.mission ||
      "Mission not defined yet."
    }

  </p>

</BuilderCard>

{/* BUILDER STORY */}

<BuilderCard className="mt-5">

  <h2 className="text-2xl font-semibold text-white">

    Why I Build

  </h2>

  <p className="mt-5 text-slate-400 leading-relaxed">

  {
    builderProfile?.whyBuild ||
    "Add your reason for building."
  }

</p>

</BuilderCard>


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

{/* CAN HELP WITH */}

<BuilderCard className="mt-5">

  <h2 className="text-2xl font-semibold text-white">

    Can Help With

  </h2>

  <div className="mt-5 flex flex-wrap gap-3">

    {
      builderProfile?.canHelpWith?.map(
        (item) => (

          <div
            key={item}
            className="
              rounded-full
              border
              border-green-400/20
              bg-green-500/10
              px-4
              py-2
              text-sm
              text-green-200
            "
          >

            {item}

          </div>

        )
      )
    }

  </div>

</BuilderCard>


{/* NEED HELP WITH */}

<BuilderCard className="mt-5">

  <h2 className="text-2xl font-semibold text-white">

    Need Help With

  </h2>

  <div className="mt-5 flex flex-wrap gap-3">

    {
      builderProfile?.needHelpWith?.map(
        (item) => (

          <div
            key={item}
            className="
              rounded-full
              border
              border-yellow-400/20
              bg-yellow-500/10
              px-4
              py-2
              text-sm
              text-yellow-200
            "
          >

            {item}

          </div>

        )
      )
    }

  </div>

</BuilderCard>


{/* CURRENT CAMPAIGN */}

<BuilderCard className="mt-5">

  <h2 className="text-2xl font-semibold text-white">

    Current Quest

  </h2>

  <p className="mt-4 text-slate-400">

    {

      missions.find(
        (mission)=>
        !mission.completed
      )?.title

      ||

      "No active campaign."

    }

  </p>

</BuilderCard>


        {/* DIRECTION */}

        <BuilderCard className="mt-5">

          <h2 className="text-2xl font-semibold text-white">

            Builder Vision

          </h2>

          <p className="mt-4 text-slate-400">

            {
              builderProfile?.vision
              || "Your direction will evolve as you continue building."
            }

          </p>

        </BuilderCard>

      </div>

    </BuilderShell>
  );
}