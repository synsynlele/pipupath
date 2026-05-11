"use client";

import { useState } from "react";

import { supabase } from "@/lib/supabase";

import NavBar from "@/components/NavBar";

import Link from "next/link";

import {
  QUESTIONS,
  ARCHETYPES,
  calculateArchetype
} from "@/lib/archetypes";

export default function DiscoverPage() {

  const [step, setStep] =
    useState(0);

  const [answers, setAnswers] =
    useState([]);

  const [result, setResult] =
    useState(null);

  const [saving, setSaving] =
    useState(false);

  const currentQuestion =
    QUESTIONS[step];

  async function saveProfile(
    archetypeKey,
    archetype
  ) {

    setSaving(true);

    const {
      data: userData
    } = await supabase.auth.getUser();

    const user =
      userData?.user;

    if (!user) {

      setSaving(false);

      return;

    }

    await supabase
      .from("user_profiles")
      .upsert({

        user_id:
          user.id,

        archetype:
          archetypeKey,

        archetype_data:
          archetype

      });

    setSaving(false);

  }

  async function choose(index) {

    const updated = [
      ...answers,
      index
    ];

    setAnswers(updated);

    if (
      step + 1 >=
      QUESTIONS.length
    ) {

      const archetypeKey =
        calculateArchetype(updated);

      const archetype =
        ARCHETYPES[archetypeKey];

      setResult({
        key: archetypeKey,
        ...archetype
      });

      await saveProfile(
        archetypeKey,
        archetype
      );

      return;

    }

    setStep(step + 1);

  }

  function restart() {

    setAnswers([]);

    setStep(0);

    setResult(null);

  }

  const progress =
    ((step + 1) /
      QUESTIONS.length) *
    100;

  return (

    <div className="min-h-screen bg-gradient-to-b from-[#050300] to-[#0c0903] text-[#F7E8C5]">

      <NavBar />

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-20">

        {/* QUIZ */}

        {
          !result && (

            <>

              {/* HERO */}

              <div className="mb-14 md:mb-20">

                <div className="text-[#D4A43B] uppercase tracking-[0.35em] text-xs mb-6">

                  Discovery Engine

                </div>

                <h1
                  className="
                    text-5xl
                    md:text-7xl
                    font-bold
                    leading-[1.03]
                    mb-6
                    max-w-4xl
                  "
                >

                  Discover Your
                  <br />
                  Growth Archetype

                </h1>

                <p
                  className="
                    text-[#F7E8C5]/70
                    text-lg
                    md:text-xl
                    leading-relaxed
                    max-w-3xl
                  "
                >

                  Your decisions reveal how you think, grow, lead and navigate transformation.

                </p>

              </div>

              {/* PROGRESS */}

              <div className="mb-10">

                <div className="flex items-center justify-between mb-4">

                  <div className="text-[#D4A43B] text-sm">

                    Question {step + 1} of {QUESTIONS.length}

                  </div>

                  <div className="text-[#F7E8C5]/50 text-sm">

                    {Math.round(progress)}%

                  </div>

                </div>

                <div
                  className="
                    h-3
                    rounded-full
                    bg-[#120d06]
                    overflow-hidden
                  "
                >

                  <div
                    className="
                      h-full
                      bg-[#D4A43B]
                      transition-all
                      duration-500
                    "

                    style={{
                      width:
                        `${progress}%`
                    }}
                  />

                </div>

              </div>

              {/* QUESTION */}

              <div
                className="
                  rounded-[36px]
                  border
                  border-[#2a2112]
                  bg-white/[0.03]
                  backdrop-blur-xl
                  p-6
                  md:p-10
                "
              >

                <h2
                  className="
                    text-3xl
                    md:text-5xl
                    font-bold
                    leading-relaxed
                    mb-10
                  "
                >

                  {currentQuestion.question}

                </h2>

                <div className="grid gap-5">

                  {
                    currentQuestion.options.map(
                      (
                        option,
                        index
                      ) => (

                        <button
                          key={index}

                          onClick={() =>
                            choose(index)
                          }

                          className="
                            text-left
                            rounded-3xl
                            border
                            border-[#2a2112]
                            bg-[#120d06]
                            hover:border-[#D4A43B]
                            hover:bg-[#1b1409]
                            transition
                            p-6
                            md:p-7
                          "
                        >

                          <div
                            className="
                              text-lg
                              md:text-xl
                              leading-relaxed
                            "
                          >

                            {option.text}

                          </div>

                        </button>

                      )
                    )
                  }

                </div>

              </div>

            </>

          )
        }

        {/* RESULT */}

        {
          result && (

            <div
              className="
                rounded-[40px]
                border
                border-[#2a2112]
                bg-white/[0.03]
                backdrop-blur-xl
                p-6
                md:p-12
              "

              style={{
                boxShadow:
                  `0 0 80px ${result.glow}`
              }}
            >

              {/* HEADER */}

              <div className="mb-12">

                <div className="text-[#D4A43B] uppercase tracking-[0.35em] text-xs mb-6">

                  Your Archetype

                </div>

                <div
                  className="
                    flex
                    flex-col
                    lg:flex-row
                    gap-8
                    lg:items-center
                  "
                >

                  {/* ICON */}

                  <div
                    className="
                      w-28
                      h-28
                      md:w-36
                      md:h-36
                      rounded-[32px]
                      flex
                      items-center
                      justify-center
                      text-6xl
                      md:text-7xl
                      flex-shrink-0
                    "

                    style={{
                      background:
                        result.glow,

                      border:
                        `1px solid ${result.color}`
                    }}
                  >

                    {result.emoji}

                  </div>

                  {/* TEXT */}

                  <div>

                    <h1
                      className="
                        text-5xl
                        md:text-7xl
                        font-bold
                        leading-[1.03]
                      "

                      style={{
                        color:
                          result.color
                      }}
                    >

                      {result.name}

                    </h1>

                    <p
                      className="
                        text-xl
                        md:text-2xl
                        mt-5
                        text-[#F7E8C5]/70
                        leading-relaxed
                        max-w-3xl
                      "
                    >

                      {result.tagline}

                    </p>

                  </div>

                </div>

              </div>

              {/* DESCRIPTION */}

              <div
                className="
                  rounded-[32px]
                  bg-[#120d06]
                  border
                  border-[#2a2112]
                  p-6
                  md:p-8
                  mb-12
                "
              >

                <div className="text-[#D4A43B] uppercase tracking-[0.25em] text-xs mb-5">

                  Identity Analysis

                </div>

                <p
                  className="
                    text-lg
                    md:text-2xl
                    leading-relaxed
                    text-[#F7E8C5]/80
                  "
                >

                  {result.description}

                </p>

              </div>

              {/* TRAITS */}

              <div className="mb-12">

                <div className="text-3xl font-bold mb-8">

                  Core Traits

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                  {
                    result.traits.map(
                      (
                        trait,
                        index
                      ) => (

                        <div
                          key={index}

                          className="
                            rounded-3xl
                            bg-[#120d06]
                            border
                            border-[#2a2112]
                            p-7
                          "
                        >

                          <div className="text-[#D4A43B] text-sm uppercase tracking-[0.2em] mb-4">

                            Trait

                          </div>

                          <div className="text-2xl font-bold">

                            {trait}

                          </div>

                        </div>

                      )
                    )
                  }

                </div>

              </div>

              {/* CTA */}

              <div
                className="
                  rounded-[32px]
                  border
                  border-[#2a2112]
                  bg-black/30
                  p-6
                  md:p-8
                "
              >

                <div className="text-3xl font-bold mb-4">

                  Continue Your Growth Journey

                </div>

                <p
                  className="
                    text-[#F7E8C5]/60
                    text-lg
                    leading-relaxed
                    max-w-3xl
                    mb-8
                  "
                >

                  Connect with strategic guides aligned with your growth archetype and begin compounding transformation.

                </p>

                <div className="flex flex-col sm:flex-row gap-4">

                  <Link
                    href="/guides"

                    className="
                      px-7
                      py-5
                      rounded-2xl
                      bg-[#D4A43B]
                      text-black
                      font-bold
                      hover:scale-[1.02]
                      transition
                      text-center
                    "
                  >

                    Find Guides

                  </Link>

                  <button
                    onClick={restart}

                    className="
                      px-7
                      py-5
                      rounded-2xl
                      border
                      border-[#2a2112]
                      hover:border-[#D4A43B]/40
                      transition
                    "
                  >

                    Discover Again

                  </button>

                </div>

              </div>

              {/* SAVING */}

              {
                saving && (

                  <div className="mt-8 text-[#D4A43B] text-sm">

                    Saving archetype profile...

                  </div>

                )
              }

            </div>

          )
        }

      </div>

    </div>

  );

}