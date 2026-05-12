"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter }
from "next/navigation";

import {
  QUESTIONS,
  calculateArchetype,
} from "../../lib/archetypes";

import {
  generateIdentityReport,
} from "../../lib/ai";

import { supabase }
from "../../lib/supabase";

import { useAuth }
from "../../context/AuthContext";

export default function DiscoverPage() {

  const router = useRouter();

  const {
    user,
    loading: authLoading,
  } = useAuth();

  const [step, setStep] =
    useState(0);

  const [answers, setAnswers] =
    useState([]);

  const [submitting,
    setSubmitting] =
    useState(false);

  // Protect page
  useEffect(() => {

    if (
      !authLoading &&
      !user
    ) {

      router.push("/login");
    }

  }, [user, authLoading, router]);

  // Loading state
  if (authLoading || !user) {

    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">

        <p className="text-gray-600">
          Loading...
        </p>

      </main>
    );
  }

  const currentQuestion =
    QUESTIONS[step];

  async function selectAnswer(type) {

    if (submitting) return;

    const updatedAnswers =
      [...answers, type];

    setAnswers(updatedAnswers);

    // Continue questions
    if (
      step <
      QUESTIONS.length - 1
    ) {

      setStep(step + 1);

      return;
    }

    setSubmitting(true);

    // Calculate archetype
    const archetype =
      calculateArchetype(
        updatedAnswers
      );

    // Generate interpretation
    const report =
      await generateIdentityReport(
        archetype
      );

    // Save to database
    const { error } =
      await supabase
        .from("profiles")
        .update({
          archetype,
          mission:
            report.mission,
        })
        .eq("id", user.id);

    if (error) {

      console.error(error);

      alert(
        "Failed to save identity."
      );

      setSubmitting(false);

      return;
    }

    // Save locally
    localStorage.setItem(
      "identityReport",
      JSON.stringify({
        archetype,
        report,
      })
    );

    // Redirect
    router.push("/results");
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-8 flex items-center justify-center">

      <div className="w-full max-w-2xl bg-white rounded-3xl border border-gray-200 p-8">

        {/* Progress */}
        <div className="mb-8">

          <p className="text-sm text-gray-500">

            Question
            {" "}
            {step + 1}
            {" "}
            of
            {" "}
            {QUESTIONS.length}

          </p>

          <div className="w-full h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">

            <div
              className="h-full bg-[#D4A017] transition-all"
              style={{
                width:
                  `${((step + 1) / QUESTIONS.length) * 100}%`,
              }}
            />

          </div>

          <h1 className="mt-6 text-3xl font-bold text-[#0F172A] leading-tight">

            {currentQuestion.question}

          </h1>

        </div>

        {/* Answers */}
        <div className="grid gap-4">

          {currentQuestion.options.map(
            (option, index) => (

            <button
              key={index}
              onClick={() =>
                selectAnswer(
                  option.type
                )
              }
              disabled={submitting}
              className="text-left p-5 rounded-2xl border border-gray-200 hover:border-[#D4A017] hover:bg-[#FEFCE8] transition disabled:opacity-50"
            >

              <p className="text-lg font-medium text-[#0F172A]">

                {option.text}

              </p>

            </button>
          ))}

        </div>

      </div>

    </main>
  );
}