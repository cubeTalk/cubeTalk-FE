import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useChangeStatusErrorStore = create(
  combine(
    {
      error: "",
    },
    (set) => ({
      setError: (error: string) => set({ error }),
    })
  )
);
