import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import { createUseOpenDropdownStore } from "../../../shared/components/dropdown/model";

export type RoomSetting = {
  maxParticipants: number;
  chatDuration: number;
  positiveEntry: number;
  negativeQuestioning: number;
  negativeEntry: number;
  positiveQuestioning: number;
  positiveRebuttal: number;
  negativeRebuttal: number;
};

const initialRoomSettingState: RoomSetting = {
  maxParticipants: 6,
  chatDuration: 30,
  positiveEntry: 5,
  negativeQuestioning: 5,
  negativeEntry: 5,
  positiveQuestioning: 5,
  positiveRebuttal: 5,
  negativeRebuttal: 5,
};

export const useRoomSettingStore = create(
  persist(
    combine(initialRoomSettingState, (set) => ({
      reset: () => set(() => (initialRoomSettingState)),
      setParticipants: (newParticipant: number) =>
        set((state) => ({ ...state, maxParticipants: newParticipant })),
      setChatDuration: (newDuration: number) =>
        set((state) => ({ ...state, chatDuration: newDuration })),
      setPositiveEntry: (newPositiveEntry: number) =>
        set((state) => ({ ...state, positiveEntry: newPositiveEntry })),
      setNegativeQuestioning: (newNegativeQuestioning: number) =>
        set((state) => ({ ...state, negativeQuestioning: newNegativeQuestioning })),
      setNegativeEntry: (newNegativeEntry: number) =>
        set((state) => ({ ...state, negativeEntry: newNegativeEntry })),
      setPositiveQuestioning: (newPositiveQuestioning: number) =>
        set((state) => ({ ...state, positiveQuestioning: newPositiveQuestioning })),
      setPositiveRebuttal: (newPositiveRebuttal: number) =>
        set((state) => ({ ...state, positiveRebuttal: newPositiveRebuttal })),
      setNegativeRebuttal: (newNegativeRebuttal: number) =>
        set((state) => ({ ...state, negativeRebuttal: newNegativeRebuttal })),
      resetSettings: (data: RoomSetting) => set(() => ({ ...data })),
    })),
    { name: "Setting" }
  )
);

export const useModalDropdownStore = createUseOpenDropdownStore();
