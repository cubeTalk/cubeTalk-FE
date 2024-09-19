import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import { ChatMessage, DebateRole, Message } from "../../../shared/type";
import { createInputStore } from "../../../entities/messageInput/model/store";
import { handleMessages } from "../../../entities/message/lib";

const initSubMessageState = {
  messages: [] as Message[],
};

export const useSubMessageStore = create(
  persist(
    combine(initSubMessageState, (set) => ({
      messageAdd: (newMessage: ChatMessage, nickName: string, role: DebateRole) =>
        set((state) => ({ messages: handleMessages(newMessage, state.messages, nickName, role) })),
      reset: () => set(() => ({ messages: [] })),
    })),
    { name: "TeamMessages" }
  )
);

export const useSubInputStore = createInputStore("");
