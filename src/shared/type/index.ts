export type RoomCardType = {
  id: string;
  chatMode: string;
  title: string;
  description: string;
  chatDuration: string;
  ownerNickName: string;
  maxParticipants: number;
  currentParticipantsCount: number;
  createdAt: string;
  updatedAt: string;
};

export type DebateMode = "찬반" | "자유";
export type DebateStatus = "CREATED" | "STARTED" | "ENDED";

export type BaseDebate = {
  title: string; // 제목
  description: string; // 설명
  chatMode: DebateMode; // 토론타입
};

export type FreeSetting = {
  maxParticipants: number; // 수용인원
  chatDuration: number; // 토론 시간(s)
};

export type ProsConsSetting = {
  maxParticipants: number; // 수용인원
  debateSettings: TimeSetting;
};
export type TimeSetting = {
  positiveEntry: number; // 찬성 입론 시간
  negativeQuestioning: number; // 반대 질의 시간
  negativeEntry: number; // 반대 입론 시간
  positiveQuestioning: number; // 찬성 질의 시간
  positiveRebuttal: number; // 찬성 반박 시간
  negativeRebuttal: number; // 반대 반박 시간
};

export type FreeDebate = FreeSetting & BaseDebate;
export type ProsConsDebate = ProsConsSetting & BaseDebate;
export type DebateRoomBaseType = FreeDebate | ProsConsDebate;
export type DebateSetting = FreeSetting | ProsConsSetting;

export const isProsConsDebate = (debate: DebateRoomBaseType): debate is ProsConsDebate =>
  debate.chatMode === "찬반";
export const isFreeDebate = (debate: DebateRoomBaseType): debate is FreeDebate =>
  debate.chatMode === "자유";
export const hasProsConsSetting = (
  setting: DebateSetting | DebateRoomBaseType | DebateRoomType
): TimeSetting => {
  if ("debateSettings" in setting) {
    return setting.debateSettings;
  }
  return {
    negativeEntry: 5,
    negativeQuestioning: 5,
    negativeRebuttal: 5,
    positiveEntry: 5,
    positiveQuestioning: 5,
    positiveRebuttal: 5,
  };
};

export const hasFreeSetting = (
  setting: DebateSetting | DebateRoomBaseType | DebateRoomType
): number => {
  if ("chatDuration" in setting) {
    return setting.chatDuration;
  }
  return 5;
};

export type DebateRoomAddition = {
  id: string; // 토론방 ID
  chatStatus: DebateStatus; // 토론방 상태
  ownerId: string; // 방장 ID
  channelId: string; // 메인 채팅방 ID
  participants: Participant[];
  createdAt: string;
  updatedAt: string; // 토론 생성 시각(timestamp)
};

export type DebateRoomType = DebateRoomBaseType & DebateRoomAddition;

export type DebateRole = "찬성" | "반대" | "관전" | "자유" | "";

export interface Participant {
  nickName: string;
  role: DebateRole;
  status: ParticipantStatus;
}
export type ParticipantStatus = "OWNER" | "READY" | "PENDING";

export type UserInfo = {
  id: string; // 토론방 ID
  memberId: string; // 사용자 UUID
  nickName: string; // 토론 참가자 닉네임
  channelId: string; // 메인 채팅방 ID
  subChannelId: string; // 서브 채팅방 ID
  role: DebateRole;
};

export type MessageType =
  | ChatMessageType
  | "VOTE"
  | "찬반"
  | "자유"
  | ProgressMessageType
  | "ENTER";
export type ChatMessageType = DebateRole;

export type ProgressMessageType =
  | "positiveEntry"
  | "negativeQuestioning"
  | "negativeEntry"
  | "positiveQuestioning"
  | "positiveRebuttal"
  | "negativeRebuttal"
  | "votingTime"
  | "result";

type BaseMessage = {
  type: MessageType;
};

export interface ChatMessage extends BaseMessage {
  type: ChatMessageType;
  messageId: string; // 메세지 ID
  sender: string; // 보낸 유저 UUID
  message: string; // 채팅 내용
  replyToMessageId: string; // 언급한 메세지 ID
  serverTimeStamp: string; // 채팅 보낸 시각(timestamp)
}

export interface SendChatMessage extends BaseMessage {
  type: ChatMessageType;
  id: string; // 채팅방 ID
  sender: string; // 보낸 유저 UUID
  message: string; // 채팅 내용
  replyToMessageId?: string; // 언급한 메세지 ID
}

export interface TimerMessage extends BaseMessage {
  type: ProgressMessageType;
  remainingTime: string;
  message: string;
}

export interface TimerEndMessage extends TimerMessage {
  type: "result";
  result: {
    support: number;
    opposite: number;
  };
  MVP: string;
}

export interface VoteMessage extends BaseMessage {
  type: "VOTE";
  team: "OPPOSITE" | "SUPPORT";
  mvp: string;
}

export interface ReadyMessage extends BaseMessage {
  type: "찬반" | "자유";
  memberId: string;
  status: "READY" | "PENDING";
}

export interface EnterMessage extends BaseMessage {
  type: "ENTER";
  message: string;
}

export type Message =
  | ReadyMessage
  | VoteMessage
  | TimerMessage
  | TimerEndMessage
  | ChatMessage
  | MessageWithType
  | EnterMessage;

export type MessageWithType = ChatMessage & {
  isLeft?: boolean;
  color?: string;
  isName?: boolean;
  isTime?: string;
};

// type gurads
export const isChatMessage = (message: Message): message is MessageWithType =>
  message.type === "찬성" || message.type === "반대" || message.type === "관전";
export const isVoteMessage = (message: Message): message is VoteMessage => message.type === "votingTime";
export const isTimerMessage = (message: Message): message is TimerMessage =>
  isProgressiveType(message.type);

export const isProgressiveType = (type: string): type is ProgressMessageType =>
  type === "positiveEntry" ||
  type === "negativeQuestioning" ||
  type === "negativeEntry" ||
  type === "positiveQuestioning" ||
  type === "positiveRebuttal" ||
  type === "negativeRebuttal" ||
  type === "votingTime" ||
  type === "result";
export const isTimerEndMessage = (message: Message): message is TimerEndMessage =>
  message.type === "result";
export const isEnterMessage = (message: Message): message is EnterMessage =>
  message.type === "ENTER";
