"use client";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  ArrowRight,
  ArrowLeft
} from "lucide-react";

import IdentityResults from "./IdentityResults";

const questions = [
  {
    id: 1,
    question: "What usually breaks your momentum?",
    options: [
      "Overthinking",
      "Distractions",
      "Lack of structure",
      "Burnout",
      "Fear of failure"
    ]
  },

  {
    id: 2,
    question: "How do you naturally learn best?",
    options: [
      "Visual learning",
      "Practice and execution",
      "Discussion and mentorship",
      "Independent exploration",
      "Structured systems"
    ]
  },

  {
    id: 3,
    question: "What kind of growth are you pursuing?",
    options: [
      "Career growth",
      "Academic excellence",
      "Business growth",
      "Personal transformation",
      "Leadership development"
    ]
  },

  {
    id: 4,
    question: "When motivation drops, what happens?",
    options: [
      "I procrastinate",
      "I become inconsistent",
      "I abandon goals",
      "I isolate myself",
      "I lose direction"
    ]
  }
];

export default function IdentityQuestions({

  selectedPath

}) {

  const [step, setStep] = useState(0);

  const [answers, setAnswers] = useState({});

  const [completed, setCompleted] = useState(false);

  const safeStep =

  step >= questions.length
    ? 0
    : step;

const current =
  questions[safeStep];

if(!current){

  return null;

}

  function handleSelect(option){

    const updated = {
      ...answers,
      [current.id]: option
    };

    setAnswers(updated);

    if(step < questions.length - 1){

      setTimeout(() => {

        setStep(prev => prev + 1);

      }, 250);

    } else {

      setTimeout(() => {

        setCompleted(true);

      }, 400);

    }

  }

  if(completed){

    return (

      <IdentityResults
        selectedPath={selectedPath}
        answers={answers}
      />

    );

  }

  return (

    <div className="mt-10">

      {/* TOP */}
      <div className="flex items-center justify-between gap-4">

        <div className="text-white/40 text-sm">

          Step {safeStep + 1} of {questions.length}

        </div>

        <div className="text-[#D4A43B] text-sm font-semibold">

          {selectedPath}

        </div>

      </div>

      {/* PROGRESS */}
      <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">

        <motion.div
          animate={{
  width: `${((safeStep + 1) / questions.length) * 100}%`
}}
          transition={{
            duration: 0.3
          }}
          className="
          h-full
          bg-gradient-to-r
          from-[#7C3AED]
          to-[#D4A43B]
          rounded-full
          "
        />

      </div>

      {/* QUESTION */}
      <AnimatePresence mode="wait">

        <motion.div
          key={safeStep}
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            y: -20
          }}
          transition={{
            duration: 0.3
          }}
          className="mt-10"
        >

          <h3
            className="
            text-3xl
            sm:text-4xl
            font-black
            leading-tight
            text-white
            "
          >

            {current.question}

          </h3>

          {/* OPTIONS */}
          <div className="mt-8 grid gap-4">

            {current.options.map((option, i) => (

              <motion.button
                key={i}
                whileHover={{
                  y: -2
                }}
                whileTap={{
                  scale: 0.98
                }}
                onClick={() => handleSelect(option)}
                className="
                group
                text-left
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                hover:bg-white/[0.06]
                hover:border-[#D4A43B]/30
                p-5
                transition-all
                duration-300
                "
              >

                <div className="flex items-center justify-between gap-4">

                  <span
                    className="
                    text-base
                    sm:text-lg
                    text-white/85
                    "
                  >

                    {option}

                  </span>

                  <ArrowRight
                    size={18}
                    className="
                    text-[#D4A43B]
                    opacity-0
                    group-hover:opacity-100
                    group-hover:translate-x-1
                    transition-all
                    duration-300
                    "
                  />

                </div>

              </motion.button>

            ))}

          </div>

        </motion.div>

      </AnimatePresence>

      {/* BACK */}
      {step > 0 && (

        <button
          onClick={() => setStep(prev => prev - 1)}
          className="
          mt-8
          inline-flex
          items-center
          gap-2
          text-white/50
          hover:text-white
          transition-all
          duration-300
          "
        >

          <ArrowLeft size={16} />

          Back

        </button>

      )}

    </div>

  );

}