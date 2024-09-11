import { create } from "zustand";
import { createModalStore } from "../../../shared/components/modal/model/store";
import { combine } from "zustand/middleware";

export const useEnterModalStore = createModalStore();

const enterDebateState = {
  nickName: "",
  role: "",
  ownerId: "",
  checkName: "",
};

export const useEnterDebateStore = create(
  combine(enterDebateState, (set) => ({
    actions: {
      setNickName: (newNickName: string) => set(() => ({ nickName: newNickName })),
      setRole: (newRole: string) => set(() => ({ role: newRole })),
      setOwnerId: (newOwnerId: string) => set(() => ({ ownerId: newOwnerId })),
      setCheckName: (newCheckName: string) => set(() => ({ checkName: newCheckName })),
    },
  }))
);
