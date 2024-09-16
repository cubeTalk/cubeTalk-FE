import { create } from "zustand";
import { createUseOpenDropdownStore } from "../../../shared/components/dropdown/model";
import { combine } from "zustand/middleware";

export const useDebateDropdownStore = createUseOpenDropdownStore();

const initialDebateDropdownState = {
  sort: "createdAt",
  order: "asc",
  status: "CREATED",
};

export const useDebateSearchParamsStore = create(
  combine(initialDebateDropdownState, (set) => ({
    setSort: (newSort: string) => set(() => ({ sort: newSort })),
    setOrder: (newOrder: string) => set(() => ({ order: newOrder })),
    setStatus: (newStatus: string) => set(() => ({ status: newStatus })),
  }))
);
