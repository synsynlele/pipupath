import { create } from "zustand";

const useOnboardingStore = create((set) => ({

  answers: {},

  setAnswer: (key, value) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [key]: value,
      },
    })),

  reset: () =>
    set({
      answers: {},
    }),
}));

export default useOnboardingStore;