import { useUserInfoStore } from "../../entities/debateInfo";
import { useParticipantsStore } from "../../entities/participants/model/store";
import { useDebateTimerStore } from "../../entities/timer/model/store";
import { useChangeStatusErrorStore } from "../../features/changeStatus/model/store";
import { ServerResponse } from "../../shared/axiosApi/model/axiosInstance";
import {
  ReadyMessage,
  VoteMessage,
  SendChatMessage,
  ChatMessage,
  Participant,
  TimerMessage,
  TimerEndMessage,
} from "../../shared/type";
import { useMainMessageStore } from "../../widgets/mainChat/model/store";
import { useSubMessageStore } from "../../widgets/teamChat/model/store";
import { ConnectArgs } from "./lib/webSocket.type";

export const worker = new Worker(new URL("./model", import.meta.url), {
  type: "module",
});

export const connectWebSocket = (args: ConnectArgs) => {
  worker.postMessage({ type: "connect", message: args });
};

export const disconnectWebSocket = () => {
  worker.postMessage({ type: "disconnect", message: null });
};

export const changeTeamWebSocket = (newSubChannelId: string) => {
  worker.postMessage({ type: "changeTeam", message: { newSubChannelId } });
};

export const sendMessageWebSocket = (channelId: string, chatMessage: SendChatMessage) => {
  worker.postMessage({ type: "sendMessage", message: { channelId, chatMessage } });
};

export const voteMessageWebSocket = (voteMessage: VoteMessage) => {
  worker.postMessage({ type: "voteMessage", message: { voteMessage } });
};

export const readyMessage = (readyMessage: ReadyMessage) => {
  worker.postMessage({ type: "ReadyMessage", message: { readyMessage } });
};

// Worker로부터 메시지 수신 처리
worker.onmessage = (event) => {
  const { type, data } = event.data;
  switch (type) {
    case "mainChat":
      useMainMessageStore.getState().actions.messageAdd(data.message as ChatMessage, data.nickName);
      return;
    case "subChat":
      useSubMessageStore.getState().messageAdd(data.message as ChatMessage, data.nickName);
      return;
    case "participants": {
      const response: ServerResponse<Participant[]> = data.participants;
      return participationUpdate(response);
    }
    case "progress": {
      const message: TimerMessage | TimerEndMessage = data.message;
      return progressupdate(message);
    }
    default:
      console.log("Worker send Worng Message");
      return;
  }
};

const participationUpdate = (response: ServerResponse<Participant[]>) => {
  if (Number(response.status) >= 200 && Number(response.status) <= 300 && response.data) {
    const nickName = useUserInfoStore.getState().nickName;
    const updateActions = useParticipantsStore.getState().actions;
    const excludedParticipants = response.data.filter((participant) => {
      if (participant.nickName === nickName) {
        updateActions.updateMyStatus(participant.status);
        return false;
      }
      return true;
    });
    updateActions.resetParticipants(excludedParticipants);
  } else {
    useChangeStatusErrorStore.getState().setError(response.message);
  }
};

const progressupdate = (message: TimerMessage | TimerEndMessage) => {
  if (useDebateTimerStore.getState().type !== message.type) {
    useMainMessageStore.getState().actions.messageAdd(message, "");
  }
  useDebateTimerStore.getState().actions.setTimer(message.remainingTime);
  useDebateTimerStore.getState().actions.setType(message.type);
};
