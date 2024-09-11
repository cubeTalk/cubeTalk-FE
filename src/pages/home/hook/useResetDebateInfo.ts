import { useEffect } from "react";
import { useInfoStore } from "../../../entities/debateInfo";
import { useParticipantsStore } from "../../../entities/participants/model/store";
import { useRoomSettingStore } from "../../../entities/roomSetting/model/store";

export const useResetDebateInfo = () => {
  const resetDebateInfo = useInfoStore((state) => state.reset);
  const resetMemberInfo = useParticipantsStore((state) => state.reset);
  const resetSettings = useRoomSettingStore((state) => state.reset);
  useEffect(() => {
    resetDebateInfo();
    resetMemberInfo();
    resetSettings();
  }, [resetDebateInfo, resetMemberInfo, resetSettings]);
};
