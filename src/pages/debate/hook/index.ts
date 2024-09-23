import { IMessage } from "@stomp/stompjs";
import { ChatMessage, Participant } from "../../../shared/type";
import { useUserInfoStore } from "../../../entities/debateInfo";
import { useSubMessageStore } from "../../../widgets/teamChat/model/store";
import { useMainMessageStore } from "../../../widgets/mainChat/model/store";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { GetParticipantsKey } from "../../../entities/participants/api/query";
import { connectWebSocket } from "../../../app/worker";

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
  const queryClient = useQueryClient();

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
    const participants: Participant[] = JSON.parse(message.body);
    queryClient.setQueryData<Participant[]>([GetParticipantsKey], participants);
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

  useEffect(() => {
    connectWebSocket({
      chatRoomId: id,
      channelId,
      subChannelId,
      nickName,
    });
    //return () => disconnectWebSocket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
