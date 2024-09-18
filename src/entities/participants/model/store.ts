import { create } from "zustand";
import { combine, subscribeWithSelector } from "zustand/middleware";
import { Participant } from "../../../shared/type";
import { createModalStore } from "../../../shared/components/modal/model/store";
import { useMainMessageStore } from "../../../widgets/mainChat/model/store";
import { useisOwnerStore } from "../../../features/createDebate/model/store";
import { useUserInfoStore } from "../../debateInfo";

const initalParticipantsState = {
  participants: [] as Participant[],
};

export const useParticipantsStore = create(
  subscribeWithSelector(
    combine(initalParticipantsState, (set) => ({
      actions: {
        reset: () => set(() => (initalParticipantsState)),
        resetParticipants: (data: Participant[]) => set(() => ({ participants: data })),
        addParticipants: (data: Participant) => set((state) => ({ participants: [...state.participants, data] })),
        removeParticipants: (memberId: string) =>
          set((state) => ({ participants: state.participants.filter((item) => item.memberId !== memberId) })),
      }
    })),
  )
);

export const useParticipantsModalStore = createModalStore(false);

useParticipantsStore.subscribe(
  (state) => state.participants,
  (participants) => {
    useMainMessageStore.getState().actions.resetParticipants(participants);
    const memberId = useUserInfoStore.getState().memberId;
    const me = participants.find((participants) => participants.memberId === memberId);
    const actions = useisOwnerStore.getState().actions;
    if (me?.status === "OWNER") {
      actions.setIsOwner();
    } else {
      actions.setIsNotOwner();
    }
  }
);