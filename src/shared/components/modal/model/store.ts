import { create } from "zustand";
import { combine } from "zustand/middleware";

export const createModalStore = (initvalue: boolean) => create(
  combine(
    {
      modalVisible: initvalue,
    },
    (set) => ({
      openModal: () => set(() => ({ modalVisible: true })),
      closeModal: () => set(() => ({ modalVisible: false })),
      clickModal: () => set((state) => ({ modalVisible: !state.modalVisible })),
    })
  )
);