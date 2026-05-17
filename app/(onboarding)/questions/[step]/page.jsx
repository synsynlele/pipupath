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
    key: "energy",
    title:
      "What kind of work makes you feel naturally excited or deeply interested?",

    subtitle:
      "Think about work that energizes you naturally.",

    placeholder:
      "Designing, teaching, solving problems, creating videos...",
  },

  {
    key: "skill",
    title:
      "What do people naturally come to you for help with?",

    subtitle:
      "Sometimes your natural value is already visible to others.",

    placeholder:
      "Explaining things, fixing problems, editing videos...",
  },

  {
    key: "type",
    title:
      "Would you rather create, organize, solve, teach, lead, or explore?",

    subtitle:
      "Choose the kind of role that feels most natural to you.",

    placeholder:
      "Create, solve, lead...",
  },

  {
    key: "money",
    title:
      "If you could start making money online within 30 days, what would you want it to be from?",

    subtitle:
      "Think practical, realistic, and interesting.",

    placeholder:
      "Content creation, freelancing, selling products...",
  },

  {
    key: "obsession",
    title:
      "What topics, industries, or problems do you constantly think about?",

    subtitle:
      "Your future often hides inside your obsessions.",

    placeholder:
      "Technology, fashion, education, AI...",
  },

  {
    key: "style",
    title:
      "Do you prefer working alone, with people, behind the scenes, or publicly?",

    subtitle:
      "This helps discover your ideal operating style.",

    placeholder:
      "Alone, publicly, with teams...",
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