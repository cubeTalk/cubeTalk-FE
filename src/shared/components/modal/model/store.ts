import { create } from "zustand";
import { combine } from "zustand/middleware";

export const createModalStore = () => create(
  combine(
    {
      modalVisible: false,
    },
    (set) => ({
      openModal: () => set(() => ({ modalVisible: true })),
      closeModal: () => set(() => ({ modalVisible: false })),
    })
  )
);