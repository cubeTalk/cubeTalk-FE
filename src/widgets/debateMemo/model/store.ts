import { create } from "zustand";
import { combine, createJSONStorage, persist } from "zustand/middleware";

export const useDebateMemoStore = create(
  persist(
    combine({ memo: "" }, (set) => ({
      setMemo: (newMemo: string) => set({ memo: newMemo }),
      reset: () => set({ memo: "" }),
    })),
    { name: "DebateMemo", storage: createJSONStorage(() => sessionStorage) }
  )
);
