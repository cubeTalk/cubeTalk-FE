import { create } from "zustand";
import { combine } from "zustand/middleware";
import { Message } from "../../../shared/type";

const initChatStore = {
  chat: [] as Message[],
};

export const useChatStore = create(
  combine(initChatStore, (set) => ({
    action: {
      chatAdd: (newMessage: Message) => set((state) => ({ chat: [...state.chat, newMessage] })),
    },
  }))
);
