import * as StompJs from "@stomp/stompjs";
import { SendChatMessage, ReadyMessage, VoteMessage } from "../type";
import SockJS from "sockjs-client";

interface ConnectArgs {
  id: string;
  channelId: string;
  subChannelId: string;
  nickName: string;
  mainChatCallback: (message: StompJs.IMessage) => void;
  subChatCallback: (message: StompJs.IMessage) => void;
  progressCallback: (message: StompJs.IMessage) => void;
  participantsCallback: (message: StompJs.IMessage) => void;
  errorCallback: (message: StompJs.IMessage) => void;
}

class WebSocketManager {
  private client: StompJs.Client | null = null;
  private connected: boolean = false;
  private nickName: string = "";
  private chatRoomId: string = "";
  connect = ({
    id,
    channelId,
    subChannelId,
    nickName,
    mainChatCallback,
    subChatCallback,
    progressCallback,
    participantsCallback,
    errorCallback,
  }: ConnectArgs) => {
    if (this.client) {
      this.client.deactivate();
    }
    this.chatRoomId = id;
    this.nickName = nickName;
    this.client = new StompJs.Client({
      brokerURL: `${import.meta.env.VITE_SOCKET}ws`,
      connectHeaders: {
        nickName,
        chatRoomId: this.chatRoomId,
      },
      // debug: (str) => {
      //   console.log(str);
      // },
      reconnectDelay: 4000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      onConnect: () => {
        if (this.client) {
          this.client.subscribe(`/topic/chat.${channelId}`, mainChatCallback, {
            nickName,
            id: channelId,
            chatRoomId: id,
          });
          this.client.subscribe(`/topic/chat.${subChannelId}`, subChatCallback, {
            nickName,
            id: subChannelId,
            chatRoomId: id,
          });
          this.client.subscribe(`/topic/progress.${id}`, progressCallback, {
            id: `progress${id}`,
          });
          this.client.subscribe(`/topic/${id}.participants.list`, participantsCallback, {
            id: `participants${id}`,
          });
          this.client.subscribe(`/topic/error`, errorCallback, {
            id: `error${id}`,
          });

          this.connected = true;
          console.log("Connected");
        } else {
          console.log("Connecting failed");
        }
      },
      webSocketFactory: () => new SockJS(`${import.meta.env.VITE_HTTP}ws`),
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
      onDisconnect: () => {
        console.log("Disconnected");
        this.connected = false;
      },
    });
    this.client.activate();
  };

  disconnect = () => {
    if (this.client) {
      this.client.deactivate();
      this.client = null;
    }
  };

  changeTeam = (
    oldSubChannelId: string,
    newSubChannelId: string,
    chatCallback: (message: StompJs.IMessage) => void
  ) => {
    if (this.client && this.connected) {
      this.client.unsubscribe(oldSubChannelId, {
        chatRoomId: this.chatRoomId,
      });
      this.client.subscribe(`/topic/chat.${newSubChannelId}`, chatCallback, {
        nickName: this.nickName,
        chatRoomId: this.chatRoomId,
      });
    }
  };

  sendMessage = (channelId: string, chatMessage: SendChatMessage) => {
    if (this.client && this.connected) {
      this.client.publish({
        destination: `/pub/message/${channelId}`,
        body: JSON.stringify(chatMessage),
      });
    } else {
      console.log("Sending Message failed");
    }
  };

  voteMessage = (voteMessage: VoteMessage) => {
    if (this.client && this.connected) {
      this.client.publish({
        destination: `/pub/${this.chatRoomId}/vote`,
        body: JSON.stringify(voteMessage),
      });
    } else {
      console.log("voting Message failed");
    }
  };

  ReadyMessage = (voteMessage: ReadyMessage) => {
    if (this.client && this.connected) {
      this.client.publish({
        destination: `/pub/${this.chatRoomId}/ready`,
        body: JSON.stringify(voteMessage),
      });
    } else {
      console.log("voting Message failed");
    }
  };
  isConnected() {
    return this.connected;
  }
}

export default new WebSocketManager();
