"use client";

import { useState }
from "react";

import BuilderShell
from "@/components/layout/BuilderShell";

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


export default function NortnSpoilPage() {

  const [input, setInput] =
    useState("");

  const [reflection, setReflection] =
    useState("");

const [loading, setLoading] =
  useState(false);

const {
  missions,
} = useMissionStore();

const {
  builderProfile,
  builderLevel,
  streak,
  completedCount,
} = useProfileStore();

  async function handleReflect() {

  if (!input.trim()) {

    alert(
      "Share what is happening in your journey first."
    );

    return;
  }

setLoading(true);

  try {

    const response =
      await fetch(
        "/api/nortnspoil",
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

    setReflection(data);

  } catch (error) {

    console.error(error);

    alert(
      "Failed to generate reflection."
    );

} finally {

  setLoading(false);
}

}

    
  return (

    <BuilderShell
      title="NortnSpoil"
      subtitle="Reflection Intelligence"
    >

      <div className="flex flex-col">

        {/* TITLE */}

        <h1 className="text-5xl font-bold leading-tight tracking-tight text-white">

          Reflect.
          Recover.
          Continue building.

        </h1>

        <p className="mt-5 text-lg leading-relaxed text-slate-400">

          Share your struggles,
          thoughts, confusion,
          wins, or emotions.

          NortnSpoil helps you
          regain direction.

        </p>

        {/* INPUT */}

        <div className="mt-10">

          <FloatingInput
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            placeholder="I feel discouraged because I am not making progress..."
          />

        </div>

        {/* BUTTON */}

        <div className="mt-6">

          <GlowButton
  onClick={handleReflect}

  disabled={loading}
>

            {loading
  ? "Analyzing Your Reflection..."
  : "Reflect With NortnSpoil"}

          </GlowButton>

        </div>

        {/* RESPONSE */}

{loading && (

  <BuilderCard>

    <div className="flex flex-col items-center justify-center py-10">

      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />

      <h3 className="mt-6 text-2xl font-semibold text-white">

        NortnSpoil Is Reflecting...

      </h3>

      <p className="mt-3 max-w-md text-center text-slate-400 leading-relaxed">

        NortnSpoil is analyzing your
        emotional state,
        momentum,
        builder identity,
        and mission history
        to help you regain clarity.

      </p>

    </div>

  </BuilderCard>

)}

        {reflection && (

  <div className="mt-10 space-y-5">

    <BuilderCard>

      <h3 className="text-xl font-semibold text-white">

        What Is Likely Happening

      </h3>

      <p className="mt-4 text-slate-300 leading-relaxed">

        {reflection.what_is_happening}

      </p>

    </BuilderCard>

    <BuilderCard>

      <h3 className="text-xl font-semibold text-white">

        What Not To Do

      </h3>

      <p className="mt-4 text-slate-300 leading-relaxed">

        {reflection.what_not_to_do}

      </p>

    </BuilderCard>

    <BuilderCard>

      <h3 className="text-xl font-semibold text-white">

        Stabilization Step

      </h3>

      <p className="mt-4 text-slate-300 leading-relaxed">

        {reflection.stabilization_step}

      </p>

    </BuilderCard>

    <BuilderCard>

      <h3 className="text-xl font-semibold text-white">

        Tiny Next Action

      </h3>

      <p className="mt-4 text-slate-300 leading-relaxed">

        {reflection.tiny_next_action}

      </p>

    </BuilderCard>

    <BuilderCard>

      <h3 className="text-xl font-semibold text-white">

        Recovery Strategy

      </h3>

      <p className="mt-4 text-slate-300 leading-relaxed">

        {reflection.recovery_strategy}

      </p>

    </BuilderCard>

    {/* HUMAN GUIDE */}

    <BuilderCard>

      <h3 className="text-2xl font-semibold text-white">

        Need Human Support?

      </h3>

      <p className="mt-4 text-slate-400 leading-relaxed">

        {reflection.human_support_message}

      </p>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row">

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

  </div>

)}

      </div>

    </BuilderShell>
  );
}