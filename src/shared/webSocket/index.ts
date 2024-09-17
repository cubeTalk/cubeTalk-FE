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
  private chatRoomId: string = "";
  private useInfo: { id: string; nickName: string } = { id: "", nickName: "" };
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
    this.useInfo = { id, nickName };
    this.client = new StompJs.Client({
      brokerURL: `${import.meta.env.VITE_SOCKET}ws`,
      connectHeaders: {
        id,
        nickName,
      },
      // debug: (str) => {
      //   console.log(str);
      // },
      reconnectDelay: 4000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      onConnect: () => {
        if (this.client) {
          this.client.subscribe(`/topic/chat.${channelId}`, mainChatCallback, this.useInfo);
          // this.client.subscribe(`/topic/chat.${subChannelId}`, subChatCallback, this.useInfo);
          // this.client.subscribe(`/topic/progress.${id}`, progressCallback, this.useInfo);
          // this.client.subscribe(`/topic/${id}.participants.list`, participantsCallback, this.useInfo);
          // this.client.subscribe(`/topic/error`, errorCallback);

          this.connected = true;
          console.log("Connected");
        } else {
          console.log("Connecting failed");
        }
      },
      webSocketFactory: () => new SockJS(`${import.meta.env.VITE_HTTP}ws`)
      ,
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
    oldSubChatId: string,
    newSubCHatId: string,
    chatCallback: (message: StompJs.IMessage) => void
  ) => {
    if (this.client && this.connected) {
      this.client.unsubscribe(`/topic/chat.${oldSubChatId}`);
      this.client.subscribe(`/topic/chat.${newSubCHatId}`, chatCallback, this.useInfo);
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
