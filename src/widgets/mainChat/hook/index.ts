import { IMessage } from "@stomp/stompjs";
import { ChatMessage } from "../../../shared/type";
import { useMainMessageStore } from "../model/store";
import { useSubMessageStore } from "../../teamChat/model/store";
import { useUserInfoStore } from "../../../entities/debateInfo";
import { useGetMessagesQuery } from "../api/query";
import { useContext, useEffect } from "react";
import { AlertContext } from "../../../entities/alertDialog/model/context";

export const useUpdateMessageList = () => {
  const { data, isError, isLoading } = useGetMessagesQuery();
  const messageUpdate = useMainMessageStore(state => state.messageUpdate)
  const { alert } = useContext(AlertContext);
  useEffect(() => {
    if (isError) {
      alert("메세지를 불러오기를 실패하였습니다. F5를 눌러 새로고침 해주세요", "확인");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError])

  useEffect(() => {
    if (data) {
      messageUpdate(data);
    }
  },[data, messageUpdate])

  return isLoading;
};

interface WebSocketCallback {
  mainChatCallback: (message: IMessage) => void;
  subChatCallback: (message: IMessage) => void;
  progressCallback: (message: IMessage) => void;
  participantsCallback: (message: IMessage) => void;
  errorCallback: (message: IMessage) => void;
}

export const useWebSocketMessageCallback = (): WebSocketCallback => {
  const nickName = useUserInfoStore((state) => state.nickName);
  const mainMessageAdd = useMainMessageStore((state) => state.messageAdd);
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
