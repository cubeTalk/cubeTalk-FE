import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useCreateRoomModalStore = create(
  combine({
    modalVisible: false,
  }, (set) => ({
    openModal: () => set(() => ({ modalVisible: true })),
    closeModal: () => set(() => ({ modalVisible: false })),
  }))
);
