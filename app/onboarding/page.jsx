"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "../../context/AuthContext";

import { supabase } from "../../lib/supabase";

const QUESTIONS = [

  {
    id: 1,

    question:
      "What kind of future feels most meaningful to you?",

    options: [

      {
        text:
          "Building ideas, systems or creations that impact the world",

        type:
          "Builder",
      },

      {
        text:
          "Leading people toward growth, change or progress",

        type:
          "Leader",
      },

      {
        text:
          "Understanding life deeply and developing wisdom",

        type:
          "Thinker",
      },

      {
        text:
          "Helping people heal, grow and become better",

        type:
          "Guide",
      },

    ],
  },

  {
    id: 2,

    question:
      "What frustrates you most about your current life direction?",

    options: [

      {
        text:
          "I have ideas and ambition but struggle with consistent execution",

        type:
          "Builder",
      },

      {
        text:
          "I know I can do more but feel scattered or unfocused",

        type:
          "Leader",
      },

      {
        text:
          "I overthink decisions and delay meaningful action",

        type:
          "Thinker",
      },

      {
        text:
          "I care deeply about others but neglect my own growth",

        type:
          "Guide",
      },

    ],
  },

  {
    id: 3,

    question:
      "What gives you the strongest sense of purpose?",

    options: [

      {
        text:
          "Creating meaningful things that outlive me",

        type:
          "Builder",
      },

      {
        text:
          "Helping people organize and move forward",

        type:
          "Leader",
      },

      {
        text:
          "Discovering deeper understanding and insight",

        type:
          "Thinker",
      },

      {
        text:
          "Helping people become healthier and stronger",

        type:
          "Guide",
      },

    ],
  },

  {
    id: 4,

    question:
      "When life becomes uncertain, what do you naturally rely on?",

    options: [

      {
        text:
          "Experimenting, building and adapting quickly",

        type:
          "Builder",
      },

      {
        text:
          "Creating structure, plans and direction",

        type:
          "Leader",
      },

      {
        text:
          "Thinking deeply before acting",

        type:
          "Thinker",
      },

      {
        text:
          "Seeking perspective through human connection",

        type:
          "Guide",
      },

    ],
  },

  {
    id: 5,

    question:
      "Which capability do you most want to strengthen right now?",

    options: [

      {
        text:
          "Execution and turning ideas into reality",

        type:
          "Builder",
      },

      {
        text:
          "Discipline, leadership and consistency",

        type:
          "Leader",
      },

      {
        text:
          "Clarity, thinking and intelligent decision-making",

        type:
          "Thinker",
      },

      {
        text:
          "Communication, empathy and helping others effectively",

        type:
          "Guide",
      },

    ],
  },

  {
    id: 6,

    question:
      "What kind of person do you ultimately want to become?",

    options: [

      {
        text:
          "Someone who builds meaningful things for the future",

        type:
          "Builder",
      },

      {
        text:
          "Someone capable of leading meaningful progress",

        type:
          "Leader",
      },

      {
        text:
          "Someone known for wisdom and intelligent thinking",

        type:
          "Thinker",
      },

      {
        text:
          "Someone who helps people grow meaningfully",

        type:
          "Guide",
      },

    ],
  },

];

const REFLECTION_QUESTIONS = [

  {
    id: 1,

    prompt:
      "What feels hardest about your life right now?",
  },

  {
    id: 2,

    prompt:
      "What kind of person do you want to become?",
  },

  {
    id: 3,

    prompt:
      "If your life became much better in the next few years, what would likely change most?",
  },

];

import {
  ARCHETYPES
} from "../../lib/identity/archetypes";


