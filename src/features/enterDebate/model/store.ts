import { create } from "zustand";
import { combine } from "zustand/middleware";
export const useEnterModalStore = create(
  combine(
    {
      modalVisible: false,
      isStarted: false,
    },
    (set) => ({
      openModal: (isStarted: boolean) => set(() => ({ modalVisible: true, isStarted })),
      closeModal: () => set(() => ({ modalVisible: false, isStarted: false })),
      clickModal: () => set((state) => ({ modalVisible: !state.modalVisible })),
    })
  )
);

const enterDebateState = {
  nickName: "",
  role: "",
  checkName: "",
};

export const useEnterDebateStore = create(
  combine(enterDebateState, (set) => ({
    actions: {
      setNickName: (newNickName: string) => set(() => ({ nickName: newNickName })),
      setRole: (newRole: string) => set(() => ({ role: newRole })),
      setCheckName: (newCheckName: string) => set(() => ({ checkName: newCheckName })),
    },
  }))
);
