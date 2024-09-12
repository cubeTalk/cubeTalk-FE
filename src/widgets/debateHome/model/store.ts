import { create } from "zustand";
import { combine } from "zustand/middleware";
import { RoomSetting, useRoomSettingStore } from "../../../entities/roomSetting/model/store";
import { useInfoStore } from "../../../entities/debateInfo";
import { createInputStore } from "../../../entities/messageInput/model/store";

export const useDescriptionStore = createInputStore(useInfoStore.getState().debateInfo.description);

export const useSettingStore = create(
  combine(useRoomSettingStore.getState(), (set) => ({
    actions: {
      reset: () => set(useRoomSettingStore.getState()),
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
    }
  }))
);