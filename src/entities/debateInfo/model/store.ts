import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

interface UserInfo {
  memberId: string;
  nickName: string;
  severTimeStamp: string;
}

interface SubscribeInfo {
  id: string;
  channelId: string;
  subChannelId: string;
}

interface DebateInfo {
  title: string;
  description: string;
  chatMode: string;
  maxParticipants: string;
  chatDuration: string;
}

interface RoomInfoState {
  userInfo: UserInfo;
  subscribeInfo: SubscribeInfo;
  debateInfo: DebateInfo;
}

const initalRoomInfoState: RoomInfoState = {
  userInfo: {
    memberId: "",
    nickName: "",
    severTimeStamp: "",
  },
  subscribeInfo: {
    id: "",
    channelId: "",
    subChannelId: "",
  },
  debateInfo: {
    title: "",
    description: "",
    chatMode: "",
    maxParticipants: "",
    chatDuration: "",
  },
};

// 상태 관리 로직에서 타입을 명시
export const useRoomInfoStore = create(
  persist(
    combine(initalRoomInfoState, (set) => ({
      updateUserInfo: (data: Partial<UserInfo>) =>
        set((state) => ({
          userInfo: { ...state.userInfo, ...data },
        })),

      updateSubscribeInfo: (data: Partial<SubscribeInfo>) =>
        set((state) => ({
          subscribeInfo: { ...state.subscribeInfo, ...data },
        })),

      updateDebateInfo: (data: Partial<DebateInfo>) =>
        set((state) => ({
          debateInfo: { ...state.debateInfo, ...data },
        })),
    })),
    { name: "RoomInfo" }
  )
);
