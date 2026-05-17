"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase }
from "../lib/supabase";

import useProfileStore
from "@/stores/profileStore";

import useMissionStore
from "@/stores/missionStore";

const AuthContext =
  createContext(null);

export function AuthProvider({
  children,
}) {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const {
    completeOnboarding,
  } = useProfileStore();

  const {
    setMissions,
  } = useMissionStore();

  useEffect(() => {

    let mounted = true;

    async function initializeAuth() {

      try {

        const {
          data,
          error,
        } =
          await supabase.auth.getSession();

        if (error) {

          console.error(
            "SESSION ERROR:",
            error
          );
        }

        const currentUser =
          data?.session?.user ?? null;

        if (!mounted) return;

        setUser(currentUser);

        // RESTORE PROFILE

        if (currentUser) {

          const {
            data: profile,
          } =
            await supabase
              .from("profiles")
              .select("*")
              .eq(
                "id",
                currentUser.id
              )
              .single();

          if (profile) {

            completeOnboarding({

              identity:
                profile.builder_identity,

              strengths:
                profile.strengths,

              skills:
                profile.skills,

              earningPath:
                profile.earning_path,
            });
          }

          // RESTORE MISSIONS

          const {
            data: missions,
          } =
            await supabase
              .from("user_missions")
              .select("*")
              .eq(
                "user_id",
                currentUser.id
              )
              .order(
                "created_at",
                {
                  ascending: false,
                }
              );

         if (missions) {

  const normalizedMissions =
    missions.map((mission) => ({

      ...mission,

      completed:
        mission.completed ||
        mission.status ===
          "completed",
    }));

  setMissions(
    normalizedMissions
  );
}
        }

      } catch (err) {

        console.error(
          "AUTH INIT ERROR:",
          err
        );

      } finally {

        if (mounted) {

          setLoading(false);
        }
      }
    }

    initializeAuth();

    const {
      data: { subscription },
    } =
      supabase.auth.onAuthStateChange(
        async (
          _event,
          session
        ) => {

          const currentUser =
            session?.user ?? null;

          setUser(currentUser);

          setLoading(false);
        }
      );

    return () => {

      mounted = false;

      subscription.unsubscribe();
    };

  }, []);

  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
}

export function useAuth() {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}