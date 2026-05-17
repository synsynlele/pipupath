"use client";

import {
  useEffect,
  useState,
} from "react";

import BuilderShell
from "@/components/layout/BuilderShell";

import BuilderCard
from "@/components/ui/BuilderCard";

import FloatingInput
from "@/components/ui/FloatingInput";

import { supabase }
from "@/lib/supabase";

import Link
from "next/link";

export default function BuilderConnectPage() {

  const [builders, setBuilders] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadBuilders() {

      const {
        data,
        error,
      } =
        await supabase
          .from("profiles")
          .select("*")
          .eq(
            "public_visibility",
            true
          );

      if (error) {

        console.error(error);

      } else {

        setBuilders(data);
      }

      setLoading(false);
    }

    loadBuilders();

  }, []);

  const filteredBuilders =
    builders.filter((builder) => {

      const searchText =
        search.toLowerCase();

      return (

        builder?.identity_summary
          ?.toLowerCase()
          ?.includes(searchText)

        ||

        builder?.current_focus
          ?.toLowerCase()
          ?.includes(searchText)

        ||

        builder?.skills
          ?.join(" ")
          ?.toLowerCase()
          ?.includes(searchText)
      );
    });

  return (

    <BuilderShell
      title="BuilderConnect"
      subtitle="Builder Ecosystem"
    >

      <div className="flex flex-col">

        {/* HERO */}

        <h1 className="text-5xl font-bold leading-tight tracking-tight text-white">

          Discover builders.
          Build together.

        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">

          Connect with ambitious builders,
          collaborators,
          creators,
          and operators
          growing through PipuPath.

        </p>

        {/* SEARCH */}

        <div className="mt-10">

          <FloatingInput
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search builders, skills, or focus..."
          />

        </div>

        {/* RESULTS */}

        <div className="mt-10 grid gap-5 md:grid-cols-2">

          {loading ? (

            <BuilderCard>

              <p className="text-slate-400">

                Loading builders...

              </p>

            </BuilderCard>

          ) : filteredBuilders.length === 0 ? (

            <BuilderCard>

              <p className="text-slate-400">

                No builders found.

              </p>

            </BuilderCard>

          ) : (

            filteredBuilders.map(
              (builder) => (

                <Link
  href={`/builder/${builder.id}`}
>

  <BuilderCard
    key={builder.id}
  >

                  <div className="flex flex-col">

                    {/* STATUS */}

                    <div className="mb-3 w-fit rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">

                      BUILDER

                    </div>

                    {/* IDENTITY */}

                    <h2 className="text-2xl font-semibold text-white">

                      {
                        builder.identity_summary ||
                        "Emerging Builder"
                      }

                    </h2>

                    {/* FOCUS */}

                    <p className="mt-4 text-slate-400 leading-relaxed">

                      {
                        builder.current_focus ||
                        "Exploring opportunities and building momentum."
                      }

                    </p>

                    {/* SKILLS */}

                    <div className="mt-5 flex flex-wrap gap-2">

                      {builder.skills?.map(
                        (
                          skill,
                          index
                        ) => (

                          <div
                            key={index}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                          >

                            {skill}

                          </div>

                        )
                      )}

                    </div>

                    {/* COLLAB */}

                    <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">

                      <p className="text-xs uppercase tracking-wide text-slate-500">

                        Collaboration Interest

                      </p>

                      <p className="mt-2 text-slate-300">

                        {
                          builder.collaboration_interest ||
                          "Open to meaningful collaboration."
                        }

                      </p>

                    </div>

                    {/* CTA */}

                    <a
                      href="mailto:pipupath@gmail.com"
                      className="
                        mt-6
                        rounded-2xl
                        bg-blue-500
                        px-5
                        py-4
                        text-center
                        font-semibold
                        text-white
                        transition-all
                        hover:scale-[1.02]
                      "
                    >

                      Request Connection

                    </a>

                  </div>

                </BuilderCard>

</Link>

              )
            )

          )}

        </div>

      </div>

    </BuilderShell>
  );
}