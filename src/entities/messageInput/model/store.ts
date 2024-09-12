import { ChangeEvent } from "react";
import { create, StoreApi, UseBoundStore } from "zustand";
import { combine } from "zustand/middleware";

export interface InputStoreType {
  value: string;
  action: {
    setValue: (newValue: string) => void;
    resetValue: () => void;
    addNewLine: () => void;
    onChangeValue: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  };
}

export const createInputStore = (): UseBoundStore<StoreApi<InputStoreType>> =>
  create(
    combine({ value: "" }, (set) => ({
      action: {
        setValue: (newValue: string) => set({ value: newValue }),
        onChangeValue: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          set({ value: e.target.value }),
        resetValue: () => set({ value: "" }),
        addNewLine: () => set((state) => ({ value: state.value + "\n" })),
      },
    }))
  );
