import { create } from "zustand";
import { combine, persist, subscribeWithSelector } from "zustand/middleware";
import { DebateRole, DebateStatus, UserInfo } from "../../../shared/type";
import { useDescriptionStore } from "../../../features/changeDescription/model/store";

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
      changeTeam: (role: DebateRole, subChannelId: string) =>
        set((state) => ({ ...state, role, subChannelId })),
      setMemberId: (memberId: string) => set((state) => ({ ...state, memberId })),
      reset: () => set(initalUserInfoState),
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
  subscribeWithSelector(
    combine(initalDebateInfoState, (set) => ({
      actions: {
        setInfo: (data: Partial<DebateInfo>) => set((state) => ({ ...state, ...data })),
        setDescription: (newDescription: string) => set({ description: newDescription }),
        setId: (id: string) => set((state) => ({ ...state, id })),
      }
    }))
  )
);

useDebateInfoStore.subscribe(
  (state) => state.description,
  (description) => {
    useDescriptionStore.setState(() => ({ value: description, resetvalue: description }));
  }
);
