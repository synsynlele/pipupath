'use client';

import { supabase } from "@/lib/supabase";

import { useState } from "react";

import NavBar from "@/components/NavBar";

import {
  QUESTIONS,
  ARCHETYPES,
  calculateArchetype
} from "@/lib/archetypes";

export default function DiscoverPage(){

  const [step,setStep] = useState(0);

  const [answers,setAnswers] = useState([]);

  const [result,setResult] = useState(null);

  const currentQuestion = QUESTIONS[step];

  function choose(index){

    const updated = [
      ...answers,
      index
    ];

    setAnswers(updated);

    if(step + 1 >= QUESTIONS.length){

  const archetypeKey =
    calculateArchetype(updated);

  const archetype =
    ARCHETYPES[archetypeKey];

  setResult({
    key: archetypeKey,
    ...archetype
  });

  saveProfile(archetypeKey, archetype);

  return;
}

    setStep(step + 1);
  }

  function restart(){

async function saveProfile(archetypeKey, archetype){

  const { data:userData } =
    await supabase.auth.getUser();

  const user = userData?.user;

  if(!user) return;

  await supabase
    .from("user_profiles")
    .upsert({

      user_id:user.id,

      archetype:archetypeKey,

      archetype_data:archetype

    });

}

    setAnswers([]);

    setStep(0);

    setResult(null);
  }

  return (

    <div className="min-h-screen bg-gradient-to-b from-[#050300] to-[#0c0903] text-[#F7E8C5]">

      <NavBar />

      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* QUESTIONS */}

        {!result && (

          <>

            <div className="text-[#D4A43B] uppercase tracking-[0.35em] text-xs mb-6">
              Discovery Engine
            </div>

            <h1 className="text-5xl font-bold leading-tight mb-6">
              Discover Your Growth Archetype
            </h1>

            <p className="text-[#F7E8C5]/70 text-lg mb-14">
              Your decisions shape your growth trajectory.
            </p>

            <div className="rounded-[32px] border border-[#2a2112] bg-white/[0.03] backdrop-blur-xl p-10">

              <div className="text-[#D4A43B] text-sm mb-6">
                Question {step + 1} / {QUESTIONS.length}
              </div>

              <h2 className="text-3xl font-bold leading-relaxed mb-10">

                {currentQuestion.question}

              </h2>

              <div className="grid gap-5">

                {currentQuestion.options.map((option,index)=>(

                  <button
                    key={index}
                    onClick={()=>choose(index)}
                    className="text-left rounded-2xl border border-[#2a2112] bg-[#120d06] hover:border-[#D4A43B] hover:bg-[#1b1409] transition p-6"
                  >

                    <div className="text-lg">
                      {option.text}
                    </div>

                  </button>

                ))}

              </div>

            </div>

          </>

        )}

        {/* RESULT */}

        {result && (

          <div
            className="rounded-[36px] border border-[#2a2112] bg-white/[0.03] backdrop-blur-xl p-12"
            style={{
              boxShadow:`0 0 60px ${result.glow}`
            }}
          >

            <div className="text-[#D4A43B] uppercase tracking-[0.35em] text-xs mb-6">
              Your Archetype
            </div>

            <div className="flex items-center gap-5 mb-8">

              <div
                className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl"
                style={{
                  background:result.glow,
                  border:`1px solid ${result.color}`
                }}
              >
                {result.emoji}
              </div>

              <div>

                <h1
                  className="text-6xl font-bold"
                  style={{
                    color:result.color
                  }}
                >
                  {result.name}
                </h1>

                <p className="text-xl mt-3 text-[#F7E8C5]/70">
                  {result.tagline}
                </p>

              </div>

            </div>

            <p className="text-[#F7E8C5]/75 text-xl leading-relaxed mb-12 max-w-3xl">

              {result.description}

            </p>

            {/* TRAITS */}

            <div className="grid md:grid-cols-3 gap-5">

              {result.traits.map((trait,index)=>(

                <div
                  key={index}
                  className="rounded-2xl bg-[#120d06] border border-[#2a2112] p-6"
                >

                  <div className="text-[#D4A43B] text-sm mb-4">
                    Trait
                  </div>

                  <div className="text-2xl font-bold">
                    {trait}
                  </div>

                </div>

              ))}

            </div>

            {/* RESTART */}

            <button
              onClick={restart}
              className="mt-10 px-6 py-4 rounded-2xl border border-[#D4A43B]/30 hover:border-[#D4A43B] text-[#F7E8C5] transition"
            >
              Discover Again
            </button>

          </div>

        )}

      </div>

    </div>
  );
}