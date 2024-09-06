import { create } from "zustand";
import { Message } from "../../../feature/chat/type";
import { combine } from "zustand/middleware";

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
