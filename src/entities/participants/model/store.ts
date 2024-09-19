import { create } from "zustand";
import { combine, subscribeWithSelector } from "zustand/middleware";
import { Participant, ParticipantStatus } from "../../../shared/type";
import { createModalStore } from "../../../shared/components/modal/model/store";
import { useMainMessageStore } from "../../../widgets/mainChat/model/store";
import { useisOwnerStore } from "../../../features/createDebate/model/store";

const initalParticipantsState = {
  myStatus: "PENDING" as ParticipantStatus,
  participants: [] as Participant[],
};

export const useParticipantsStore = create(
  subscribeWithSelector(
    combine(initalParticipantsState, (set) => ({
      actions: {
        reset: () => set(() => initalParticipantsState),
        resetParticipants: (data: Participant[]) => set(() => ({ participants: data })),
        addParticipants: (data: Participant) =>
          set((state) => ({ participants: [...state.participants, data] })),
        removeParticipants: (memberId: string) =>
          set((state) => ({
            participants: state.participants.filter((item) => item.memberId !== memberId),
          })),
        updateMyStatus: (newStatus: ParticipantStatus) => set(() => ({ myStatus: newStatus })),
      },
    }))
  )
);

export const useParticipantsModalStore = createModalStore(false);

useParticipantsStore.subscribe(
  (state) => state.myStatus,
  (myStatus) => {
    const actions = useisOwnerStore.getState().actions;
    if (myStatus === "OWNER") {
      actions.setIsOwner();
    } else {
      actions.setIsNotOwner();
    }
  }
);

useParticipantsStore.subscribe(
  (state) => state.participants,
  (participants) => useMainMessageStore.getState().actions.resetParticipants(participants)
);
