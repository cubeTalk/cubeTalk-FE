import {
  ConnectArgs,
  ChangeTeamMessage,
  ReadyMessageArgs,
  SendMessageArgs,
  VoteMessageArgs,
} from "../lib/webSocket.type";
import { WebSocketManager } from "../api/webSocketManager";

const webSocket = new WebSocketManager();

type DetailedWorkerMessage =
  | { type: "connect"; message: ConnectArgs }
  | { type: "disconnect"; message: null }
  | { type: "changeTeam"; message: ChangeTeamMessage }
  | { type: "sendMessage"; message: SendMessageArgs }
  | { type: "voteMessage"; message: VoteMessageArgs }
  | { type: "ReadyMessage"; message: ReadyMessageArgs };

export const ctx: Worker = self as unknown as Worker;

ctx.onmessage = ({ data }: { data: DetailedWorkerMessage }) => {
  switch (data.type) {
    case "connect":
      webSocket.connect({ ...data.message, postMessage: ctx.postMessage });
      return;
    case "disconnect":
      webSocket.disconnect();
      break;
    case "changeTeam":
      webSocket.changeTeam(data.message.newSubChannelId);
      break;
    case "sendMessage":
      webSocket.sendMessage(data.message.channelId, data.message.chatMessage);
      break;
    case "voteMessage":
      webSocket.voteMessage(data.message.voteMessage);
      break;
    case "ReadyMessage":
      webSocket.ReadyMessage(data.message.readyMessage);
      break;
    default:
      console.log("Unknown message type", data);
  }
};
