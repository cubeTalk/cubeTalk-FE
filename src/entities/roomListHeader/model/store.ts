import { create } from "zustand";
import { createUseOpenDropdownStore } from "../../../shared/components/dropdown/model";
import { combine } from "zustand/middleware";

export const useDebateDropdownStore = createUseOpenDropdownStore();

const initialDebateDropdownState = {
  sort: "사람순",
  mode: "모두",
  status: "시작전",
};

export const useDebateSearchParamsStore = create(
  combine(initialDebateDropdownState, (set) => ({
    setSort: (newSort: string) => set(() => ({ sort: newSort })),
    setMode: (newMode: string) => set(() => ({ mode: newMode })),
    setStatus: (newStatus: string) => set(() => ({ status: newStatus })),
  }))
);

