import { create } from "zustand";
import { combine } from "zustand/middleware";
import { DebateMode } from "../../../shared/type";
import { createModalStore } from "../../../shared/components/modal/model/store";

export const useCreateDebateModalStore = createModalStore(false);

const DebateDefaultState = {
  title: "",
  description: "",
  chatMode: "찬반",
};

export const useRoomStore = create(
  combine(DebateDefaultState, (set) => ({
    actions: {
      setTitle: (newTitle: string) => set({ title: newTitle }),
      setDescription: (newDescription: string) => set({ description: newDescription }),
      setChatMode: (newChatMode: DebateMode) => set({ chatMode: newChatMode }),
    },
  }))
);

export const chatMode = ["자유", "찬반"];
