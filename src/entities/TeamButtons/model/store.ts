import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useTeamChoseStore = create(
  combine({ team: "" }, (set) => ({
    setTeam: (newTeam: string) => set(() => ({ team: newTeam })),
  }))
);
