import { create } from "zustand";
import { combine, subscribeWithSelector } from "zustand/middleware";
import { Participant, ParticipantStatus } from "../../../shared/type";
import { createModalStore } from "../../../shared/components/modal/model/store";
import { useisOwnerStore } from "../../../features/createDebate/model/store";
import { useUserInfoStore } from "../../debateInfo";

const initalParticipantsState = {
  myStatus: "PENDING" as ParticipantStatus,
  participants: [] as Participant[],
};

export const useParticipantsStore = create(
  subscribeWithSelector(
    combine(initalParticipantsState, (set) => ({
      actions: {
        reset: () => set(() => initalParticipantsState),
        resetParticipants: (data: Participant[]) =>
          set(() => {
            const nickName = useUserInfoStore.getState().nickName;
            const excludedParticipants = data.filter((participant) => {
              if (participant.nickName === nickName) {
                set({ myStatus: participant.status });
                return false;
              }
              return true;
            });
            return { participants: excludedParticipants };
          }),
        updateMyStatus: (newStatus: ParticipantStatus) =>
          set((state) => ({ ...state, myStatus: newStatus })),
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
