import { IMessage } from "@stomp/stompjs";
import { ChatMessage } from "../../../shared/type";
import { useUserInfoStore } from "../../../entities/debateInfo";
import { useSubMessageStore } from "../../../widgets/teamChat/model/store";
import { useMainMessageStore } from "../../../widgets/mainChat/model/store";
import { useEffect } from "react";
import webSocket from "../../../shared/webSocket";

interface WebSocketCallback {
  mainChatCallback: (message: IMessage) => void;
  subChatCallback: (message: IMessage) => void;
  progressCallback: (message: IMessage) => void;
  participantsCallback: (message: IMessage) => void;
  errorCallback: (message: IMessage) => void;
}

export const useWebSocketMessageCallback = (): WebSocketCallback => {
  const nickName = useUserInfoStore((state) => state.nickName);
  const mainMessageAdd = useMainMessageStore((state) => state.actions.messageAdd);
  const subMessageAdd = useSubMessageStore((state) => state.messageAdd);

  const mainChatCallback = (message: IMessage) => {
    const chatMessage: ChatMessage = JSON.parse(message.body);
    mainMessageAdd(chatMessage, nickName);
  };
  const subChatCallback = (message: IMessage) => {
    const chatMessage: ChatMessage = JSON.parse(message.body);
    subMessageAdd(chatMessage, nickName);
  };
  const progressCallback = (message: IMessage) => {
    const chatMessage = JSON.parse(message.body);
    mainMessageAdd(chatMessage, nickName);
  };
  const participantsCallback = (message: IMessage) => {
    const chatMessage = JSON.parse(message.body);
    mainMessageAdd(chatMessage, nickName);
  };
  const errorCallback = (message: IMessage) => {
    const errorMessage: { tittle: string; message: string } = JSON.parse(message.body);
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

export const useWebSocketConnection = () => {
  const { id, channelId, subChannelId, nickName } = useUserInfoStore((state) => state);
  const {
    mainChatCallback,
    subChatCallback,
    progressCallback,
    participantsCallback,
    errorCallback,
  } = useWebSocketMessageCallback();

  useEffect(() => {
    webSocket.connect({
      id,
      channelId,
      subChannelId,
      nickName,
      mainChatCallback,
      subChatCallback,
      progressCallback,
      participantsCallback,
      errorCallback,
    });
  }, [
    channelId,
    errorCallback,
    id,
    mainChatCallback,
    nickName,
    participantsCallback,
    progressCallback,
    subChannelId,
    subChatCallback,
  ]);
};
