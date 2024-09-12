import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import { ChatMessage, Message, Participant } from "../../../shared/type";
import { createInputStore } from "../../../entities/messageInput/model/store";

export type MessageWithIsLeft = ChatMessage & {
  isLeft?: boolean;
};

const initMainMessageState = {
  messages: [] as Message[],
};

const isChatMessage = (message: Message): message is ChatMessage => message.type === "CHAT";

export const useMainMessageStore = create(
  persist(
    combine(initMainMessageState, (set) => ({
      MessageAdd: (newMessage: Message, participants: Participant[]) => {
        let isLeft = true;
        if (isChatMessage(newMessage)) {
          const userTeam = participants.find((user) => user.nickName === newMessage.sender)?.role;
          isLeft = userTeam === "찬성";
        }
        set((state) => ({
          messages: [...state.messages, { ...newMessage, isLeft }],
        }));
      },
    })),
    { name: "MainMessages" }
  )
);

export const useMainInputStore = createInputStore();