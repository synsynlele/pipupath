"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "../../context/AuthContext";

import { getReflectionHistory }
from "../../lib/reflections";

export default function ReflectionsPage() {

  const router = useRouter();

  const { user, loading } = useAuth();

  const [history, setHistory] =
    useState([]);

  const [loadingHistory,
    setLoadingHistory] =
    useState(true);

  // Redirect unauthenticated users
  useEffect(() => {

    if (!loading && !user) {

      router.push("/login");
    }

  }, [user, loading, router]);

  // Load reflection history
  useEffect(() => {

    async function loadHistory() {

      if (!user) return;

      setLoadingHistory(true);

      try {

        const data =
          await getReflectionHistory();

        setHistory(data || []);

      } catch (error) {

        console.error(error);

      } finally {

        setLoadingHistory(false);
      }
    }

    loadHistory();

  }, [user]);

  function formatDate(dateString) {

    const date =
      new Date(dateString);

    return date.toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  }

  function getEnergyColor(score) {

    if (score >= 8)
      return "bg-emerald-500";

    if (score >= 5)
      return "bg-amber-400";

    return "bg-rose-400";
  }

  function getConsistencyColor(score) {

    if (score >= 8)
      return "bg-sky-500";

    if (score >= 5)
      return "bg-indigo-400";

    return "bg-slate-300";
  }

  // Loading state
  if (loading || !user) {

    return (

      <main className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-6">

        <div className="flex flex-col items-center gap-5">

          <div className="w-14 h-14 rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37] animate-spin" />

          <p className="text-[#64748B] text-sm tracking-wide">
            Loading reflections...
          </p>

        </div>

      </main>
    );
  }

  return (

    <main className="min-h-screen bg-[#F5F7FA] overflow-x-hidden text-[#0F172A]">

      {/* Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-[#D4AF37]/10 rounded-full blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-[#0F172A]/5 rounded-full blur-3xl" />

      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-6 md:px-6 md:py-8">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">

          <div>

            <p className="text-[11px] uppercase tracking-[0.35em] text-[#94A3B8] font-medium">
              Reflection Archive
            </p>

            <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight leading-none text-[#0F172A]">
              Your evolution
              <br />
              timeline.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#475569]">

              Reflection transforms experience into behavioral intelligence.

            </p>

          </div>

          <button
            onClick={() =>
              router.push("/dashboard")
            }
            className="border border-[#E2E8F0] bg-white/80 backdrop-blur-sm text-[#0F172A] px-5 py-3 rounded-2xl text-sm font-medium hover:bg-white transition-all duration-300"
          >
            Dashboard
          </button>

        </div>

        {/* Timeline */}
        <div className="mt-12">

          {loadingHistory ? (

            <div className="flex flex-col items-center justify-center py-20">

              <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37] animate-spin" />

              <p className="mt-5 text-[#64748B]">
                Building your timeline...
              </p>

            </div>

          ) : history.length === 0 ? (

            <div className="rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-xl p-10 text-center shadow-[0_10px_50px_rgba(15,23,42,0.05)]">

              <p className="text-sm uppercase tracking-[0.25em] text-[#94A3B8]">
                No Reflections Yet
              </p>

              <h2 className="mt-5 text-3xl font-semibold text-[#0F172A]">
                Your story begins with action.
              </h2>

              <p className="mt-5 text-[#475569] leading-relaxed max-w-lg mx-auto">

                Complete missions consistently and your behavioral timeline will begin evolving here.

              </p>

              <button
                onClick={() =>
                  router.push("/dashboard")
                }
                className="mt-8 rounded-3xl bg-[#0F172A] text-white px-6 py-4 text-sm font-medium hover:opacity-95 transition-all duration-300"
              >
                Return to Dashboard
              </button>

            </div>

          ) : (

            <div className="relative">

              {/* Timeline Line */}
              <div className="absolute left-[18px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#D4AF37]/40 via-[#CBD5E1] to-transparent" />

              <div className="space-y-8">

                {history.map((item, index) => (

                  <div
                    key={item.id || index}
                    className="relative pl-12"
                  >

                    {/* Timeline Dot */}
                    <div className="absolute left-[8px] top-8 w-5 h-5 rounded-full border-4 border-[#F5F7FA] bg-[#D4AF37] shadow-lg" />

                    {/* Reflection Card */}
                    <div className="rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-xl p-6 md:p-8 shadow-[0_10px_50px_rgba(15,23,42,0.05)] transition-all duration-300 hover:translate-y-[-2px]">

                      {/* Top Meta */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        <div>

                          <p className="text-xs uppercase tracking-[0.25em] text-[#94A3B8]">
                            Mission
                          </p>

                          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#0F172A] leading-tight">

                            {item.mission_text ||
                              "Mission"}

                          </h2>

                        </div>

                        <div className="text-sm text-[#64748B]">

                          {formatDate(
                            item.created_at
                          )}

                        </div>

                      </div>

                      {/* Reflection */}
                      <div className="mt-8">

                        <p className="text-xs uppercase tracking-[0.25em] text-[#94A3B8]">
                          Reflection
                        </p>

                        <p className="mt-4 text-[16px] leading-relaxed text-[#334155] whitespace-pre-wrap">

                          {item.reflection_text ||
                            "No reflection saved."}

                        </p>

                      </div>

                      {/* AI Insight */}
                      {item.ai_summary && (

                        <div className="mt-8 rounded-3xl border border-[#FDE68A]/30 bg-gradient-to-br from-[#FEFCE8] to-[#FFFBEB] p-6">

                          <p className="text-xs uppercase tracking-[0.25em] text-[#92400E]">
                            AI Insight
                          </p>

                          <p className="mt-4 text-[#78350F] leading-relaxed whitespace-pre-wrap">

                            {item.ai_summary}

                          </p>

                        </div>
                      )}

                      {/* Behavioral Indicators */}
                      <div className="mt-8 grid md:grid-cols-3 gap-4">

                        {/* Energy */}
                        <div className="rounded-3xl border border-[#E2E8F0] bg-[#FAFAFA] p-5">

                          <p className="text-xs uppercase tracking-[0.2em] text-[#94A3B8]">
                            Energy
                          </p>

                          <div className="mt-4 flex items-center gap-3">

                            <div
                              className={`w-3 h-3 rounded-full ${getEnergyColor(item.ai_energy_score)}`}
                            />

                            <span className="text-2xl font-semibold text-[#0F172A]">

                              {item.ai_energy_score || 0}/10

                            </span>

                          </div>

                        </div>

                        {/* Consistency */}
                        <div className="rounded-3xl border border-[#E2E8F0] bg-[#FAFAFA] p-5">

                          <p className="text-xs uppercase tracking-[0.2em] text-[#94A3B8]">
                            Consistency
                          </p>

                          <div className="mt-4 flex items-center gap-3">

                            <div
                              className={`w-3 h-3 rounded-full ${getConsistencyColor(item.ai_consistency_score)}`}
                            />

                            <span className="text-2xl font-semibold text-[#0F172A]">

                              {item.ai_consistency_score || 0}/10

                            </span>

                          </div>

                        </div>

                        {/* XP */}
                        <div className="rounded-3xl border border-[#E2E8F0] bg-[#FAFAFA] p-5">

                          <p className="text-xs uppercase tracking-[0.2em] text-[#94A3B8]">
                            XP Earned
                          </p>

                          <div className="mt-4">

                            <span className="text-2xl font-semibold text-[#0F172A]">

                              +{item.xp_earned || 0}

                            </span>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          )}

        </div>

      </div>

    </main>
  );
}