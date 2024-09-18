import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import { ChatMessage, isChatMessage, Message } from "../../../shared/type";
import { createInputStore } from "../../../entities/messageInput/model/store";
import { handleMessages } from "../../../entities/message/lib";

export type MessageWithIsLeft = ChatMessage & {
  isLeft?: boolean;
};

const initSubMessageState = {
  messages: [] as Message[],
};

export const useSubMessageStore = create(
  persist(
    combine(initSubMessageState, (set) => ({
      messageAdd: (newMessage: Message, nickName: string) => {
        set((state) => {
          if (isChatMessage(newMessage)) {
            return {messages: handleMessages(newMessage, state.messages, nickName)}
          }
          return {messages: [...state.messages, newMessage] };
        });
      },
    })),
    { name: "TeamMessages" }
  )
);

export const useSubInputStore = createInputStore("");