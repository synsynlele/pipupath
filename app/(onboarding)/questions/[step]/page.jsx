"use client";

import {
  use,
  useState,
  useEffect,
} from "react";

import { useRouter } from "next/navigation";

import OnboardingLayout from "@/features/onboarding/components/OnboardingLayout";

import ProgressDots from "@/features/onboarding/components/ProgressDots";

import QuestionCard from "@/features/onboarding/components/QuestionCard";

import useOnboardingStore from "@/stores/onboardingStore";

const questions = [

  {
    key: "attention",

    title:
      "What kinds of problems, ideas, or situations naturally catch your attention even when nobody asks you to care about them?",

    subtitle:
      "Your attention patterns often reveal your deepest builder direction.",

    placeholder:
      "Broken systems, technology, helping people, storytelling, design, business opportunities...",
  },

  {
    key: "energy",

    title:
      "What type of work or activity gives you energy instead of draining you, even when it becomes difficult?",

    subtitle:
      "This helps uncover the kind of work you can sustain long-term.",

    placeholder:
      "Teaching, building products, solving problems, organizing people...",
  },

  {
    key: "friction",

    title:
      "When you stop making progress on something important, what usually caused it?",

    subtitle:
      "Understanding your bottlenecks is more valuable than pretending to be perfect.",

    placeholder:
      "Distractions, inconsistency, overthinking, lack of support, fear...",
  },

  {
    key: "social",

    title:
      "In groups, teams, or communities, what role do you naturally drift toward over time?",

    subtitle:
      "People usually reveal their natural operating style socially.",

    placeholder:
      "Leading, organizing, teaching, solving problems quietly, motivating...",
  },

  {
    key: "value",

    title:
      "If someone had to pay you tomorrow based only on your current abilities, what would they most likely pay you for?",

    subtitle:
      "This helps identify practical value creation paths already visible in you.",

    placeholder:
      "Explaining things, editing videos, solving technical problems, writing...",
  },

  {
    key: "environment",

    title:
      "What kind of environment usually helps you perform at your best?",

    subtitle:
      "Some people thrive with structure. Others need freedom or accountability.",

    placeholder:
      "Clear structure, independence, collaboration, deadlines, quiet spaces...",
  },

  {
    key: "leverage",

    title:
      "What ability, skill, or path do you believe could completely change your future if you mastered it deeply?",

    subtitle:
      "This reveals where your mind already sees long-term leverage.",

    placeholder:
      "Communication, technology, business, design, leadership, AI...",
  },
];


export default function QuestionStepPage(props) {

  const params = use(props.params);

  const router = useRouter();

 const step = params.step;

  const currentStep =
    parseInt(step || "1");

  const question =
    questions[currentStep - 1];

  const {
    answers,
    setAnswer,
  } = useOnboardingStore();

  const [value, setValue] =
    useState(
      answers[question?.key] || ""
    );

  useEffect(() => {

    if (
      currentStep < 1 ||
      currentStep > questions.length
    ) {

      router.push("/questions/1");
    }

  }, [
    currentStep,
    router,
  ]);

  if (!question) return null;

  function handleContinue() {

    setAnswer(question.key, value);

    if (
      currentStep < questions.length
    ) {

      router.push(
        `/questions/${currentStep + 1}`
      );

    } else {

      router.push("/analyzing");
    }
  }

  return (

    <OnboardingLayout>

      <ProgressDots
        total={questions.length}
        current={currentStep}
      />

      <QuestionCard
        title={question.title}
        subtitle={question.subtitle}
        placeholder={question.placeholder}
        value={value}
        onChange={(e) =>
          setValue(e.target.value)
        }
        onContinue={handleContinue}
      />

    </OnboardingLayout>
  );
}