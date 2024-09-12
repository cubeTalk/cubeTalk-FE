import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useVoteDebateStore = create(
  combine({ MVP: "", team: "" }, (set) => ({
    actions: {
      setMVP: (newMVP: string) => set((state) => ({ MVP: state.MVP === newMVP ? "" : newMVP })),
      setTeam: (newTeam: string) => set((state) => ({ team: state.team === newTeam ? "" : newTeam })),
    },
  }))
);
