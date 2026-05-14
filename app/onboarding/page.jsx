"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState }
from "react";

import { useRouter }
from "next/navigation";

import { useAuth }
from "../../context/AuthContext";

import { supabase }
from "../../lib/supabase";

const ARCHETYPES = [

  {
    id: "Builder",
    title: "Builder",
    description:
      "You are driven to create meaningful things, build capability and construct a future that feels real and impactful.",
    strengths: [
      "Execution",
      "Persistence",
      "Long-term thinking",
    ],
    risks: [
      "Burnout",
      "Isolation",
      "Working without direction",
    ],
  },

  {
    id: "Explorer",
    title: "Explorer",
    description:
      "You are driven by curiosity, expansion and discovering possibilities beyond conventional paths.",
    strengths: [
      "Curiosity",
      "Adaptability",
      "Vision expansion",
    ],
    risks: [
      "Drifting",
      "Endless searching",
      "Difficulty committing",
    ],
  },

  {
    id: "Leader",
    title: "Leader",
    description:
      "You are driven to create structure, take responsibility and influence meaningful outcomes around you.",
    strengths: [
      "Initiative",
      "Responsibility",
      "Coordination",
    ],
    risks: [
      "Control obsession",
      "Pressure addiction",
      "Ego attachment",
    ],
  },

  {
    id: "Strategist",
    title: "Strategist",
    description:
      "You are driven to deeply understand systems, leverage and how meaningful outcomes are actually created.",
    strengths: [
      "Analysis",
      "Systems thinking",
      "Optimization",
    ],
    risks: [
      "Overthinking",
      "Inaction",
      "Disconnection from execution",
    ],
  },

  {
    id: "Creator",
    title: "Creator",
    description:
      "You are driven to express vision, originality and emotionally meaningful ideas through creation.",
    strengths: [
      "Creativity",
      "Imagination",
      "Emotional depth",
    ],
    risks: [
      "Inconsistency",
      "Emotional volatility",
      "Unfinished work",
    ],
  },

];

