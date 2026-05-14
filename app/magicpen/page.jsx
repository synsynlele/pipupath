"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState }
from "react";

import Navigation
from "../../components/Navigation";

import {

  saveMagicEntry,

  getMagicEntries,

  updateMagicEntry,

} from "../../lib/magicpen";

import {
  storeMemory
}
from "../../lib/memory/storeMemory";

const THINKING_PROMPTS = [

  "What kind of future would feel meaningful enough to dedicate your life to?",

  "What capability would most transform your future if mastered deeply?",

  "Where are you underestimating your potential because of fear or uncertainty?",

  "What problem in the world feels important enough for you to help solve?",

  "What kind of person would your future self respect?",

  "What ambition feels too large to say out loud?",

  "What keeps repeating in your thinking lately and why?",

  "What tension currently exists between your potential and your behavior?",

];

export default function MagicPenPage() {

  // =========================
  // STATE
  // =========================

  const [entries, setEntries] =
    useState([]);

  const [
    selectedEntry,
    setSelectedEntry,
  ] = useState(null);

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [
    lastSaved,
    setLastSaved,
  ] = useState(null);

  const [
    activePrompt,
    setActivePrompt,
  ] = useState("");

  const [
    cognitiveInsight,
    setCognitiveInsight,
  ] = useState("");

  const [
    cognitiveState,
    setCognitiveState,
  ] = useState("");

  const [
    clarityScore,
    setClarityScore,
  ] = useState(0);

  const [
    generatingInsight,
    setGeneratingInsight,
  ] = useState(false);

  // =========================
  // LOAD
  // =========================

  useEffect(() => {

    async function loadEntries() {

      try {

        const data =
          await getMagicEntries();

        setEntries(data);

      }

      catch (error) {

        console.error(error);

      }

      finally {

        setLoading(false);

      }

    }

    loadEntries();

    // =========================
    // RANDOM PROMPT
    // =========================

    const randomPrompt =

      THINKING_PROMPTS[

        Math.floor(
          Math.random() *
          THINKING_PROMPTS.length
        )

      ];

    setActivePrompt(
      randomPrompt
    );

  }, []);

  // =========================
  // AUTO SAVE
  // =========================

  useEffect(() => {

    if (
      !content.trim()
    ) return;

    const timeout =
      setTimeout(() => {

        handleAutoSave();

      }, 2500);

    return () =>
      clearTimeout(timeout);

  }, [content, title]);

  // =========================
  // COGNITIVE ANALYSIS
  // =========================

  async function generateCognitiveInsight() {

    if (
      !content.trim()
    ) return;

    try {

      setGeneratingInsight(
        true
      );

      const response =
        await fetch(

          "/api/cognitive",

          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

            },

            body:
              JSON.stringify({

                writing:
                  content,

                archetype:
                  "Builder",

              }),

          }

        );

      const data =
        await response.json();

      const insight =

        data?.insight ||

        "Your thinking suggests tension between ambition and clarity. Greater specificity may unlock stronger execution momentum.";

      setCognitiveInsight(
        insight
      );

      // =========================
      // SYNTHETIC CLARITY
      // =========================

      const syntheticClarity =

        Math.min(

          10,

          Math.max(

            3,

            Math.floor(

              content.length / 220

            )

          )

        );

      setClarityScore(
        syntheticClarity
      );

      // =========================
      // COGNITIVE STATE
      // =========================

      let state =
        "Strategic Reflection";

      if (
        content.length > 1200
      ) {

        state =
          "Deep Cognitive Processing";

      }

      if (
        content.includes("?")
      ) {

        state =
          "Exploratory Thinking";

      }

      if (
        content.toLowerCase().includes(
          "future"
        )
      ) {

        state =
          "Future-Oriented Expansion";

      }

      setCognitiveState(
        state
      );

      // =========================
      // MEMORY
      // =========================

      await storeMemory({

        userId:
          selectedEntry?.user_id,

        memoryType:
          "magicpen_signal",

        content:
          insight,

        importance:

          syntheticClarity >= 8

            ?

            5

            :

            3,

      });

    }

    catch (error) {

      console.error(error);

    }

    finally {

      setGeneratingInsight(
        false
      );

    }

  }

  // =========================
  // AUTO SAVE FUNCTION
  // =========================

  async function handleAutoSave() {

    try {

      setSaving(true);

      // =========================
      // UPDATE
      // =========================

      if (
        selectedEntry?.id
      ) {

        const updated =
          await updateMagicEntry({

            id:
              selectedEntry.id,

            title:
              title ||
              "Untitled Thinking Session",

            content,

            aiSummary:
              cognitiveInsight,

            aiClarityScore:
              clarityScore,

            aiEmotionalState:
              cognitiveState,

          });

        setSelectedEntry(
          updated
        );

      }

      else {

        // =========================
        // CREATE
        // =========================

        const saved =
          await saveMagicEntry({

            title:
              title ||
              "Untitled Thinking Session",

            content,

            aiSummary:
              cognitiveInsight,

            aiClarityScore:
              clarityScore,

            aiEmotionalState:
              cognitiveState,

          });

        setSelectedEntry(
          saved
        );

        setEntries((prev) => {

          const filtered =
            prev.filter(
              (item) =>
                item.id !== saved.id
            );

          return [
            saved,
            ...filtered,
          ];

        });

      }

      setLastSaved(
        new Date()
      );

    }

    catch (error) {

      console.error(error);

    }

    finally {

      setSaving(false);

    }

  }

  // =========================
  // OPEN ENTRY
  // =========================

  function openEntry(entry) {

    setSelectedEntry(
      entry
    );

    setTitle(
      entry.title || ""
    );

    setContent(
      entry.content || ""
    );

    setCognitiveInsight(
      entry.ai_summary || ""
    );

    setClarityScore(
      entry.ai_clarity_score || 0
    );

    setCognitiveState(
      entry.ai_emotional_state || ""
    );

  }

  return (

    <main className="min-h-screen bg-[#F5F7FA] overflow-x-hidden text-[#0F172A]">

      <Navigation />

      {/* BACKGROUND */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-[#D4AF37]/10 rounded-full blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-[#0F172A]/5 rounded-full blur-3xl" />

      </div>

      {/* CONTENT */}

      <div className="relative max-w-7xl mx-auto px-4 py-8 md:px-6 md:py-10">

        {/* HEADER */}

        <div className="max-w-4xl">

  <p className="text-[11px] uppercase tracking-[0.35em] text-[#94A3B8] font-medium">

    MagicPen

  </p>

  <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-none text-[#0F172A]">

    Your MagicPen

  </h1>

  <p className="mt-8 text-lg leading-relaxed text-[#475569] max-w-3xl">

    Capture thoughts, sharpen understanding, process difficult ideas and expand strategic awareness through deliberate cognitive exploration.

  </p>

</div>

        {/* GRID */}

        <div className="grid lg:grid-cols-[320px_1fr] gap-6 mt-12">

          {/* SIDEBAR */}

          <div className="space-y-5">

            {/* THINKING PROMPT */}

            <div className="rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-xl p-6 shadow-[0_10px_50px_rgba(15,23,42,0.05)]">

              <p className="text-xs uppercase tracking-[0.25em] text-[#94A3B8]">

                Expansion Prompt

              </p>

              <p className="mt-5 text-lg leading-relaxed text-[#0F172A]">

                {activePrompt}

              </p>

            </div>

            {/* SESSIONS */}

            <div className="rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-xl p-5 shadow-[0_10px_50px_rgba(15,23,42,0.05)]">

              <div className="flex items-center justify-between">

                <p className="text-xs uppercase tracking-[0.25em] text-[#94A3B8]">

                  Thinking Sessions

                </p>

                <button

                  onClick={() => {

                    setSelectedEntry(
                      null
                    );

                    setTitle("");

                    setContent("");

                    setCognitiveInsight("");

                  }}

                  className="text-sm text-[#64748B] hover:text-[#0F172A]"

                >

                  New

                </button>

              </div>

              <div className="mt-5 space-y-3 max-h-[500px] overflow-y-auto pr-1">

                {

                  loading

                    ?

                    (

                      <p className="text-sm text-[#64748B]">

                        Loading...

                      </p>

                    )

                    :

                  entries.length === 0

                    ?

                    (

                      <p className="text-sm text-[#64748B] leading-relaxed">

                        Your strategic thinking sessions will appear here.

                      </p>

                    )

                    :

                    (

                      entries.map((entry) => (

                        <button

                          key={entry.id}

                          onClick={() =>
                            openEntry(entry)
                          }

                          className="w-full text-left rounded-2xl border border-[#E2E8F0] bg-[#FAFAFA] p-4 hover:bg-white transition-all duration-300"

                        >

                          <p className="font-medium text-[#0F172A] truncate">

                            {

                              entry.title ||

                              "Untitled Session"

                            }

                          </p>

                          <p className="mt-2 text-sm text-[#64748B] line-clamp-2">

                            {entry.content}

                          </p>

                        </button>

                      ))

                    )

                }

              </div>

            </div>

          </div>

          {/* MAIN */}

          <div className="space-y-6">

            {/* EDITOR */}

            <div className="rounded-[40px] border border-white/60 bg-white/85 backdrop-blur-xl p-6 md:p-8 shadow-[0_10px_60px_rgba(15,23,42,0.06)]">

              {/* TOP */}

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <input

                  type="text"

                  placeholder="Untitled Thinking Session"

                  value={title}

                  onChange={(e) =>
                    setTitle(
                      e.target.value
                    )
                  }

                  className="bg-transparent text-3xl md:text-4xl font-semibold tracking-tight text-[#0F172A] outline-none placeholder:text-[#94A3B8] w-full"

                />

                <div className="text-sm text-[#64748B]">

                  {

                    saving

                      ?

                      "Saving..."

                      :

                    lastSaved

                      ?

                      "Saved"

                      :

                      "Not saved"

                  }

                </div>

              </div>

              {/* TEXTAREA */}

              <textarea

                value={content}

                onChange={(e) =>
                  setContent(
                    e.target.value
                  )
                }

                placeholder="Explore ideas, direction, ambition, conflict, strategy or possibility..."

                className="mt-8 w-full min-h-[500px] bg-transparent resize-none outline-none text-[18px] leading-[1.9] text-[#334155] placeholder:text-[#94A3B8]"

              />

              {/* BUTTON */}

              <button

                onClick={
                  generateCognitiveInsight
                }

                disabled={
                  generatingInsight
                }

                className="mt-8 px-6 py-4 rounded-2xl bg-[#0F172A] text-white font-medium hover:opacity-90 transition-all disabled:opacity-50"

              >

                {

                  generatingInsight

                    ?

                    "Expanding Thinking..."

                    :

                    "Expand Thinking"

                }

              </button>

            </div>

            {/* COGNITIVE INSIGHT */}

            <div className="rounded-[32px] border border-[#FDE68A]/30 bg-gradient-to-br from-[#FEFCE8] to-[#FFFBEB] p-6 md:p-7 shadow-[0_10px_50px_rgba(15,23,42,0.04)]">

              <p className="text-xs uppercase tracking-[0.25em] text-[#92400E]">

                Cognitive Expansion

              </p>

              <p className="mt-5 text-[#78350F] leading-relaxed text-lg">

                {

                  cognitiveInsight ||

                  "Write deeply and the system will begin expanding your thinking, exposing patterns and sharpening strategic clarity."

                }

              </p>

              {/* GRID */}

              <div className="grid md:grid-cols-2 gap-4 mt-6">

                <div className="rounded-2xl bg-white/60 p-5">

                  <p className="text-xs uppercase tracking-[0.2em] text-[#92400E]">

                    Clarity Level

                  </p>

                  <p className="mt-3 text-3xl font-semibold text-[#78350F]">

                    {clarityScore}/10

                  </p>

                </div>

                <div className="rounded-2xl bg-white/60 p-5">

                  <p className="text-xs uppercase tracking-[0.2em] text-[#92400E]">

                    Thinking State

                  </p>

                  <p className="mt-3 text-2xl font-semibold text-[#78350F]">

                    {

                      cognitiveState ||

                      "Strategic Reflection"

                    }

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}