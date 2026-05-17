import { create } from "zustand";

const useMissionStore = create((set) => ({

  missions: [],

setMissions: (missions) =>
  set({
    missions,
  }),

  addMission: (mission) =>
    set((state) => ({
      missions: [
        {
          id: Date.now(),

          completed: false,

          createdAt:
            new Date().toISOString(),

          ...mission,
        },

        ...state.missions,
      ],
    })),

  completeMission: (id) =>
  set((state) => ({
    missions:
      state.missions.map(
        (mission) =>

          mission.id === id
            ? {
                ...mission,

                status:
                  "completed",

                completed_at:
                  new Date(),
              }
            : mission
      ),
  })),

  removeMission: (id) =>
    set((state) => ({
      missions:
        state.missions.filter(
          (mission) =>
            mission.id !== id
        ),
    })),
}));

export default useMissionStore;