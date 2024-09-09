import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useCreateRoomModalStore = create(
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

const roomDefaultState = {
  title: "",
  description: "",
  chatMode: "찬반",
};

export const useRoomStore = create(
  combine(roomDefaultState, (set) => ({
    actions: {
      setTitle: (newTitle: string) => set((state) => ({ ...state, title: newTitle })),
      setDescription: (newDescription: string) =>
        set((state) => ({ ...state, description: newDescription })),
      setChatMode: (newChatMode: string) => set((state) => ({ ...state, chatMode: newChatMode })),
    },
  }))
);

export const chatMode = ["자유", "찬반"];
