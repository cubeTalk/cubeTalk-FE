export type DebateMode = "찬반" | "자유";
export type DebateStatus = "CREATED" | "STARTED";

export interface DebateRoomBase {
  title: string; // 제목
  description: string; // 설명
  chatMode: DebateMode; // 채팅종류
  maxParticipants: number; // 수용인원
  chatDuration: number; // 토론 시간(s)
}

export interface DebateRoom extends DebateRoomBase {
  id: string; // 토론방 ID
  chatStatus: DebateStatus; // 토론방 상태
  ownerId: string; // 방장 ID
  chatGenerationTime: number; // 토론 생성 시각(timestamp)
  channelId: string; // 메인 채팅방 ID
  debateSettings: RoomTimeSetting
  participants: Participant[]
}

export interface Participant {
  nickName: string;
  memberId: string;
  role: DebateRole;
  status: ParticipantStatus;
}
export type ParticipantStatus = "방장" | "준비" | "대기";

export type UserInfo = {
  id: string; // 토론방 ID
  memberId: string; // 사용자 UUID
  nickName: string; // 토론 참가자 닉네임
  severTimeStamp: string; // 토론 입장시각 (TimeStamp)
  channelId: string; // 메인 채팅방 ID
  subChannelId: string; // 서브 채팅방 ID
};

export type RoomTimeSetting = {
  positiveEntry: number; // 찬성 입론 시간
  negativeQuestioning: number; // 반대 질의 시간
  negativeEntry: number; // 반대 입론 시간
  positiveQuestioning: number; // 찬성 질의 시간
  positiveRebuttal: number; // 찬성 반박 시간
  negativeRebuttal: number; // 반대 반박 시간
};

export type MessageType = "CHAT" | "VOTE";

export interface Message {
  messageId: string; // 메세지 ID
  type: MessageType; // 채팅 타입
  sender: string; // 보낸 유저 UUID
  message: string; // 채팅 내용
  replyToMessageId: string; // 언급한 메세지 ID
  serverTimestamp: string; // 채팅 보낸 시각(timestamp)
}

export type DebateRole = "찬성" | "반대" | "관전";
export type ProgressMessageType =
  | "긍정입장"
  | "부정질의"
  | "부정입장"
  | "긍정질의"
  | "긍정반박"
  | "부정반박"
  | "투표"
  | "결과"
  | "TIMER_END";
