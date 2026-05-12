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
  interpretMagicWriting,
}
from "../../lib/ai";

const PROMPTS = [

  "What is creating the most mental friction in your life right now?",

  "What are you avoiding that would change your future if confronted?",

  "What kind of person are you becoming through your daily behavior?",

  "What feels unclear in your thinking right now?",

  "What decision keeps repeating in your mind lately?",

  "Where are you performing instead of being authentic?",

  "What would your future self want you to focus on right now?",

];

export default function MagicPenPage() {

  const [entries, setEntries] =
    useState([]);

  const [selectedEntry,
    setSelectedEntry] =
    useState(null);

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [lastSaved,
    setLastSaved] =
    useState(null);

  const [activePrompt,
    setActivePrompt] =
    useState("");

const [aiInsight,
  setAiInsight] =
  useState("");

const [aiState,
  setAiState] =
  useState("");

const [aiClarity,
  setAiClarity] =
  useState(0);

  // =========================
  // LOAD ENTRIES
  // =========================

  useEffect(() => {

    async function loadEntries() {

      try {

        const data =
          await getMagicEntries();

        setEntries(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    }

    loadEntries();

    // Random prompt
    const randomPrompt =
      PROMPTS[
        Math.floor(
          Math.random() *
          PROMPTS.length
        )
      ];

    setActivePrompt(randomPrompt);

  }, []);

  // =========================
  // AUTO SAVE
  // =========================

  useEffect(() => {

    if (!content.trim()) return;

    const timeout =
      setTimeout(() => {

        handleAutoSave();

      }, 2000);

    return () =>
      clearTimeout(timeout);

  }, [content, title]);

  // =========================
  // AUTO SAVE FUNCTION
  // =========================

  async function handleAutoSave() {

    try {

      setSaving(true);

     const interpretation =
  await interpretMagicWriting(
    content
  );

const clarityScore =
  interpretation.clarity;

const emotionalState =
  interpretation.state;

const aiSummary =
  interpretation.insight;

setAiInsight(aiSummary);

setAiState(
  emotionalState
);

setAiClarity(
  clarityScore
);

      // UPDATE EXISTING
      if (selectedEntry?.id) {

        const updated =
          await updateMagicEntry({

            id:
              selectedEntry.id,

            title:
              title ||
              "Untitled Session",

            content,

            aiSummary,

            aiClarityScore:
              clarityScore,

            aiEmotionalState:
              emotionalState,
          });

        setSelectedEntry(
          updated
        );

      } else {

        // CREATE NEW
        const saved =
          await saveMagicEntry({

            title:
              title ||
              "Untitled Session",

            content,

            aiSummary,

            aiClarityScore:
              clarityScore,

            aiEmotionalState:
              emotionalState,
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

    } catch (error) {

      console.error(error);

    } finally {

      setSaving(false);
    }
  }

  // =========================
  // OPEN ENTRY
  // =========================

  function openEntry(entry) {

    setSelectedEntry(entry);

    setTitle(entry.title || "");

    setContent(
      entry.content || ""
    );
  }

  return (

    <main className="min-h-screen bg-[#F5F7FA] overflow-x-hidden text-[#0F172A]">

      <Navigation />

      {/* Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-[#D4AF37]/10 rounded-full blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-[#0F172A]/5 rounded-full blur-3xl" />

      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8 md:px-6 md:py-10">

        {/* Header */}
        <div>

          <p className="text-[11px] uppercase tracking-[0.35em] text-[#94A3B8] font-medium">
            MagicPen
          </p>

          <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-none text-[#0F172A]">

            Think clearly.
            <br />
            Understand deeply.

          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#475569]">

            MagicPen is your adaptive cognition environment for clarity, reflection and behavioral insight.

          </p>

        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-6 mt-12">

          {/* LEFT SIDEBAR */}
          <div className="space-y-5">

            {/* Prompt */}
            <div className="rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-xl p-6 shadow-[0_10px_50px_rgba(15,23,42,0.05)]">

              <p className="text-xs uppercase tracking-[0.25em] text-[#94A3B8]">
                Reflection Prompt
              </p>

              <p className="mt-5 text-lg leading-relaxed text-[#0F172A]">

                {activePrompt}

              </p>

            </div>

            {/* Sessions */}
            <div className="rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-xl p-5 shadow-[0_10px_50px_rgba(15,23,42,0.05)]">

              <div className="flex items-center justify-between">

                <p className="text-xs uppercase tracking-[0.25em] text-[#94A3B8]">
                  Sessions
                </p>

                <button
                  onClick={() => {

                    setSelectedEntry(
                      null
                    );

                    setTitle("");

                    setContent("");
                  }}
                  className="text-sm text-[#64748B] hover:text-[#0F172A]"
                >
                  New
                </button>

              </div>

              <div className="mt-5 space-y-3 max-h-[500px] overflow-y-auto pr-1">

                {loading ? (

                  <p className="text-sm text-[#64748B]">
                    Loading...
                  </p>

                ) : entries.length === 0 ? (

                  <p className="text-sm text-[#64748B] leading-relaxed">
                    Your thinking sessions will appear here.
                  </p>

                ) : (

                  entries.map((entry) => (

                    <button
                      key={entry.id}
                      onClick={() =>
                        openEntry(entry)
                      }
                      className="w-full text-left rounded-2xl border border-[#E2E8F0] bg-[#FAFAFA] p-4 hover:bg-white transition-all duration-300"
                    >

                      <p className="font-medium text-[#0F172A] truncate">

                        {entry.title ||
                          "Untitled Session"}

                      </p>

                      <p className="mt-2 text-sm text-[#64748B] line-clamp-2">

                        {entry.content}

                      </p>

                    </button>

                  ))

                )}

              </div>

            </div>

          </div>

          {/* WRITING AREA */}
          <div className="space-y-6">

            {/* Editor */}
            <div className="rounded-[40px] border border-white/60 bg-white/85 backdrop-blur-xl p-6 md:p-8 shadow-[0_10px_60px_rgba(15,23,42,0.06)]">

              {/* Top Bar */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <input
                  type="text"
                  placeholder="Untitled Session"
                  value={title}
                  onChange={(e) =>
                    setTitle(
                      e.target.value
                    )
                  }
                  className="bg-transparent text-3xl md:text-4xl font-semibold tracking-tight text-[#0F172A] outline-none placeholder:text-[#94A3B8] w-full"
                />

                <div className="text-sm text-[#64748B]">

                  {saving
                    ? "Saving..."
                    : lastSaved
                    ? "Saved"
                    : "Not saved"}

                </div>

              </div>

              {/* Writing Area */}
              <textarea
                value={content}
                onChange={(e) =>
                  setContent(
                    e.target.value
                  )
                }
                placeholder="Begin thinking..."
                className="mt-8 w-full min-h-[500px] bg-transparent resize-none outline-none text-[18px] leading-[1.9] text-[#334155] placeholder:text-[#94A3B8]"
              />

            </div>

            {/* AI Insight */}
            <div className="rounded-[32px] border border-[#FDE68A]/30 bg-gradient-to-br from-[#FEFCE8] to-[#FFFBEB] p-6 md:p-7 shadow-[0_10px_50px_rgba(15,23,42,0.04)]">

              <p className="text-xs uppercase tracking-[0.25em] text-[#92400E]">
                Cognitive Insight
              </p>

              <p className="mt-5 text-[#78350F] leading-relaxed">

                {aiInsight ||
  "Write deeply and the system will begin detecting behavioral patterns, emotional signals and cognitive clarity."}

              </p>

              {/* Insight Grid */}
              <div className="grid md:grid-cols-2 gap-4 mt-6">

                <div className="rounded-2xl bg-white/60 p-5">

                  <p className="text-xs uppercase tracking-[0.2em] text-[#92400E]">
                    Clarity
                  </p>

                  <p className="mt-3 text-3xl font-semibold text-[#78350F]">

                    {aiClarity}/10

                  </p>

                </div>

                <div className="rounded-2xl bg-white/60 p-5">

                  <p className="text-xs uppercase tracking-[0.2em] text-[#92400E]">
                    Cognitive State
                  </p>

                  <p className="mt-3 text-2xl font-semibold text-[#78350F]">

                    {aiState ||
  "Reflective Processing"}

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