"use client";

import { useRouter }
from "next/navigation";

import BuilderCard from "@/components/ui/BuilderCard";

import GlowButton from "@/components/ui/GlowButton";

import useProfileStore from "@/stores/profileStore";

import BuilderShell from "@/components/layout/BuilderShell";


export default function IdentityPage() {


const { completeOnboarding } =
  useProfileStore();

const router =
  useRouter();

const {
  builderProfile,
} = useProfileStore();

const profile =
  builderProfile;

  

if (!profile) {

  return null;
}

  return (

    <BuilderShell
  title="PipuPath"
  subtitle="Builder Identity"
>

      <div className="flex flex-col pb-32">

        {/* LABEL */}

        <div className="mb-6 w-fit rounded-full border border-blue-400/20 bg-blue-500/10 px-5 py-2 text-sm text-blue-300">
          Builder Identity
        </div>

        {/* TITLE */}

        <h1 className="text-5xl font-bold leading-tight tracking-tight text-white">

  Your responses suggest strong alignment with

  <span className="mt-3 block bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">

    {profile.identity}

  </span>

</h1>

        {/* DESCRIPTION */}

        <p className="mt-6 text-lg leading-relaxed text-slate-400">

  {profile.summary}

</p>

<BuilderCard className="mt-10">

  <div className="mb-4 w-fit rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs text-violet-300">

    EXECUTION INSIGHT

  </div>

  <p className="text-lg leading-relaxed text-slate-300">

    {profile.executionStyle}

  </p>

</BuilderCard>


        {/* STRENGTHS */}

        <BuilderCard className="mt-10">

          <h3 className="text-lg font-semibold text-white">

            Your Natural Strengths

          </h3>

          <div className="mt-5 flex flex-wrap gap-3">

            {profile.strengths.map((item) => (

              <div
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"
              >
                {item}
              </div>

            ))}

          </div>

        </BuilderCard>

       

        {/* FIRST MISSION */}

        <BuilderCard className="mt-5">

  <h3 className="text-lg font-semibold text-white">

    Patterns That May Slow You Down

  </h3>

  <div className="mt-5 flex flex-wrap gap-3">

    {profile.risks?.map((item) => (

      <div
        key={item}
        className="rounded-full border border-red-400/10 bg-red-500/10 px-4 py-2 text-sm text-red-200"
      >

        {item}

      </div>

    ))}

  </div>

</BuilderCard>


        {/* EARNING PATH */}

       <BuilderCard className="mt-5">

  <h3 className="text-lg font-semibold text-white">

    Possible Builder Paths

  </h3>

  <div className="mt-5 flex flex-wrap gap-3">

    {profile.builderPaths?.map((item) => (

      <div
        key={item}
        className="rounded-full border border-blue-400/10 bg-blue-500/10 px-4 py-2 text-sm text-blue-200"
      >

        {item}

      </div>

    ))}

  </div>

</BuilderCard>

        {/* CTA */}
<BuilderCard className="mt-5">

  <h3 className="text-lg font-semibold text-white">

    Most Important Next Step

  </h3>

  <p className="mt-4 text-slate-400 leading-relaxed">

    {profile.nextFocus}

  </p>

</BuilderCard>


        <div className="mt-8">

         <GlowButton
  onClick={() => {

    completeOnboarding(
      profile
    );

    router.push(
      "/journey"
    );
  }}
>

  Start Building

</GlowButton>

        </div>

<div className="mt-4">

  <button
    onClick={() =>
      router.push(
        "/questions/1"
      )
    }
    className="
      rounded-2xl
      border
      border-white/10
      bg-white/5
      px-6
      py-3
      text-sm
      font-semibold
      text-slate-300
      transition-all
      hover:bg-white/10
    "
  >

    Retake Builder Analysis

  </button>

</div>
      </div>

    </BuilderShell>
  );
}