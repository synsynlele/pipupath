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
      "When facing a difficult goal, what usually drives you most?",

    options: [
      {
        text: "Building something meaningful",
        type: "Builder",
      },

      {
        text: "Winning and achieving excellence",
        type: "Commander",
      },

      {
        text: "Learning and understanding deeply",
        type: "Scholar",
      },

      {
        text: "Helping and inspiring people",
        type: "Guide",
      },
    ],
  },

  {
    id: 2,

    question:
      "Which environment helps you perform at your best?",

    options: [
      {
        text: "Structured systems and plans",
        type: "Commander",
      },

      {
        text: "Creative freedom and experimentation",
        type: "Builder",
      },

      {
        text: "Quiet reflection and thinking",
        type: "Scholar",
      },

      {
        text: "Collaboration and human connection",
        type: "Guide",
      },
    ],
  },

  {
    id: 3,

    question:
      "What frustrates you most about yourself?",

    options: [
      {
        text: "Overthinking instead of executing",
        type: "Scholar",
      },

      {
        text: "Starting too many ideas",
        type: "Builder",
      },

      {
        text: "Being impatient with others",
        type: "Commander",
      },

      {
        text: "Neglecting my own needs",
        type: "Guide",
      },
    ],
  },

  {
    id: 4,

    question:
      "How do you usually respond to uncertainty?",

    options: [
      {
        text: "Create a strategy immediately",
        type: "Commander",
      },

      {
        text: "Experiment and adapt",
        type: "Builder",
      },

      {
        text: "Research and analyze",
        type: "Scholar",
      },

      {
        text: "Seek perspective from people",
        type: "Guide",
      },
    ],
  },

  {
    id: 5,

    question:
      "What kind of impact matters most to you?",

    options: [
      {
        text: "Building systems that last",
        type: "Builder",
      },

      {
        text: "Leading transformation",
        type: "Commander",
      },

      {
        text: "Sharing wisdom and insight",
        type: "Scholar",
      },

      {
        text: "Improving people's lives directly",
        type: "Guide",
      },
    ],
  },

  {
    id: 6,

    question:
      "Which statement feels most true about you?",

    options: [
      {
        text: "I naturally organize people and direction",
        type: "Commander",
      },

      {
        text: "I constantly imagine new possibilities",
        type: "Builder",
      },

      {
        text: "I search for deeper understanding",
        type: "Scholar",
      },

      {
        text: "I care deeply about human growth",
        type: "Guide",
      },
    ],
  },
];

const ARCHETYPE_DATA = {

  Builder: {

    title: "The Builder",

    description:
      "You are driven to create, improve and bring ideas into reality.",

    strength:
      "Visionary execution",

    weakness:
      "Scattered focus",
  },

  Commander: {

    title: "The Commander",

    description:
      "You thrive through direction, discipline and strategic action.",

    strength:
      "Leadership and execution",

    weakness:
      "Impatience and pressure",
  },

  Scholar: {

    title: "The Scholar",

    description:
      "You seek understanding, depth and intelligent growth.",

    strength:
      "Deep thinking",

    weakness:
      "Overanalysis",
  },

  Guide: {

    title: "The Guide",

    description:
      "You are motivated by helping others evolve and flourish.",

    strength:
      "Human connection",

    weakness:
      "Self-neglect",
  },
};

export default function OnboardingPage() {

  const router = useRouter();

  const { user, loading } = useAuth();

  const [step, setStep] = useState(0);

  const [answers, setAnswers] =
    useState([]);

  const [submitting, setSubmitting] =
    useState(false);

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

      completeOnboarding(updated);
    }
  }

  async function completeOnboarding(finalAnswers) {

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
      ARCHETYPE_DATA[topType];

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

              <div className="max-w-3xl">

                <p className="text-sm uppercase tracking-[0.25em] text-[#94A3B8]">
                  Identity Question
                </p>

                <h1 className="mt-8 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] text-[#0F172A]">

                  {currentQuestion.question}

                </h1>

              </div>

              {/* Options */}
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

          )}

        </div>

      </div>

    </main>
  );
}
