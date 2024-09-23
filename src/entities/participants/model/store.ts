import { create } from "zustand";
import { combine, subscribeWithSelector } from "zustand/middleware";
import { Participant, ParticipantStatus } from "../../../shared/type";
import { createModalStore } from "../../../shared/components/modal/model/store";
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
        removeParticipants: (nickName: string) =>
          set((state) => ({
            participants: state.participants.filter((item) => item.nickName !== nickName),
          })),
        updateMyStatus: (newStatus: ParticipantStatus) => set((state) => ({ ...state, myStatus: newStatus })),
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