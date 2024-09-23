import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useDebateTimerStore = create(
  combine({ time: "00:00:00", type: "" }, (set) => ({
    actions: {
      setTimer: (time: string) => set({ time }),
      setType: (type: string) => set({ type }),
    },
  }))
);
