import { mockingCreateDebateHandler } from "./createDebate";
import { DebateRoomType } from "../../../shared/type";
import { mockingEnterDebateHandler } from "./enterDebate";

export const serverResponse = <T>(data: T, message = "테스트용", status = "200") => ({
  status,
  message,
  data,
});

export const roomList: DebateRoomType[] = [];

export const handlers = [
  // 토론방 생성
  mockingCreateDebateHandler,

  // 토론방 참가
  mockingEnterDebateHandler,
];
