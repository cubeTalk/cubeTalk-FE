import { create } from "zustand";
import { combine } from "zustand/middleware";
import { BaseDebate, DebateMode } from "../../../shared/type";
import { createModalStore } from "../../../shared/components/modal/model/store";
import { useDebateInfoStore, useUserInfoStore } from "../../../entities/debateInfo";

export const useCreateDebateModalStore = createModalStore(false);

const DebateDefaultState: BaseDebate = {
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

export const useisOwnerStore = create(
  combine({ isOwner: false }, (set) => ({
    actions: {
      setIsOwner: () => set({ isOwner: true }),
    },
  }))
);