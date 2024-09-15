import { create } from "zustand";
import { combine } from "zustand/middleware";
import { Participant } from "../../../shared/type";
import { createModalStore } from "../../../shared/components/modal/model/store";

const initalParticipantsState = {
  list: [] as Participant[],
};

export const useParticipantsStore = create(
  combine(initalParticipantsState, (set) => ({
    actions: {
      reset: () => set(() => (initalParticipantsState)),
      resetParticipants: (data: Participant[]) => set(() => ({ list: data })),
      addParticipants: (data: Participant) => set((state) => ({ list: [...state.list, data] })),
      removeParticipants: (memberId: string) =>
        set((state) => ({ list: state.list.filter((item) => item.memberId !== memberId) })),
    }
  })),
);

export const useParticipantsModalStore = createModalStore(false);
