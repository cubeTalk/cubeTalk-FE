import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import { isChatMessage, Message, Participant } from "../../../shared/type";
import { createInputStore } from "../../../entities/messageInput/model/store";
import { createModalStore } from "../../../shared/components/modal/model/store";

const initMainMessageState = {
  messages: [] as Message[],
  participants: [] as Participant[],
};

export const useMainMessageStore = create(
  persist(
    combine(initMainMessageState, (set) => ({
      messageAdd: (newMessage: Message) => {
        set((state) => {
          let isLeft = true;
          if (isChatMessage(newMessage)) {
            const user = state.participants.find(
              (user) => user.nickName === newMessage.sender
            );
            isLeft = user?.role === "찬성";
          }
          return {
            messages: [...state.messages, { ...newMessage, isLeft }],
          };
        });
      },
      resetParticipants: (data: Participant[]) => set(() => ({ participants: data })),
    })),
    { name: "MainMessages" }
  )
);

export const useMainInputStore = createInputStore("");

export const useAnnouncementModal = createModalStore(true);
