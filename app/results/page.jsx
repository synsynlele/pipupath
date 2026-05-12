"use client";

import { useEffect, useState }
from "react";

import { useRouter }
from "next/navigation";

export default function ResultsPage() {

  const router = useRouter();

  const [data, setData] =
    useState(null);

  useEffect(() => {

    const saved =
      localStorage.getItem(
        "identityReport"
      );

    if (!saved) {

      router.push("/discover");

      return;
    }

    setData(JSON.parse(saved));

  }, [router]);

  if (!data) {

    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">

        <p className="text-gray-600">
          Loading...
        </p>

      </main>
    );
  }

  const {
    archetype,
    report,
  } = data;

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-10 flex items-center justify-center">

      <div className="w-full max-w-2xl bg-white rounded-3xl border border-gray-200 p-8">

        {/* Header */}
        <div className="text-center">

          <p className="text-sm text-[#D4A017] font-medium">
            YOUR GROWTH IDENTITY
          </p>

          <h1 className="mt-4 text-4xl font-bold text-[#0F172A]">

            {archetype}

          </h1>

        </div>

        {/* Sections */}
        <div className="mt-10 space-y-8">

          <div>

            <p className="text-sm text-gray-500">
              Core Nature
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-[#0F172A] leading-relaxed">

              {report.title}

            </h2>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Strength
            </p>

            <p className="mt-2 text-lg text-gray-700 leading-relaxed">

              {report.strength}

            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Growth Warning
            </p>

            <p className="mt-2 text-lg text-gray-700 leading-relaxed">

              {report.warning}

            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Leverage Direction
            </p>

            <p className="mt-2 text-lg text-gray-700 leading-relaxed">

              {report.leverage}

            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              First Mission
            </p>

            <p className="mt-2 text-lg font-medium text-[#0F172A] leading-relaxed">

              {report.mission}

            </p>

          </div>

        </div>

        {/* CTA */}
        <button
          onClick={() =>
            router.push("/dashboard")
          }
          className="w-full mt-10 bg-[#0F172A] text-white py-4 rounded-2xl font-medium hover:opacity-90 transition"
        >

          Begin Your Journey

        </button>

      </div>

    </main>
  );
}