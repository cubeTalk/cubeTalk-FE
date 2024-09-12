import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import { ChatMessage, Message } from "../../../shared/type";

export type MessageWithIsLeft = ChatMessage & {
  isLeft?: boolean;
};

const initSubMessageState = {
  messages: [] as Message[],
};

const isChatMessage = (message: Message): message is ChatMessage => message.type === "CHAT";

export const useSubMessageStore = create(
  persist(
    combine(initSubMessageState, (set) => ({
      MessageAdd: (newMessage: Message, myNickName: string) => {
        let isLeft = true;
        if (isChatMessage(newMessage)) {
          isLeft = newMessage.sender !== myNickName;
        }
        set((state) => ({
          messages: [...state.messages, { ...newMessage, isLeft }],
        }));
      },
    })),
    { name: "MainMessages" }
  )
);