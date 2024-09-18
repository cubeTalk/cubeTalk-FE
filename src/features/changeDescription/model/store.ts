import { ChangeEvent } from "react";
import { create } from "zustand";
import { combine } from "zustand/middleware";

export interface InputStoreType {
  value: string;
  resetvalue: string;
  action: {
    setValue: (newValue: string) => void;
    resetValue: () => void;
    addNewLine: () => void;
    onChangeValue: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  };
}

export const useDescriptionStore = create(
  combine({ value: "", resetvalue: "" }, (set) => ({
    action: {
      setValue: (newValue: string) => set({ value: newValue }),
      onChangeValue: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        set({ value: e.target.value }),
      resetValue: () => set((state) => ({ value: state.resetvalue })),
    },
  }))
);
