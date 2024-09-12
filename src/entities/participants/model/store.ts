import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import { Participant } from "../../../shared/type";
import { createModalStore } from "../../../shared/components/modal/model/store";

const initalParticipantsState = {
  list: [] as Participant[],
};

export const useParticipantsStore = create(
  persist(
    combine(initalParticipantsState, (set) => ({
      reset: () => set(() => (initalParticipantsState)),
      resetParticipants: (data: Participant[]) => set(() => ({ list: data })),
      addParticipants: (data: Participant) => set((state) => ({ list: [...state.list, data] })),
      removeParticipants: (memberId: string) =>
        set((state) => ({ list: state.list.filter((item) => item.memberId !== memberId) })),
    })),
    { name: "Participants" }
  )
);

export const useParticipantsModalStore = createModalStore(false);
