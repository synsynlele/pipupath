"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState }
from "react";

import Navigation
from "../../components/Navigation";

import { useAuth }
from "../../context/AuthContext";

import { supabase }
from "../../lib/supabase";

export default function GuidePage() {

  const {
    user,
  } = useAuth();

  // =========================
  // STATE
  // =========================

  const [
    profile,
    setProfile,
  ] = useState(null);

  const [
    strategicState,
    setStrategicState,
  ] = useState("");

  const [
    strategicInsight,
    setStrategicInsight,
  ] = useState("");

  const [
    executionPressure,
    setExecutionPressure,
  ] = useState("");

  const [
    growthDirective,
    setGrowthDirective,
  ] = useState("");

  // =========================
  // LOAD PROFILE
  // =========================

  useEffect(() => {

    async function loadProfile() {

      if (!user) return;

      const {
        data,
        error,
      } = await supabase

        .from("profiles")

        .select("*")

        .eq(
          "id",
          user.id
        )

        .single();

      if (error) {

        console.error(error);

        return;

      }

      setProfile(data);

      // =========================
      // STRATEGIC STATES
      // =========================

      const streak =
        data?.streak || 0;

      const momentum =
        data?.momentum || 0;

      const archetype =
        data?.archetype || "Builder";

      // =========================
      // BUILDER
      // =========================

      if (
        archetype === "Builder"
      ) {

        setStrategicState(
          "Capability Expansion"
        );

        setStrategicInsight(

          "Your current trajectory suggests strong potential for long-term capability growth, but your future advantage will depend on consistency rather than intensity. The next phase of your development requires structured execution, deeper focus and deliberate skill accumulation."

        );

        setExecutionPressure(

          "Avoid passive consumption. Your current stage demands creation, structured learning and measurable output."

        );

        setGrowthDirective(

          "Spend the next 7 days building something tangible, however small. Train execution momentum rather than waiting for perfect clarity."

        );

      }

      // =========================
      // LEADER
      // =========================

      if (
        archetype === "Leader"
      ) {

        setStrategicState(
          "Responsibility Expansion"
        );

        setStrategicInsight(

          "Your trajectory suggests increasing leadership capacity, but leadership is built through responsibility under pressure rather than status. Your next stage requires greater initiative, clearer decision-making and stronger execution reliability."

        );

        setExecutionPressure(

          "Do not wait for permission to create structure. Begin organizing difficult things proactively."

        );

        setGrowthDirective(

          "Within the next 72 hours, initiate one responsibility, project or difficult conversation that others usually avoid."

        );

      }

      // =========================
      // EXPLORER
      // =========================

      if (
        archetype === "Explorer"
      ) {

        setStrategicState(
          "Directional Discovery"
        );

        setStrategicInsight(

          "Your thinking patterns suggest expanding curiosity and future possibility, but exploration without structure can become avoidance. Your next stage requires converting curiosity into tested experience and real-world movement."

        );

        setExecutionPressure(

          "Do not remain trapped inside endless possibility analysis. Exploration must produce exposure and action."

        );

        setGrowthDirective(

          "Before the end of this week, deeply investigate one path, industry or skill by speaking with real practitioners or studying actual execution environments."

        );

      }

      // =========================
      // LOW MOMENTUM
      // =========================

      if (
        streak <= 2
      ) {

        setExecutionPressure(

          "Your current challenge is not potential. It is execution consistency. Rebuild movement immediately through smaller but unavoidable actions."

        );

      }

      // =========================
      // HIGH MOMENTUM
      // =========================

      if (
        streak >= 7
      ) {

        setGrowthDirective(

          "Your momentum is increasing. This is the correct time to pursue more difficult responsibilities and longer-term strategic projects."

        );

      }

    }

    loadProfile();

  }, [user]);

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

        {/* HERO */}

        <div>

          <p className="text-[11px] uppercase tracking-[0.35em] text-[#94A3B8] font-medium">

            Strategic Direction Engine

          </p>

          <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-none text-[#0F172A]">

            Build clarity.
            <br />
            Increase capability.
            <br />
            Execute deliberately.

          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[#475569]">

            Guide interprets your behavioral trajectory and helps you sharpen direction, strengthen execution and develop long-term strategic identity.

          </p>

        </div>

        {/* GRID */}

        <div className="grid lg:grid-cols-3 gap-6 mt-14">

          {/* STATE */}

          <div className="rounded-[40px] bg-[#0F172A] text-white p-8 shadow-[0_10px_60px_rgba(15,23,42,0.12)]">

            <p className="text-xs uppercase tracking-[0.3em] text-white/40">

              Current Strategic State

            </p>

            <h2 className="mt-6 text-4xl font-semibold leading-tight">

              {strategicState}

            </h2>

            <p className="mt-8 text-white/75 leading-relaxed">

              {strategicInsight}

            </p>

          </div>

          {/* EXECUTION */}

          <div className="rounded-[40px] border border-[#E2E8F0] bg-white/80 backdrop-blur-xl p-8 shadow-[0_10px_60px_rgba(15,23,42,0.05)]">

            <p className="text-xs uppercase tracking-[0.3em] text-[#94A3B8]">

              Execution Pressure

            </p>

            <h2 className="mt-6 text-4xl font-semibold leading-tight text-[#0F172A]">

              Strategic Tension

            </h2>

            <p className="mt-8 text-[#475569] leading-relaxed">

              {executionPressure}

            </p>

          </div>

          {/* DIRECTIVE */}

          <div className="rounded-[40px] border border-[#FDE68A]/30 bg-gradient-to-br from-[#FEFCE8] to-[#FFFBEB] p-8 shadow-[0_10px_60px_rgba(15,23,42,0.05)]">

            <p className="text-xs uppercase tracking-[0.3em] text-[#92400E]">

              Growth Directive

            </p>

            <h2 className="mt-6 text-4xl font-semibold leading-tight text-[#78350F]">

              Your next move.

            </h2>

            <p className="mt-8 text-[#78350F] leading-relaxed">

              {growthDirective}

            </p>

          </div>

        </div>

        {/* STRATEGIC NOTE */}

        <div className="mt-8 rounded-[40px] border border-[#E2E8F0] bg-white/80 backdrop-blur-xl p-8 shadow-[0_10px_50px_rgba(15,23,42,0.04)]">

          <p className="text-xs uppercase tracking-[0.3em] text-[#94A3B8]">

            Development Philosophy

          </p>

          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-[#475569]">

            Your future will not be built by motivation alone. Long-term advantage is created through clarity, capability accumulation, strategic thinking, disciplined execution and meaningful responsibility over time.

          </p>

        </div>

      </div>

    </main>

  );

}