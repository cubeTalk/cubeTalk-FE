import { Message, ProgressMessage } from "../../type";

const socketUrl = import.meta.env.VITE_SOCKET;

// socket
export const ConnectUrl = () => `${socketUrl}ws`;
// 채팅 수신
export const SubChatUrl = (channelId: string) => `${socketUrl}topic/${channelId}`;
export type SubChatBody = {
  type: "CHAT";
  sender: string; // 보내는사람 UUID (memberId)
  message: string;
  replyToMessageId?: string; // 인용할 메세지 Id
};

// 채팅 송신
export const PubChatUrl = (roomId: string) => `${socketUrl}pub/message/${roomId}`;
export type PubChatHeader = {
  username: string; // 참가자 닉네임
  id: string; // 토론방 id
};
export type PubChatResponse = Message;

// 토론 진행
export const SubProgressUrl = (roomId: string) => `${socketUrl}pub/message/${roomId}`;
export type SubProgressResponse = {
  type: ProgressMessage;
  remainingTime: number; // 진행 시간(s)
  message: string;
  result?: {
    support: number;
    opposite: number;
  };
  MVP?: string;
};

// 토론 투표
export const PubVoteUrl = (roomId: string) => `${socketUrl}pub/vote/${roomId}`;
export type PubVoteBody = {
  type: "VOTE";
  team: "긍정" | "부정";
  mvp: string; // memberId
};

// 참여자 목록
export const SubUsersUrl = (roomId: string) => `${socketUrl}topic/participants/${roomId}/list`;
export type SubUsersResponse = {
  nickName: string;
  status: "준비" | "대기" | "방장";
}[];
