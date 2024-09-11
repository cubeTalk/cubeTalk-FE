import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import { DebateStatus } from "../../../shared/type";

interface UserInfo {
  memberId: string;
  nickName: string;
  severTimeStamp: string;
  isOwner: boolean;
  role: string;
}

interface SubscribeInfo {
  channelId: string;
  subChannelId: string;
}

interface DebateInfo {
  id: string
  title: string;
  description: string;
  chatMode: string;
  chatStatus: DebateStatus;
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
    isOwner: false,
    role: "",
  },
  subscribeInfo: {
    channelId: "",
    subChannelId: "",
  },
  debateInfo: {
    id: "",
    title: "",
    description: "",
    chatMode: "",
    chatStatus: "CREATED",
  },
};

export const useInfoStore = create(
  persist(
    combine(initalRoomInfoState, (set) => ({
      reset: () => set(() => (initalRoomInfoState)),
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
    { name: "Info" }
  )
);
