import { create } from "zustand";
import { combine } from "zustand/middleware";

export interface DropdownState {
  isOpen: string;
  setIsOpen: (newOpen: string) => void;
}

const openDropdownStore = combine({ isOpen: "" }, (set) => ({
  setIsOpen: (newOpen: string) => set(() => ({ isOpen: newOpen })),
}));

export const createUseOpenDropdownStore = () => create(openDropdownStore);
