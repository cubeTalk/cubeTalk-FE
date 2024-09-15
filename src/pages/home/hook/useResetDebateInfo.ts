import { useEffect } from "react";
import { useInfoStore } from "../../../entities/debateInfo";
import { useParticipantsStore } from "../../../entities/participants/model/store";
import { useRoomSettingStore } from "../../../entities/debateSetting/model/store";
import { useDebateMemoStore } from "../../../widgets/debateMemo/model/store";

export const useResetDebateInfo = () => {
  useEffect(() => {
    const persistStores = [
      useInfoStore,
      useDebateMemoStore,
      useParticipantsStore,
      useRoomSettingStore,
    ];
    persistStores.forEach((useStore) => {
      const reset = useStore.getState().reset;
      if (typeof reset === "function") {
        reset();
      }
    });
  }, []);
};
