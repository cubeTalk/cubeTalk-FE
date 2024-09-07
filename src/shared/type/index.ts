export interface Message {
  id: string; // 메세지 ID
  type: "CHAT"; // 채팅 타입
  sender: string; // 보낸 유저 UUID
  message: string;  // 채팅 내용
  replyToMessageId: string; // 언급한 메세지 ID
  serverTimestamp: string;  // 채팅 보낸 시각(timestamp)
}

export interface DebateRoomBase {
  title : string; // 제목
  description: string;  // 설명
  chatMode : "찬반" | "자유"; // 채팅종류
  maxParticipants: number;  // 수용인원
  chatDuration : number;  // 토론 시간(s)
}

export interface DebateRoom extends DebateRoomBase {
  id : string;  // 토론방 ID
  chatStatus : "CREATED" | "STARTED" // 토론방 상태
  currentParticipants : number; // 참여 인원
  ownerNickName : string; // 방장 닉네임
  chatGenerationTime : number;  // 토론 생성 시각(timestamp)
}

export type DebateRole = "찬성" | "반대" | "관전";