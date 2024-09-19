import { create } from "zustand";
import { combine } from "zustand/middleware";
import { DebateRole } from "../../../shared/type";

interface InitalTeamState {
  team: DebateRole;
  setTeam: (newTeam: DebateRole) => void;
}

export const useTeamChoseStore = create<InitalTeamState>(
  combine({ team: "" } as { team: DebateRole }, (set) => ({
    setTeam: (newTeam: DebateRole) => set(() => ({ team: newTeam })),
  }))
);
