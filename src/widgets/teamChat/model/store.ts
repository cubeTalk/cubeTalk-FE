import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import { ChatMessage, isChatMessage, Message } from "../../../shared/type";
import { createInputStore } from "../../../entities/messageInput/model/store";

export type MessageWithIsLeft = ChatMessage & {
  isLeft?: boolean;
};

const initSubMessageState = {
  messages: [] as Message[],
};

export const useSubMessageStore = create(
  persist(
    combine(initSubMessageState, (set) => ({
      messageAdd: (newMessage: Message, myNickName: string) => {
        let isLeft = true;
        if (isChatMessage(newMessage)) {
          isLeft = newMessage.sender !== myNickName;
        }
        set((state) => ({
          messages: [...state.messages, { ...newMessage, isLeft }],
        }));
      },
    })),
    { name: "TeamMessages" }
  )
);

export const useSubInputStore = createInputStore("");