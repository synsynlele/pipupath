"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState }
from "react";

import Navigation
from "../../components/Navigation";

import { useRouter }
from "next/navigation";

const GUIDE_INSIGHTS = [

  {
    title:
      "Reduce cognitive overload",

    message:
      "Your growth accelerates when your focus narrows. Simplify your priorities today.",

    type:
      "Clarity",
  },

  {
    title:
      "Momentum matters more than intensity",

    message:
      "Sustainable movement creates deeper transformation than emotional bursts of motivation.",

    type:
      "Momentum",
  },

  {
    title:
      "Reflection without action becomes stagnation",

    message:
      "Convert one insight into immediate behavioral movement today.",

    type:
      "Execution",
  },

  {
    title:
      "Rest can be strategic",

    message:
      "Mental exhaustion reduces alignment, clarity and decision quality.",

    type:
      "Recovery",
  },

];

export default function GuidePage() {

  const router = useRouter();

  const [selectedInsight,
    setSelectedInsight] =
    useState(null);

  const [challenge,
    setChallenge] =
    useState("");

  const [emotionalState,
    setEmotionalState] =
    useState("");

  const [contactMethod,
    setContactMethod] =
    useState("WhatsApp");

  useEffect(() => {

    const randomInsight =

      GUIDE_INSIGHTS[
        Math.floor(
          Math.random() *
          GUIDE_INSIGHTS.length
        )
      ];

    setSelectedInsight(
      randomInsight
    );

  }, []);

  // =========================
  // WHATSAPP ESCALATION
  // =========================

  function requestWhatsAppGuide() {

    const phone =
      "2340000000000";

    const message =
      `Hello Guide Team,%0A%0A` +

      `I would like personal guidance.%0A%0A` +

      `Current Emotional State: ${emotionalState || "Not specified"}%0A%0A` +

      `Current Challenge:%0A${challenge || "No details provided"}%0A%0A` +

      `Sent from Behavioral OS Guide System.`;

    window.open(

      `https://wa.me/${phone}?text=${message}`,

      "_blank"
    );
  }

  // =========================
  // EMAIL ESCALATION
  // =========================

  function requestEmailGuide() {

    const email =
      "guide@yourplatform.com";

    const subject =
      encodeURIComponent(
        "Guidance Request"
      );

    const body =
      encodeURIComponent(

        `Hello Guide Team,

I would like personal guidance.

Current Emotional State:
${emotionalState || "Not specified"}

Current Challenge:
${challenge || "No details provided"}

Sent from Behavioral OS Guide System.`
      );

    window.location.href =
      `mailto:${email}?subject=${subject}&body=${body}`;
  }

  return (

    <main className="min-h-screen bg-[#F5F7FA] overflow-x-hidden text-[#0F172A]">

      <Navigation />

      {/* Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-[#D4AF37]/10 rounded-full blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-[#0F172A]/5 rounded-full blur-3xl" />

      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-8 md:px-6 md:py-10">

        {/* Header */}
        <div>

          <p className="text-[11px] uppercase tracking-[0.35em] text-[#94A3B8] font-medium">
            Guide System
          </p>

          <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-none text-[#0F172A]">

            Direction.
            <br />
            Clarity.
            <br />
            Alignment.

          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#475569]">

            Guide helps stabilize your thinking, restore clarity and support intentional growth.

          </p>

        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mt-12">

          {/* LEFT COLUMN */}
          <div className="space-y-6">

            {/* Behavioral State */}
            <div className="rounded-[36px] bg-[#0F172A] text-white p-8 shadow-[0_10px_60px_rgba(15,23,42,0.15)]">

              <p className="text-xs uppercase tracking-[0.25em] text-white/50">
                Current Behavioral State
              </p>

              <h2 className="mt-6 text-4xl font-semibold tracking-tight leading-tight">

                Reflective Processing

              </h2>

              <p className="mt-6 text-white/70 leading-relaxed">

                Your recent behavioral activity suggests active internal processing and cognitive evaluation.

              </p>

            </div>

            {/* Adaptive Insight */}
            <div className="rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-xl p-7 shadow-[0_10px_50px_rgba(15,23,42,0.05)]">

              <div className="flex items-center justify-between">

                <p className="text-xs uppercase tracking-[0.25em] text-[#94A3B8]">
                  Adaptive Insight
                </p>

                <span className="text-xs px-3 py-1 rounded-full bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]">

                  {selectedInsight?.type}

                </span>

              </div>

              <h3 className="mt-6 text-3xl font-semibold tracking-tight leading-tight text-[#0F172A]">

                {selectedInsight?.title}

              </h3>

              <p className="mt-6 text-[#475569] leading-relaxed">

                {selectedInsight?.message}

              </p>

            </div>

            {/* Direction Reminder */}
            <div className="rounded-[32px] border border-[#FDE68A]/30 bg-gradient-to-br from-[#FEFCE8] to-[#FFFBEB] p-7 shadow-[0_10px_50px_rgba(15,23,42,0.04)]">

              <p className="text-xs uppercase tracking-[0.25em] text-[#92400E]">
                Alignment Reminder
              </p>

              <p className="mt-5 text-xl leading-relaxed text-[#78350F]">

                Sustainable transformation is built through repeated aligned behavior, not emotional intensity.

              </p>

            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="rounded-[40px] border border-white/60 bg-white/85 backdrop-blur-xl p-7 md:p-9 shadow-[0_10px_60px_rgba(15,23,42,0.06)]">

            <p className="text-xs uppercase tracking-[0.25em] text-[#94A3B8]">
              Request Personal Guidance
            </p>

            <h2 className="mt-6 text-4xl font-semibold tracking-tight leading-tight text-[#0F172A]">

              Connect with
              a human guide.

            </h2>

            <p className="mt-6 text-[#475569] leading-relaxed">

              If you need deeper support, clarity or direction, you can request intentional human guidance.

            </p>

            {/* Emotional State */}
            <div className="mt-8">

              <label className="text-sm font-medium text-[#334155]">

                Current Emotional State

              </label>

              <select
                value={emotionalState}
                onChange={(e) =>
                  setEmotionalState(
                    e.target.value
                  )
                }
                className="mt-3 w-full rounded-2xl border border-[#E2E8F0] bg-white px-5 py-4 outline-none text-[#0F172A]"
              >

                <option value="">
                  Select emotional state
                </option>

                <option>
                  Mentally Overloaded
                </option>

                <option>
                  Burned Out
                </option>

                <option>
                  Unclear Direction
                </option>

                <option>
                  Emotionally Stuck
                </option>

                <option>
                  Seeking Clarity
                </option>

                <option>
                  Growth Focused
                </option>

              </select>

            </div>

            {/* Challenge */}
            <div className="mt-8">

              <label className="text-sm font-medium text-[#334155]">

                Describe Your Challenge

              </label>

              <textarea
                value={challenge}
                onChange={(e) =>
                  setChallenge(
                    e.target.value
                  )
                }
                placeholder="Share what you are currently navigating..."
                className="mt-3 w-full min-h-[180px] rounded-[28px] border border-[#E2E8F0] bg-white px-5 py-5 resize-none outline-none text-[#334155] leading-relaxed"
              />

            </div>

            {/* Contact Method */}
            <div className="mt-8">

              <label className="text-sm font-medium text-[#334155]">

                Preferred Contact Method

              </label>

              <div className="grid grid-cols-2 gap-4 mt-3">

                <button
                  onClick={() =>
                    setContactMethod(
                      "WhatsApp"
                    )
                  }
                  className={`rounded-2xl px-5 py-4 border transition-all duration-300

                  ${contactMethod === "WhatsApp"
                    ? "bg-[#0F172A] text-white border-[#0F172A]"
                    : "bg-white border-[#E2E8F0] text-[#64748B]"
                  }`}
                >

                  WhatsApp

                </button>

                <button
                  onClick={() =>
                    setContactMethod(
                      "Email"
                    )
                  }
                  className={`rounded-2xl px-5 py-4 border transition-all duration-300

                  ${contactMethod === "Email"
                    ? "bg-[#0F172A] text-white border-[#0F172A]"
                    : "bg-white border-[#E2E8F0] text-[#64748B]"
                  }`}
                >

                  Email

                </button>

              </div>

            </div>

            {/* CTA */}
            <div className="mt-10">

              {contactMethod ===
              "WhatsApp" ? (

                <button
                  onClick={
                    requestWhatsAppGuide
                  }
                  className="w-full rounded-[28px] bg-[#0F172A] text-white px-6 py-5 text-[15px] font-medium tracking-wide hover:opacity-95 transition-all duration-300"
                >

                  Continue via WhatsApp

                </button>

              ) : (

                <button
                  onClick={
                    requestEmailGuide
                  }
                  className="w-full rounded-[28px] bg-[#0F172A] text-white px-6 py-5 text-[15px] font-medium tracking-wide hover:opacity-95 transition-all duration-300"
                >

                  Continue via Email

                </button>

              )}

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}