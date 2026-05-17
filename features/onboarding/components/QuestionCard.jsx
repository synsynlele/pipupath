"use client";

import FloatingInput
from "@/components/ui/FloatingInput";

import GlowButton
from "@/components/ui/GlowButton";

export default function QuestionCard({
  title,
  subtitle,
  placeholder,
  value,
  onChange,
  onContinue,
}) {

  const isDisabled =
    !value?.trim();

  return (

    <div className="flex flex-col">

      {/* TITLE */}

      <h1 className="text-4xl font-bold leading-tight tracking-tight text-white">

        {title}

      </h1>

      {/* SUBTITLE */}

      {subtitle && (

        <p className="mt-4 text-lg leading-relaxed text-slate-400">

          {subtitle}

        </p>

      )}

      {/* INPUT */}

      <div className="mt-10">

        <FloatingInput
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />

      </div>

      {/* CTA */}

      <div className="mt-8">

        <GlowButton
          onClick={onContinue}
          disabled={isDisabled}
        >

          {
            isDisabled
              ? "Answer to continue"
              : "Continue"
          }

        </GlowButton>

      </div>

    </div>
  );
}