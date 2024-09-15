import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import { DebateStatus, UserInfo } from "../../../shared/type";

const initalUserInfoState: UserInfo = {
  id: "",
  memberId: "",
  nickName: "",
  channelId: "",
  subChannelId: "",
  role: "",
};

export const useUserInfoStore = create(
  persist(
    combine(initalUserInfoState, (set) => ({
      setInfo: (data: UserInfo) => set((state) => ({ ...state, ...data })),
      setMemberId: (newMemberId: string) => set((state) => ({ ...state, memberId: newMemberId })),
      changeTeam: (role: string, subChannelId: string) =>
        set((state) => ({ ...state, role, subChannelId })),
      reset: () => initalUserInfoState,
    })),
    { name: "UserInfo" }
  )
);

interface DebateInfo {
  id: string;
  title: string;
  description: string;
  chatMode: string;
  chatStatus: DebateStatus;
}

const initalDebateInfoState: DebateInfo = {
  id: "",
  title: "",
  description: "",
  chatMode: "",
  chatStatus: "CREATED",
};

export const useDebateInfoStore = create(
  combine(initalDebateInfoState, (set) => ({
    setInfo: (data: Partial<DebateInfo>) => set((state) => ({ ...state, ...data })),
  }))
);