export default function OnboardingPage() {

  const router =
    useRouter();

  const {
    user,
    loading,
  } = useAuth();

  // =========================
  // STATE
  // =========================

  const [
    recalibrationMode,
    setRecalibrationMode,
  ] = useState(false);

  const [
    selectedArchetype,
    setSelectedArchetype,
  ] = useState(null);

  const [
    futureVision,
    setFutureVision,
  ] = useState("");

  const [
    currentStruggle,
    setCurrentStruggle,
  ] = useState("");

  const [
    currentFocus,
    setCurrentFocus,
  ] = useState("");

  const [
    loadingState,
    setLoadingState,
  ] = useState(false);

  // =========================
  // AUTH
  // =========================

  useEffect(() => {

    if (
      !loading &&
      !user
    ) {

      router.push(
        "/login"
      );

    }

  }, [
    user,
    loading,
    router,
  ]);

  // =========================
  // CHECK MODE
  // =========================

  useEffect(() => {

    async function checkProfile() {

      if (!user) return;

      const {
        data,
      } = await supabase

        .from("profiles")

        .select("*")

        .eq(
          "id",
          user.id
        )

        .single();

      if (
        data?.onboarding_completed
      ) {

        setRecalibrationMode(
          true
        );

      }

    }

    checkProfile();

  }, [user]);

  // =========================
  // COMPLETE
  // =========================

  async function handleComplete() {

    if (
      !selectedArchetype
    ) return;

    try {

      setLoadingState(true);

      const identitySummary = `

Archetype:
${selectedArchetype.id}

Future Vision:
${futureVision}

Current Focus:
${currentFocus}

Current Struggle:
${currentStruggle}

`;

      const {
        error,
      } = await supabase

        .from("profiles")

        .update({

          archetype:
            selectedArchetype.id,

          aspirations:
            futureVision,

          current_focus:
            currentFocus,

          current_struggle:
            currentStruggle,

          identity_summary:
            identitySummary,

          onboarding_completed:
            true,

        })

        .eq(
          "id",
          user.id
        );

      if (error) {

        console.error(error);

        return;

      }

      window.location.href =
        "/dashboard";

    }

    catch (error) {

      console.error(error);

    }

    finally {

      setLoadingState(false);

    }

  }

  // =========================
  // LOADING
  // =========================

  if (
    loading ||
    !user
  ) {

    return (

      <main className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">

        <div className="flex flex-col items-center gap-4">

          <div className="w-14 h-14 rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37] animate-spin" />

          <p className="text-sm text-[#64748B]">

            Preparing developmental environment...

          </p>

        </div>

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-[#F5F7FA] overflow-x-hidden text-[#0F172A]">

      {/* BACKGROUND */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-[#D4AF37]/10 rounded-full blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-[#0F172A]/5 rounded-full blur-3xl" />

      </div>

      {/* CONTENT */}

      <div className="relative max-w-7xl mx-auto px-4 py-10 md:px-6 md:py-16">

        {/* RETURN */}

        {

          recalibrationMode && (

            <div className="flex justify-end mb-8">

              <a

                href="/dashboard"

                className="text-sm text-[#94A3B8] hover:text-[#0F172A] transition-all"

              >

                Return to Dashboard

              </a>

            </div>

          )

        }

        {/* HERO */}

        <div className="max-w-4xl">

          <p className="text-[11px] uppercase tracking-[0.35em] text-[#94A3B8] font-medium">

            {

              recalibrationMode

                ?

                "IDENTITY RECALIBRATION"

                :

                "DEVELOPMENT ONBOARDING"

            }

          </p>

          <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-none text-[#0F172A]">

            {

              recalibrationMode

                ?

                "Build the person your future requires."

                :

                "Discover the trajectory your future may require."

            }

          </h1>

          <p className="mt-8 text-lg leading-relaxed text-[#475569] max-w-3xl">

            PipuPath adapts to how you think, grow, execute and build your future.

          </p>

        </div>

        {/* QUESTIONS */}

        {

          !recalibrationMode && (

            <div className="grid lg:grid-cols-3 gap-6 mt-10">

              {/* FUTURE */}

              <div className="rounded-[36px] border border-[#E2E8F0] bg-white/80 backdrop-blur-xl p-6">

                <p className="text-xs uppercase tracking-[0.3em] text-[#94A3B8]">

                  Future Vision

                </p>

                <textarea

                  rows={5}

                  value={futureVision}

                  onChange={(e) =>
                    setFutureVision(
                      e.target.value
                    )
                  }

                  placeholder="What kind of future are you trying to build?"

                  className="mt-5 w-full bg-transparent outline-none resize-none text-[#475569] leading-relaxed"

                />

              </div>

              {/* FOCUS */}

              <div className="rounded-[36px] border border-[#E2E8F0] bg-white/80 backdrop-blur-xl p-6">

                <p className="text-xs uppercase tracking-[0.3em] text-[#94A3B8]">

                  Current Focus

                </p>

                <textarea

                  rows={5}

                  value={currentFocus}

                  onChange={(e) =>
                    setCurrentFocus(
                      e.target.value
                    )
                  }

                  placeholder="What are you currently trying to improve or build?"

                  className="mt-5 w-full bg-transparent outline-none resize-none text-[#475569] leading-relaxed"

                />

              </div>

              {/* STRUGGLE */}

              <div className="rounded-[36px] border border-[#E2E8F0] bg-white/80 backdrop-blur-xl p-6">

                <p className="text-xs uppercase tracking-[0.3em] text-[#94A3B8]">

                  Current Friction

                </p>

                <textarea

                  rows={5}

                  value={currentStruggle}

                  onChange={(e) =>
                    setCurrentStruggle(
                      e.target.value
                    )
                  }

                  placeholder="What keeps slowing you down or holding you back?"

                  className="mt-5 w-full bg-transparent outline-none resize-none text-[#475569] leading-relaxed"

                />

              </div>

            </div>

          )

        }

        {/* ARCHETYPES */}

        <div className="grid lg:grid-cols-2 gap-6 mt-14">

          {

            ARCHETYPES.map((archetype) => {

              const active =

                selectedArchetype?.id ===
                archetype.id;

              return (

                <button

                  key={archetype.id}

                  onClick={() =>
                    setSelectedArchetype(
                      archetype
                    )
                  }

                  className={`

text-left
rounded-[36px]
p-8
transition-all
duration-500
border

${

  active

    ?

    "bg-[#0F172A] text-white border-[#0F172A] shadow-[0_10px_60px_rgba(15,23,42,0.15)] scale-[1.01]"

    :

    "bg-white/80 border-[#E2E8F0] hover:bg-white hover:scale-[1.01]"

}

`}

                >

                  <div className="flex items-start justify-between gap-6">

                    <div>

                      <p className={`

text-xs
uppercase
tracking-[0.3em]

${

  active

    ?

    "text-white/40"

    :

    "text-[#94A3B8]"

}

`}>

                        Development Profile

                      </p>

                      <h2 className="mt-5 text-4xl font-semibold tracking-tight">

                        {archetype.title}

                      </h2>

                    </div>

                    {

                      active && (

                        <div className="w-4 h-4 rounded-full bg-[#D4AF37]" />

                      )

                    }

                  </div>

                  <p className={`

mt-8
leading-relaxed
text-lg

${

  active

    ?

    "text-white/75"

    :

    "text-[#475569]"

}

`}>

                    {archetype.description}

                  </p>

                </button>

              );

            })

          }

        </div>

        {/* COMPLETE */}

        <button

          onClick={
            handleComplete
          }

          disabled={
            !selectedArchetype ||
            loadingState
          }

          className="mt-10 px-8 py-5 rounded-[24px] bg-[#0F172A] text-white text-lg font-medium hover:opacity-90 transition-all disabled:opacity-40"

        >

          {

            loadingState

              ?

              "Updating Development Environment..."

              :

              recalibrationMode

                ?

                "Activate Updated Path"

                :

                "Initialize Development OS"

          }

        </button>

      </div>

    </main>

  );

}