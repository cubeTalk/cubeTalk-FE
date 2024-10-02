import * as StompJs from "@stomp/stompjs";
import SockJS, { CloseEvent } from "sockjs-client";
import { getCloseEventCodeReason, sleep } from "../lib";
import { ConnectArgs } from "../lib/webSocket.type";
import {
  ChatMessage,
  Participant,
  ReadyMessage,
  SendChatMessage,
  TimerEndMessage,
  TimerMessage,
  VoteMessage,
} from "../../../shared/type";

const dummyFunc = (message: StompJs.IMessage) => {
  console.log(message);
};
type DummyFunc = (message: StompJs.IMessage) => void;
type PostMessageFunction = (
  message:
    | { type: string; data: { message: ChatMessage; nickName: string } }
    | { type: string; data: { participants: Participant[] } }
    | { type: string; data: { message: TimerMessage | TimerEndMessage } }
    | { type: string; data: { message: string } }
) => void;
type Args = ConnectArgs & {
  mainChatPostMessage: DummyFunc;
  subChatPostMessage: DummyFunc;
  participantsPostMessage: DummyFunc;
  progressPostMessage: DummyFunc;
  errorPostMessage: (error: string) => void;
  timeOutMessage: (error: string) => void;
};

export class WebSocketManager {
  private client: StompJs.Client | null = null;
  private args: Args = {
    chatRoomId: "",
    nickName: "",
    channelId: "",
    subChannelId: "",
    mainChatPostMessage: dummyFunc,
    subChatPostMessage: dummyFunc,
    participantsPostMessage: dummyFunc,
    progressPostMessage: dummyFunc,
    errorPostMessage: () => {},
    timeOutMessage: () => {},
  };
  private lastConnection: number = Date.now();
  private connectionRetry: number = 0;
  private isPaused: boolean = false;

  connect = ({
    chatRoomId,
    channelId,
    subChannelId,
    nickName,
    postMessage,
  }: ConnectArgs & { postMessage: PostMessageFunction }) => {
    if (this.client) {
      this.client.deactivate();
    }
    this.args = {
      chatRoomId,
      nickName,
      channelId,
      subChannelId,
      mainChatPostMessage: (message: StompJs.IMessage) => {
        const chatMessage: ChatMessage = JSON.parse(message.body);
        postMessage({
          type: "mainChat",
          data: { message: chatMessage, nickName: this.args.nickName },
        });
      },
      subChatPostMessage: (message: StompJs.IMessage) => {
        const chatMessage: ChatMessage = JSON.parse(message.body);
        postMessage({
          type: "subChat",
          data: { message: chatMessage, nickName: this.args.nickName },
        });
      },
      participantsPostMessage: (message: StompJs.IMessage) => {
        const participants: Participant[] = JSON.parse(message.body);
        postMessage({ type: "participants", data: { participants } });
      },
      progressPostMessage: (message: StompJs.IMessage) => {
        const timerMessage: TimerMessage | TimerEndMessage = JSON.parse(message.body);
        console.log(timerMessage);
        postMessage({
          type: "progress",
          data: { message: timerMessage },
        });
      },
      errorPostMessage: (error: string) =>
        postMessage({
          type: "error",
          data: { message: error },
        }),
      timeOutMessage: (error: string) =>
        postMessage({
          type: "timeout",
          data: { message: error },
        }),
    };
    this.client = new StompJs.Client({
      brokerURL: `${import.meta.env.VITE_SOCKET}ws`,
      connectHeaders: {
        nickName,
        chatRoomId: this.args.chatRoomId,
      },
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      onConnect: () => {
        this.onConnect();
      },
      webSocketFactory: () => new SockJS(`${import.meta.env.VITE_HTTP}ws`),
      onWebSocketClose: (close: CloseEvent) => {
        console.log(
          close,
          `연결끊김: ${getCloseEventCodeReason(close)} clean : ${close.wasClean} active: ${this.client?.active}`
        );
      },
      onWebSocketError: (frame) => {
        console.error("websocket Error");
        console.error(frame);
        this.args.timeOutMessage("웹소켓 에러");
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
        this.args.errorPostMessage("서버로부터 오류가 발생했습니다.");
      },
      onDisconnect: () => {
        console.log("Disconnected");
      },
      // 타임아웃 체킹
      beforeConnect: async () => {
        const currentTime = Date.now();
        if (this.lastConnection >= currentTime) {
          this.connectionRetry += 1;
        } else {
          this.connectionRetry = 0;
          this.isPaused = false;
        }

        if (this.connectionRetry === 2) {
          this.isPaused = true;
          this.connectionRetry = 0;
          this.args.timeOutMessage("타임 아웃");
        }
        this.lastConnection = currentTime + 6 * 1000;
        while (this.isPaused) {
          await sleep(1000);
        }
      },
    });
    this.client.activate();
  };

