import { combine, persist } from "zustand/middleware";
import { createUseOpenDropdownStore } from "../../../shared/components/dropdown/model";
import { create } from "zustand";
import {
  DebateSetting,
  hasFreeSetting,
  hasProsConsSetting,
  TimeSetting,
} from "../../../shared/type";

export const useModalDropdownStore = createUseOpenDropdownStore();

export type DebateSettingActions = {
  reset: (newState: DebateSetting) => void;
  getState: () => DebateSetting;
  getChatDuration: () => number;
  getDebateSettings: () => TimeSetting;
  setMaxParticipants: (newParticipant: number) => void;
  setChatDuration: (newDuration: number) => void;
  setPositiveEntry: (newPositiveEntry: number) => void;
  setNegativeQuestioning: (newNegativeQuestioning: number) => void;
  setNegativeEntry: (newNegativeEntry: number) => void;
  setPositiveQuestioning: (newPositiveQuestioning: number) => void;
  setPositiveRebuttal: (newPositiveRebuttal: number) => void;
  setNegativeRebuttal: (newNegativeRebuttal: number) => void;
  resetSettings: (data: DebateSetting) => void;
};

export const initialRoomSettingState: DebateSetting = {
  maxParticipants: 6,
  chatDuration: 30,
  debateSettings: {
    positiveEntry: 5,
    negativeQuestioning: 5,
    negativeEntry: 5,
    positiveQuestioning: 5,
    positiveRebuttal: 5,
    negativeRebuttal: 5,
  },
};

export const dummySetting = {
  positiveEntry: 5,
  negativeQuestioning: 5,
  negativeEntry: 5,
  positiveQuestioning: 5,
  positiveRebuttal: 5,
  negativeRebuttal: 5,
};

export const createRoomSettingStore = (initState = initialRoomSettingState) =>
  combine<DebateSetting, DebateSettingActions>(initState, (set, get) => ({
    getChatDuration: () => hasFreeSetting(get()),
    getDebateSettings: () => hasProsConsSetting(get()),
    setMaxParticipants: (newParticipant: number) =>
      set((state) => ({ ...state, maxParticipants: newParticipant })),

    setChatDuration: (newDuration: number) =>
      set((state) => ({ ...state, chatDuration: newDuration })),
    setPositiveEntry: (newPositiveEntry: number) =>
      set((state) => ({
        ...state,
        debateSettings: { ...hasProsConsSetting(get()), positiveEntry: newPositiveEntry },
      })),

    setNegativeQuestioning: (newNegativeQuestioning: number) =>
      set((state) => ({
        ...state,
        debateSettings: {
          ...hasProsConsSetting(get()),
          negativeQuestioning: newNegativeQuestioning,
        },
      })),

    setNegativeEntry: (newNegativeEntry: number) =>
      set((state) => ({
        ...state,
        debateSettings: { ...hasProsConsSetting(get()), negativeEntry: newNegativeEntry },
      })),

    setPositiveQuestioning: (newPositiveQuestioning: number) =>
      set((state) => ({
        ...state,
        debateSettings: {
          ...hasProsConsSetting(get()),
          positiveQuestioning: newPositiveQuestioning,
        },
      })),

    setPositiveRebuttal: (newPositiveRebuttal: number) =>
      set((state) => ({
        ...state,
        debateSettings: { ...hasProsConsSetting(get()), positiveRebuttal: newPositiveRebuttal },
      })),

    setNegativeRebuttal: (newNegativeRebuttal: number) =>
      set((state) => ({
        ...state,
        debateSettings: { ...hasProsConsSetting(get()), negativeRebuttal: newNegativeRebuttal },
      })),

    resetSettings: (data: DebateSetting) => set(() => ({ ...data })),
    getState: () => get(),
    reset: (newState: DebateSetting) => set(() => newState),
  }));

const roomSettingStore = createRoomSettingStore();
export const useRoomSettingStore = create(persist(roomSettingStore, { name: "Setting" }));
