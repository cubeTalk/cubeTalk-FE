import { DebateRoomBase } from "../../../shared/type";

export type PostDebateRoomRequest = DebateRoomBase;
export type PostDebateRoomResponse = {
  id: string; // 토론방 ID
  memberId: string; // 사용자 UUID
};