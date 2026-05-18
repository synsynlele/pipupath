"use client";

import {
  useEffect,
  useState,
} from "react";

import BuilderShell
from "@/components/layout/BuilderShell";

import BuilderCard
from "@/components/ui/BuilderCard";

import { supabase }
from "@/lib/supabase";

export default function VaultPage() {

  const [missions, setMissions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadVault() {

      const {
        data: authData,
      } =
        await supabase.auth.getUser();

      const user =
        authData?.user;

      if (!user) return;

      const {
        data,
        error,
      } =
        await supabase
          .from("user_missions")
          .select("*")
          .eq(
            "user_id",
            user.id
          )
          .eq(
            "status",
            "completed"
          )
          .order(
            "completed_at",
            {
              ascending: false,
            }
          );

      if (error) {

        console.error(error);

      } else {

        setMissions(data);
      }

      setLoading(false);
    }

    loadVault();

  }, []);

  return (

    <BuilderShell
      title="Mission Vault"
      subtitle="Execution History"
    >

      <div className="flex flex-col gap-5 pb-32">

        <BuilderCard>

          <h1 className="text-4xl font-bold text-white">

            Mission Vault

          </h1>

          <p className="mt-4 max-w-2xl text-slate-400 leading-relaxed">

            Your completed missions,
            growth archive,
            and execution history.

          </p>

        </BuilderCard>

        {loading ? (

          <BuilderCard>

            <p className="text-slate-400">

              Loading vault...

            </p>

          </BuilderCard>

        ) : missions.length === 0 ? (

          <BuilderCard>

            <p className="text-slate-400">

              No completed missions yet.

            </p>

          </BuilderCard>

        ) : (

          missions.map(
            (mission) => (

              <BuilderCard
                key={mission.id}
              >

                <div className="mb-3 w-fit rounded-full border border-green-400/20 bg-green-500/10 px-3 py-1 text-xs text-green-300">

                  COMPLETED MISSION

                </div>

                <h2 className="text-2xl font-semibold text-white">

                  {mission.title}

                </h2>

                <p className="mt-4 text-slate-400 leading-relaxed">

                  {
                    mission.description
                  }

                </p>

              </BuilderCard>

            )
          )

        )}

      </div>

    </BuilderShell>
  );
}