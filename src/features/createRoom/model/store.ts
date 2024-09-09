import { create } from "zustand";
import { combine } from "zustand/middleware";
import { createInputStore } from "../../../shared/hook/createInputStore";

export const useCreateRoomModalStore = create(
  combine({
    modalVisible: false,
  }, (set) => ({
    openModal: () => set(() => ({ modalVisible: true })),
    closeModal: () => set(() => ({ modalVisible: false })),
  }))
);

export const useRoomStore = createInputStore(
  { 
    title: "",
    description: "",
    chatMode: "찬반",
    maxParticipants: 6,
    chatDuration: 30,
    positiveEntry: 5,
    negativeQuestioning: 5,
    negativeEntry: 5, 
    positiveQuestioning: 5,
    positiveRebuttal: 5,
    negativeRebuttal: 5, 
  }
);


export const chatMode = ["자유", "찬반"];
export const maxParticipants = [2, 4, 6];
export const SubTimeList = Array.from({length: 5}, (_, i) => i+1);
export const TotalTimeList = Array.from({length: 23}, (_, i) => i+10);
