import { create } from "zustand";
import { combine } from "zustand/middleware";
import { DebateMode } from "../../../shared/type";
import { createModalStore } from "../../../shared/components/modal/model/store";

export const useCreateDebateModalStore = createModalStore();

const DebateDefaultState = {
  title: "",
  description: "",
  chatMode: "찬반",
};

export const useRoomStore = create(
  combine(DebateDefaultState, (set) => ({
    actions: {
      setTitle: (newTitle: string) => set((state) => ({ ...state, title: newTitle })),
      setDescription: (newDescription: string) =>
        set((state) => ({ ...state, description: newDescription })),
      setChatMode: (newChatMode: DebateMode) => set((state) => ({ ...state, chatMode: newChatMode })),
    },
  }))
);

export const chatMode = ["자유", "찬반"];
