"use client";

import { useState }
from "react";

import BuilderShell
from "@/components/layout/BuilderShell";

import { supabase }
from "@/lib/supabase";

import BuilderCard
from "@/components/ui/BuilderCard";

import GlowButton
from "@/components/ui/GlowButton";

import FloatingInput
from "@/components/ui/FloatingInput";

import useMissionStore
from "@/stores/missionStore";

import useProfileStore
from "@/stores/profileStore";

export default function MagicPenPage() {

  const [input, setInput] =
    useState("");

  const [mission, setMission] =
    useState(null);

const [loading, setLoading] =
  useState(false);

  const {
  addMission,
  missions,
} = useMissionStore();

const {
  builderProfile,
  builderLevel,
  streak,
  completedCount,
} = useProfileStore();

  async function handleGenerate() {

  if (!input?.trim()) {

    alert(
      "Tell MagicPen about your goals or interests first."
    );

    return;
  }

setLoading(true);

  try {

    const response =
      await fetch(
        "/api/generate-mission",
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

  input,

  profile:
    builderProfile,

  level:
    builderLevel,

  streak,

  completedCount,

  missionHistory:
    missions.slice(0, 5),
}),
        }
      );

    const data =
      await response.json();

    setMission(data);

  } catch (error) {

    console.error(error);

    alert(
      "Failed to generate mission."
    );

} finally {

  setLoading(false);
}

}

  
  return (

    <BuilderShell
      title="MagicPen"
      subtitle="Mission Intelligence"
    >

      <div className="flex flex-col">

        {/* TITLE */}

        <h1 className="text-5xl font-bold leading-tight tracking-tight text-white">

          Turn ideas into
          momentum.

        </h1>

        <p className="mt-5 text-lg leading-relaxed text-slate-400">

          Describe your goals,
          interests, struggles,
          or ambitions.

          MagicPen will transform them
          into actionable missions.

        </p>

        {/* INPUT */}

        <div className="mt-10">

          <FloatingInput
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            placeholder="I want to start making money with video editing..."
          />

        </div>

        {/* BUTTON */}

        <div className="mt-6">

          <GlowButton
  onClick={handleGenerate}

  disabled={loading}
>

            {loading
  ? "Generating Your Builder Mission..."
  : "Generate Mission"}

          </GlowButton>

        </div>

        {/* RESULTS */}

{loading && (

  <BuilderCard>

    <div className="flex flex-col items-center justify-center py-10">

      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />

      <h3 className="mt-6 text-2xl font-semibold text-white">

        Building Your Mission...

      </h3>

      <p className="mt-3 max-w-md text-center text-slate-400 leading-relaxed">

        MagicPen is analyzing your goals,
        builder identity,
        momentum,
        and mission history
        to create a detailed execution plan.

      </p>

    </div>

  </BuilderCard>

)}

        {mission && (

          <div className="mt-10 space-y-5">

            {/* TITLE */}

            <BuilderCard>

              <div className="mb-3 w-fit rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">

                GENERATED MISSION

              </div>

              <h2 className="text-2xl font-semibold text-white">

                {mission.title}

              </h2>

              <p className="mt-4 text-slate-400">

                {mission.description}

              </p>

            </BuilderCard>

            {/* STEPS */}

            <BuilderCard>

              <h3 className="text-xl font-semibold text-white">

                Action Steps

              </h3>

              <div className="mt-5 space-y-4">

                {mission.execution_steps.map(
                  (step, index) => (

                    <div
                      key={index}
                      className="flex gap-4"
                    >

                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/20 text-sm text-blue-300">

                        {index + 1}

                      </div>

                      <p className="text-slate-300">

                        {step}

                      </p>

                    </div>

                  )
                )}

              </div>

            </BuilderCard>

            {/* INCOME */}

            <BuilderCard>

              <h3 className="text-xl font-semibold text-white">

                Possible Income Path

              </h3>

              <p className="mt-4 text-slate-400">

                {mission.first_money_path}

              </p>

            </BuilderCard>

{/* WHY THIS MATTERS */}

<BuilderCard>

  <h3 className="text-xl font-semibold text-white">

    Why This Matters

  </h3>

  <p className="mt-4 text-slate-400 leading-relaxed">

    {mission.why_this_matters}

  </p>

</BuilderCard>

{/* FIRST ACTION */}

<BuilderCard>

  <h3 className="text-xl font-semibold text-white">

    First Action

  </h3>

  <p className="mt-4 text-slate-300 leading-relaxed">

    {mission.first_action}

  </p>

</BuilderCard>

{/* TOOLS */}

<BuilderCard>

  <h3 className="text-xl font-semibold text-white">

    Tools Needed

  </h3>

  <div className="mt-5 flex flex-wrap gap-3">

    {mission.tools_needed?.map(
      (tool, index) => (

        <div
          key={index}
          className="rounded-full border border-blue-400/10 bg-blue-500/10 px-4 py-2 text-sm text-blue-200"
        >

          {tool}

        </div>

      )
    )}

  </div>

</BuilderCard>

{/* MESSAGE TEMPLATES */}

<BuilderCard>

  <h3 className="text-xl font-semibold text-white">

    Message Templates

  </h3>

  <div className="mt-5 space-y-4">

    {mission.message_templates?.map(
      (message, index) => (

        <div
          key={index}
          className="rounded-2xl border border-white/10 bg-white/5 p-4"
        >

          <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">

            {message}

          </p>

        </div>

      )
    )}

  </div>

</BuilderCard>

{/* COMMON MISTAKES */}

<BuilderCard>

  <h3 className="text-xl font-semibold text-white">

    Common Mistakes

  </h3>

  <div className="mt-5 space-y-3">

    {mission.common_mistakes?.map(
      (mistake, index) => (

        <div
          key={index}
          className="flex gap-4"
        >

          <div className="mt-1 h-2 w-2 rounded-full bg-red-400" />

          <p className="text-slate-300">

            {mistake}

          </p>

        </div>

      )
    )}

  </div>

</BuilderCard>

{/* TOMORROW */}

<BuilderCard>

  <h3 className="text-xl font-semibold text-white">

    What To Do Tomorrow

  </h3>

  <p className="mt-4 text-slate-300 leading-relaxed">

    {mission.tomorrow_action}

  </p>

</BuilderCard>


{/* PERSONAL GUIDE */}

<BuilderCard>

  <h3 className="text-2xl font-semibold text-white">

    Need Personal Guidance?

  </h3>

  <p className="mt-4 text-slate-400 leading-relaxed">

    If you feel stuck,
    confused,
    overwhelmed,
    or need accountability,
    request a personal guide.

  </p>

  <div className="mt-6 flex flex-col gap-4 sm:flex-row">

    {/* WHATSAPP */}

    <a
      href="https://wa.me/2348061190801"
      target="_blank"
      rel="noopener noreferrer"
      className="
        flex-1
        rounded-2xl
        bg-green-500
        px-6
        py-4
        text-center
        font-semibold
        text-white
        transition-all
        hover:scale-[1.02]
      "
    >

      Request Personal Guide

    </a>

    {/* EMAIL */}

    <a
      href="mailto:pipupath@gmail.com"
      className="
        flex-1
        rounded-2xl
        border
        border-white/10
        bg-white/5
        px-6
        py-4
        text-center
        font-semibold
        text-slate-300
        transition-all
        hover:bg-white/10
      "
    >

      Contact Through Email

    </a>

  </div>

</BuilderCard>


            {/* SAVE */}

            <div className="pt-2">

              <GlowButton
  onClick={async () => {

    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) return;

    const payload = {

      user_id:
        user.id,

      title:
        mission.title,

      description:
        mission.description,

      archetype:
        builderProfile?.identity ||
        "Builder",

      category:
        "generated",

      xp_reward:
        25,

      status:
        "active",

      steps:
  mission.execution_steps,

      income:
  mission.first_money_path,
    };

    const {
      data,
      error,
    } =
      await supabase
        .from("user_missions")
        .insert(payload)
        .select()
        .single();

    if (error) {

      console.error(error);

      alert(
        "Failed to save mission."
      );

      return;
    }

    addMission(data);

    alert(
      "Mission added to your journey."
    );
  }}
>

                Save Mission To Journey

              </GlowButton>

            </div>

          </div>

        )}

      </div>

    </BuilderShell>
  );
}