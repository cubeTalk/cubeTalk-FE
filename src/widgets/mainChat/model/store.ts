import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import { isChatMessage, Message, Participant } from "../../../shared/type";
import { createInputStore } from "../../../entities/messageInput/model/store";
import { createModalStore } from "../../../shared/components/modal/model/store";
import { handleMessage, handleMessages } from "../../../entities/message/lib";

const initMainMessageState = {
  messages: [] as Message[],
  participants: [] as Participant[],
};

export const useMainMessageStore = create(
  combine(initMainMessageState, (set) => ({
    actions: {
      messageAdd: (newMessage: Message, nickName: string) => {
        set((state) => {
          if (isChatMessage(newMessage)) {
            return {
              messages: handleMessages(newMessage, state.messages, nickName, state.participants),
            };
          }
          return { messages: [...state.messages, newMessage] };
        });
      },
      messageUpdate: (newMessages: Message[], nickName: string) => {
        set((state) => {
          let isName = true;
          const messages = newMessages.map((newMessage, index) => {
            if (isChatMessage(newMessage)) {
              const nextSeverTimeStamp =
                index + 1 === newMessages.length ? "" : newMessages[index + 1].severTimeStamp;
              const handledMessage = handleMessage(
                newMessage,
                nextSeverTimeStamp,
                nickName,
                state.participants,
                isName
              );
              isName = handledMessage.isTime;
              return handledMessage;
            }
            return newMessage;
          });
          return { messages };
        });
      },
      resetParticipants: (data: Participant[]) => set(() => ({ participants: data })),
    },
  }))
);

export const useMainInputStore = createInputStore("");

export const useAnnouncementModal = createModalStore(true);
