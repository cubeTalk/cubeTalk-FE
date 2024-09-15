import { mockingCreateDebateHandler } from "./createDebate";
import { DebateRoomType } from "../../../shared/type";
import { mockingEnterDebateHandler } from "./enterDebate";
import { mockingGetDebateRoomHandler } from "./getDebateRoom";
import { mockingChangeDescriptionHandler } from "./changeDescription";
import { mockingChangeSettingHandler } from "./changeSetting";

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

  // 토론방 정보
  mockingGetDebateRoomHandler,

  // 토론 설명 변경
  mockingChangeDescriptionHandler,

  // 토론 설정 변경
  mockingChangeSettingHandler,
];
