import { DebateRole, Message, RoomTimeSetting, UserInfo } from "../../type";

const httpUrl = import.meta.env.VITE_HTTP;

// GET 메세지 목록
export const MessagesUrl = () => `${httpUrl}chat/messages`;
export type GetMessagesHeaderParams = {
  id: string; // 토론방 UUID
  before: string; // 토론 참가자 입장시각(timestamp)
};
export type GetMessagesResponse = Message[];

// 토론방 생성, 목록
export const DebateRoomUrl = () => `${httpUrl}chat`;

// POST 토론 참가
export const JoinDebateUrl = (roomId: string) => `${httpUrl}chat/${roomId}/participants`;
export type PostJoinDebateRequest = {
  nickName: string | null; // 토론 참가자 닉네임
  role: DebateRole; // 토론 역할
  ownerId?: string; // 토론 방장 ID
};
export type PostJoinDebateResponse = UserInfo;

// PATCH 팀 변경
export const ChangeTeamUrl = (roomId: string, userId: string) =>
  `${httpUrl}chat/${roomId}/role/${userId}`;
export type PatchChangeTeamRequest = {
  role: DebateRole; // 토론 역할
  subChannelId: string; // 구독중인 서브 채팅방 ID
};
export type PatchChangeTeamResponse = {
  id: string; // 토론방 ID
  channelID: string; // 메인 채팅방 ID
  newSubChannelId: string; // 새서브 채팅방 ID
  previousSubChannelId: string; // 이전서브 채팅방 ID
};

// POST 토론방 설정
export const DebateRoomSettingUrl = (roomId: string) => `${httpUrl}chat/${roomId}/setting`;
export type PostDebateRoomSettingRequest = Partial<RoomTimeSetting>;
export type PostDebateRoomSettingResponse = object;

// 토론 시작
export const DebateStartUrl = (roomId: string) => `${httpUrl}chat/${roomId}/actions`;
export type PostDebateStartRequest = object;
export type PostDebateStartResponse = object;

// 소켓 에러
export const ErrorUrl = (roomId: string) => `${httpUrl}chat/${roomId}/subscription/error`;
export type PostErrorRequest = {
  type: "참가실패" | "팀변경실패";
  memberId: string;
  role: DebateRole; // 참가하려는 role or 팀변경전 원래 role
  newRole: DebateRole; // 팀변경실패로인한구독시 변경하려던 role
};
export type PostErrorResponse = object;