  stopPause = () => {
    this.isPaused = false;
  };

  chatSubscribe = (channelId: string, chatPostMessage: (message: StompJs.IMessage) => void) => {
    if (this.client) {
      this.client.subscribe(`/topic/chat.${channelId}`, chatPostMessage, {
        nickName: this.args.nickName,
        id: channelId,
        chatRoomId: this.args.chatRoomId,
      });
    }
  };

  onConnect = () => {
    if (this.client) {
      this.chatSubscribe(this.args.channelId, this.args.mainChatPostMessage);
      if (this.args.subChannelId) {
        this.chatSubscribe(this.args.subChannelId, this.args.subChatPostMessage);
      }
      this.client.subscribe(
        `/topic/progress.${this.args.chatRoomId}`,
        this.args.progressPostMessage,
        {
          id: `progress${this.args.chatRoomId}`,
        }
      );
      this.client.subscribe(
        `/topic/${this.args.chatRoomId}.participants.list`,
        this.args.participantsPostMessage,
        {
          id: `participants${this.args.chatRoomId}`,
        }
      );
      this.client.subscribe(
        `/topic/error`,
        (message: StompJs.IMessage) => {
          const errorMessage: { tittle: string; message: string } = JSON.parse(message.body);
          this.args.errorPostMessage(errorMessage.message);
        },
        {
          id: `error${this.args.chatRoomId}`,
        }
      );
      console.log("Connected");
    }
  };

  disconnect = () => {
    if (this.client) {
      this.client.disconnectHeaders = {};
      this.client.deactivate();
      this.client = null;
    }
  };

  reconnect = () => {
    if (this.client && !this.isConnected()) {
      this.client.deactivate();
      this.client.activate();
    }
  };

  changeTeam = (newSubChannelId: string) => {
    if (this.client && this.args.subChannelId) {
      this.client.unsubscribe(this.args.subChannelId, {
        chatRoomId: this.args.chatRoomId,
      });
      this.args = {
        ...this.args,
        subChannelId: newSubChannelId,
      };
      this.chatSubscribe(newSubChannelId, this.args.subChatPostMessage);
      return true;
    }
    console.log("Changing Team failed");
    return false;
  };

  sendMessage = (channelId: string, chatMessage: SendChatMessage) => {
    this.reconnect();
    if (this.client) {
      this.client.publish({
        destination: `/pub/message/${channelId}`,
        body: JSON.stringify(chatMessage),
      });
      return true;
    }
    console.log("Sending Message failed");
    return false;
  };

  voteMessage = (voteMessage: VoteMessage) => {
    if (this.client) {
      this.client.publish({
        destination: `/pub/${this.args.chatRoomId}/vote`,
        body: JSON.stringify(voteMessage),
      });
      return true;
    }
    console.log("voting Message failed");
    return false;
  };

  ReadyMessage = (voteMessage: ReadyMessage) => {
    if (this.client) {
      this.client.publish({
        destination: `/pub/${this.args.chatRoomId}/ready`,
        body: JSON.stringify(voteMessage),
      });
      return true;
    }
    console.log("voting Message failed");
    return false;
  };
  isConnected() {
    return !!this.client?.connected;
  }
}
