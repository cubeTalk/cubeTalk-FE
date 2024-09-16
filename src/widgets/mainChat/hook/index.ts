import { IMessage } from "@stomp/stompjs";
import { ChatMessage } from "../../../shared/type";
import { useMainMessageStore } from "../model/store";
import { useSubMessageStore } from "../../teamChat/model/store";
import { useUserInfoStore } from "../../../entities/debateInfo";

interface WebSocketCallback {
  mainChatCallback: (message: IMessage) => void;
  subChatCallback: (message: IMessage) => void;
  progressCallback: (message: IMessage) => void;
  participantsCallback: (message: IMessage) => void;
  errorCallback: (message: IMessage) => void;
}

export const useWebSocketMessageCallback = (): WebSocketCallback => {
  const mainMessageAdd = useMainMessageStore((state) => state.messageAdd);
  const mainChatCallback = (message: IMessage) => {
    const chatMessage: ChatMessage = JSON.parse(message.body);
    mainMessageAdd(chatMessage);
  };
  const subMessageAdd = useSubMessageStore((state) => state.messageAdd);
  const nickName = useUserInfoStore((state) => state.nickName);
  const subChatCallback = (message: IMessage) => {
    const chatMessage: ChatMessage = JSON.parse(message.body);
    subMessageAdd(chatMessage, nickName);
  };
  const progressCallback = (message: IMessage) => {
    const chatMessage = JSON.parse(message.body);
    mainMessageAdd(chatMessage);
  };
  const participantsCallback = (message: IMessage) => {
    const chatMessage = JSON.parse(message.body);
    mainMessageAdd(chatMessage);
  };
  const errorCallback = (message: IMessage) => {
    const errorMessage: {tittle: string, message: string} = JSON.parse(message.body);
    console.error(`[${errorMessage.tittle} Error]: ${errorMessage.message}`);
  };

  return {
    mainChatCallback,
    subChatCallback,
    progressCallback,
    participantsCallback,
    errorCallback,
  };
};
