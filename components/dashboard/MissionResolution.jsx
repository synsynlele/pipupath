"use client";

export default function MissionResolution({

  onResolve,

  loading,

}) {

  return (

    <div className="mt-6 rounded-[32px] border border-[#E2E8F0] bg-[#F8FAFC] p-6">

      <p className="text-xs uppercase tracking-[0.25em] text-[#94A3B8]">

        Mission Resolution

      </p>

      <h3 className="mt-4 text-2xl font-semibold text-[#0F172A]">

        How did you respond to the mission?

      </h3>

      <p className="mt-3 text-[#475569] leading-relaxed">

        Development is shaped by your relationship with execution, resistance and consistency over time.

      </p>

      {/* BUTTONS */}

      <div className="grid md:grid-cols-3 gap-4 mt-6">

        {/* COMPLETE */}

        <button

          disabled={loading}

          onClick={() =>
            onResolve(
              "mission_completion"
            )
          }

          className="rounded-3xl bg-[#0F172A] text-white p-5 text-left hover:opacity-90 transition-all"

        >

          <p className="text-sm uppercase tracking-[0.2em] text-white/40">

            Completed

          </p>

          <p className="mt-4 text-lg font-semibold">

            I executed fully.

          </p>

        </button>

        {/* PARTIAL */}

        <button

          disabled={loading}

          onClick={() =>
            onResolve(
              "mission_partial"
            )
          }

          className="rounded-3xl border border-[#E2E8F0] bg-white p-5 text-left hover:bg-[#FAFAFA] transition-all"

        >

          <p className="text-sm uppercase tracking-[0.2em] text-[#94A3B8]">

            Partial

          </p>

          <p className="mt-4 text-lg font-semibold text-[#0F172A]">

            I moved, but incompletely.

          </p>

        </button>

        {/* RESISTED */}

        <button

          disabled={loading}

          onClick={() =>
            onResolve(
              "mission_struggle"
            )
          }

          className="rounded-3xl border border-[#FECACA] bg-[#FEF2F2] p-5 text-left hover:opacity-90 transition-all"

        >

          <p className="text-sm uppercase tracking-[0.2em] text-[#B91C1C]">

            Resistance

          </p>

          <p className="mt-4 text-lg font-semibold text-[#7F1D1D]">

            I avoided the mission.

          </p>

        </button>

      </div>

      {/* NEXT MISSION */}

      <div className="mt-8">

        <button

          disabled={loading}

          onClick={() =>
            onResolve(
              "generate_next"
            )
          }

          className="w-full rounded-3xl bg-[#D4AF37] text-[#0F172A] px-6 py-5 font-semibold hover:opacity-90 transition-all"

        >

          Generate Next Mission

        </button>

      </div>

    </div>

  );

}