export default function OnboardingPage() {

  const router = useRouter();

  const { user, loading } = useAuth();

  const [step, setStep] = useState(0);

  const [answers, setAnswers] =
    useState([]);

const [

  reflectionStep,

  setReflectionStep,

] = useState(0);

const [

  reflectionAnswers,

  setReflectionAnswers,

] = useState({

    struggle: "",

    futureSelf: "",

    futureChange: "",
});

  const [submitting, setSubmitting] =
    useState(false);

const [

  reflectionMode,

  setReflectionMode,

] = useState(false);

  // Redirect unauthenticated users
  useEffect(() => {

    if (!loading && !user) {

      router.push("/login");
    }

  }, [user, loading, router]);

  const currentQuestion =
    QUESTIONS[step];

  const progress = useMemo(() => {

    return Math.round(
      ((step + 1) /
        QUESTIONS.length) *
        100
    );

  }, [step]);

  function handleAnswer(type) {

    const updated = [
      ...answers,
      type,
    ];

    setAnswers(updated);

    if (
  step < QUESTIONS.length - 1
) {

  setTimeout(() => {

    setStep(step + 1);

  }, 250);

} else {

  setReflectionMode(true);
}
  }

  async function completeOnboarding(
  finalAnswers
) {

    if (!user) return;

    setSubmitting(true);

    const counts = {};

    finalAnswers.forEach((item) => {

      counts[item] =
        (counts[item] || 0) + 1;
    });

    let topType = "Builder";

    let highest = 0;

    Object.keys(counts).forEach((key) => {

      if (counts[key] > highest) {

        highest = counts[key];

        topType = key;
      }
    });

    const archetypeData =
  ARCHETYPES[topType];

    try {

      const { error } =
        await supabase
          .from("profiles")
          .update({

            archetype:
              archetypeData.title,

            onboarding_completed:
              true,

            onboarding_completed_at:
              new Date().toISOString(),
             
            identity_reflections:
  reflectionAnswers,
          })
          .eq("id", user.id);

      if (error) {

        console.error(error);

        setSubmitting(false);

        return;
      }

      localStorage.setItem(
        "archetype_result",
        JSON.stringify({
          ...archetypeData,
          type: topType,
        })
      );

      router.push("/results");

    } catch (error) {

      console.error(error);
    }

    setSubmitting(false);
  }

  if (loading || !user) {

    return (
      <main className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-6">

        <div className="flex flex-col items-center gap-5">

          <div className="w-14 h-14 rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37] animate-spin" />

          <p className="text-[#64748B] text-sm tracking-wide">
            Preparing your identity experience...
          </p>

        </div>

      </main>
    );
  }

function handleReflectionChange(
  value
) {

  if (reflectionStep === 0) {

    setReflectionAnswers(
      (prev) => ({

        ...prev,

        struggle: value,
      })
    );
  }

  if (reflectionStep === 1) {

    setReflectionAnswers(
      (prev) => ({

        ...prev,

        futureSelf: value,
      })
    );
  }

  if (reflectionStep === 2) {

    setReflectionAnswers(
      (prev) => ({

        ...prev,

        futureChange: value,
      })
    );
  }
}

  return (

    <main className="min-h-screen bg-[#F5F7FA] overflow-hidden text-[#0F172A]">

      {/* Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-[#D4AF37]/10 rounded-full blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-[#0F172A]/5 rounded-full blur-3xl" />

      </div>

      <div className="relative max-w-4xl mx-auto min-h-screen px-4 py-8 md:px-8 flex flex-col">

        {/* Header */}
        <div>

          <p className="text-[11px] uppercase tracking-[0.35em] text-[#94A3B8] font-medium">
            Identity Calibration
          </p>

          <div className="mt-6 h-2 bg-[#E2E8F0] rounded-full overflow-hidden">

            <div
              className="h-full bg-[#D4AF37] rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <div className="mt-3 flex items-center justify-between">

            <p className="text-sm text-[#64748B]">
              Question {step + 1} of {QUESTIONS.length}
            </p>

            <p className="text-sm text-[#64748B]">
              {progress}%
            </p>

          </div>

        </div>

        {/* Main */}
        <div className="flex-1 flex flex-col justify-center py-12">

          {submitting ? (

            <div className="flex flex-col items-center justify-center text-center py-20">

              <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37] animate-spin" />

              <h2 className="mt-8 text-3xl font-semibold tracking-tight text-[#0F172A]">
                Analyzing your behavioral identity...
              </h2>

              <p className="mt-4 text-[#64748B] max-w-lg leading-relaxed">
                Building your personalized evolution profile.
              </p>

            </div>

          ) : (

            <>

  {!reflectionMode ? (

    <>

      <div className="max-w-3xl">

        <p className="text-sm uppercase tracking-[0.25em] text-[#94A3B8]">

          Identity Question

        </p>

        <h1 className="mt-8 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] text-[#0F172A]">

          {currentQuestion.question}

        </h1>

      </div>

      <div className="mt-14 grid gap-4">

        {currentQuestion.options.map((option, index) => (

          <button
            key={index}
            onClick={() =>
              handleAnswer(
                option.type
              )
            }
            className="group text-left rounded-[28px] border border-white/60 bg-white/80 backdrop-blur-xl p-6 md:p-7 shadow-[0_10px_50px_rgba(15,23,42,0.04)] hover:translate-y-[-2px] hover:border-[#D4AF37]/30 transition-all duration-300"
          >

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="text-xl md:text-2xl font-medium tracking-tight text-[#0F172A] leading-relaxed">

                  {option.text}

                </p>

              </div>

              <div className="w-12 h-12 rounded-2xl border border-[#E2E8F0] bg-[#FAFAFA] flex items-center justify-center group-hover:bg-[#0F172A] group-hover:text-white transition-all duration-300">

                →

              </div>

            </div>

          </button>

        ))}

      </div>

    </>

  ) : (

    <>

      <div className="max-w-3xl">

        <p className="text-sm uppercase tracking-[0.25em] text-[#94A3B8]">

          A Little More About You

        </p>

        <h1 className="mt-8 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] text-[#0F172A]">

          {
            REFLECTION_QUESTIONS[
              reflectionStep
            ].prompt
          }

        </h1>

      </div>

      <div className="mt-12">

        <textarea

          rows={6}

          value={

            reflectionStep === 0

              ? reflectionAnswers.struggle

              : reflectionStep === 1

              ? reflectionAnswers.futureSelf

              : reflectionAnswers.futureChange
          }

          onChange={(e) =>
            handleReflectionChange(
              e.target.value
            )
          }

          placeholder="Write whatever feels true for you..."

          className="w-full rounded-[32px] border border-[#E2E8F0] bg-white/80 backdrop-blur-xl p-6 text-lg text-[#0F172A] outline-none resize-none shadow-[0_10px_50px_rgba(15,23,42,0.04)] focus:border-[#D4AF37]/40"
        />

        <div className="mt-8 flex items-center justify-between">

          <p className="text-sm text-[#94A3B8]">

            There are no right or wrong answers.

          </p>

          <button

            onClick={() => {

              if (
                reflectionStep <

                REFLECTION_QUESTIONS.length - 1
              ) {

                setReflectionStep(
                  reflectionStep + 1
                );

              } else {

                completeOnboarding(
                  answers
                );
              }
            }}

            className="rounded-2xl bg-[#0F172A] px-7 py-4 text-white font-medium hover:translate-y-[-2px] transition-all duration-300"
          >

            Continue

          </button>

        </div>

      </div>

    </>

  )}

</>
          )}

        </div>

      </div>

    </main>
  );
}
