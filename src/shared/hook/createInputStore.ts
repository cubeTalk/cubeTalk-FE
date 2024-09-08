import { create } from "zustand";

export interface InputStoreState {
  inputs: Record<string, string | number>;
  setValue: (id: string, value: string | number) => void;
}

export const createInputStore = (initialState: Record<string, string | number>) =>
  create<InputStoreState>((set) => ({
    inputs: initialState,
    setValue: (id: string, value: string | number) =>
      set((state) => ({
        inputs: {
          ...state.inputs,
          [id]: value,
        },
      })),
  }));
