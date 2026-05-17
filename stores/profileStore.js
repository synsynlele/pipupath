import { create }
from "zustand";

const useProfileStore =
  create((set) => ({

    onboardingCompleted:
      false,

    builderProfile:
      null,

    builderLevel: 1,

    completedCount: 0,

    streak: 0,

    lastCheckIn: null,

    momentumState:
      "Rebuilding",

    completeOnboarding:
      (profile) =>
        set({

          onboardingCompleted:
            true,

          builderProfile:
            profile,
        }),

    completeMission:
  async () => {

    const {
      data: authData,
    } =
      await supabase.auth.getUser();

    const user =
      authData?.user;

    if (!user) return;

    set((state) => {

      const nextCompleted =
        state.completedCount + 1;

      const nextLevel =
        Math.floor(
          nextCompleted / 3
        ) + 1;

      const nextStreak =
        state.streak + 1;

      const nextMomentum =
        "Momentum Rising";

      // PERSIST TO SUPABASE

      supabase
        .from("profiles")
        .update({

          completed_count:
            nextCompleted,

          streak:
            nextStreak,

          builder_level:
            nextLevel,

          momentum_state:
            nextMomentum,
        })

        .eq(
          "id",
          user.id
        );

      return {

        completedCount:
          nextCompleted,

        streak:
          nextStreak,

        builderLevel:
          nextLevel,

        momentumState:
          nextMomentum,
      };
    });
  },

    dailyCheckIn:
      () =>
        set((state) => {

          const today =
            new Date()
              .toDateString();

          return {

            lastCheckIn:
              today,

            momentumState:
              state.streak >= 7
                ? "Locked In"
                : state.streak >= 3
                ? "Consistent"
                : "Rebuilding",
          };
        }),


hydrateProfile:
  (profile) =>
    set({

      onboardingCompleted:
        profile?.onboarding_completed || false,

      builderProfile:
        profile?.identity_summary || null,

      builderLevel:
        profile?.builder_level || 1,

      completedCount:
        profile?.completed_count || 0,

      streak:
        profile?.streak || 0,

      momentumState:
        profile?.momentum_state || "Rebuilding",
    }),

    logout: () =>
      set({

        onboardingCompleted:
          false,

        builderProfile:
          null,

        builderLevel: 1,

        completedCount: 0,

        streak: 0,

        lastCheckIn:
          null,

        momentumState:
          "Rebuilding",
      }),
  }));

export default useProfileStore;