import { create } from "zustand";
import { combine } from "zustand/middleware";
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
      // 이전 메세지와 다음메세지를 확인하여 시간과 닉네임 표시 유무 체크
      messageUpdate: (newMessages: Message[], nickName: string) => {
        set((state) => {
          let isName = true;
          const messages = newMessages.map((newMessage, index) => {
            if (!isChatMessage(newMessage)) return newMessage;
            const nextMessage =
              index + 1 === newMessages.length ? null : newMessages[index + 1];
            if (nextMessage && isChatMessage(nextMessage)) {
              const handledMessage = handleMessage(
                newMessage,
                nextMessage.serverTimeStamp,
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
