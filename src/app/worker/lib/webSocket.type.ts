import { SendChatMessage, ReadyMessage, VoteMessage } from "../../../shared/type";

export interface ConnectArgs {
  chatRoomId: string;
  channelId: string;
  subChannelId?: string;
  nickName: string;
}

export type ChangeTeamMessage = {
  newSubChannelId: string;
};

export type SendMessageArgs = {
  channelId: string; 
  chatMessage: SendChatMessage;
};

export type VoteMessageArgs = {
  voteMessage: VoteMessage;
};

export type ReadyMessageArgs = {
  readyMessage: ReadyMessage;
};