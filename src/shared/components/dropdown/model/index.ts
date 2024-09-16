import { create } from "zustand";
import { combine } from "zustand/middleware";

export interface DropdownState {
  isOpen: string;
  actions: {
    setIsOpen: (newOpen: string) => void;
    onClickDropdown: (label: string) => void;
    reset: () => void;
  };
}

const openDropdownStore = combine({ isOpen: "" }, (set) => ({
  actions: {
    setIsOpen: (newOpen: string) => set({ isOpen: newOpen }),
    onClickDropdown: (label: string) =>
      set((state) => ({ isOpen: state.isOpen === label ? "" : label })),
    reset: () => set({ isOpen: "" }),
  },
}));

export const createUseOpenDropdownStore = () => create(openDropdownStore);
