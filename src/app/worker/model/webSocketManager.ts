import * as StompJs from "@stomp/stompjs";
import SockJS, { CloseEvent } from "sockjs-client";
import { getCloseEventCodeReason } from "../lib";
import { ConnectArgs } from "./webSocket.type";
import {
  ChatMessage,
  Participant,
  ReadyMessage,
  SendChatMessage,
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
) => void;
type Args = ConnectArgs & {
  mainChatPostMessage: DummyFunc;
  subChatPostMessage: DummyFunc;
  participantsPostMessage: DummyFunc;
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
  };

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
      connectionTimeout: 30000,
      onConnect: () => {
        this.onConnect();
      },
      webSocketFactory: () => new SockJS(`${import.meta.env.VITE_HTTP}ws`),
      onWebSocketClose: (close: CloseEvent) => {
        console.log(close, `연결끊김: ${getCloseEventCodeReason(close)} clean : ${close.wasClean}`);
        // timeout (30s)
      },
      onWebSocketError: (frame) => {
        console.error("websocket Error: " + frame);
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
        //alert("STOMP 프로토콜 오류가 발생했습니다.");
      },
      onDisconnect: () => {
        console.log("Disconnected");
      },
    });
    this.client.activate();
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
      this.chatSubscribe(this.args.subChannelId, this.args.subChatPostMessage);
      this.client.subscribe(
        `/topic/progress.${this.args.chatRoomId}`,
        this.args.mainChatPostMessage,
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
          console.error(`[${errorMessage.tittle} Error]: ${errorMessage.message}`);
        },
        {
          id: `error${this.args.chatRoomId}`,
        }
      );
      console.log("Connected");
    }
  };

  reconnect = async () => {
    if (this.isConnected()) {
      return true;
    }
    if (this.client) {
      console.log("Try to reconnect");
      this.client.deactivate();
      this.client.activate();
      return true;
    } else {
      console.log("Can't connect");
      return false;
    }
  };

  disconnect = () => {
    if (this.client) {
      this.client.disconnectHeaders = {};
      this.client.deactivate();
      this.client = null;
    }
  };

  changeTeam = (newSubChannelId: string) => {
    while (this.client && this.reconnect()) {
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
    while (this.client && this.reconnect()) {
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
    while (this.client && this.reconnect()) {
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
    while (this.client && this.reconnect()) {
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
