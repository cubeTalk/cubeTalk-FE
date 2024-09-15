import { useEffect } from "react";
import { useDebateMemoStore } from "../../../widgets/debateMemo/model/store";
import { useUserInfoStore } from "../../../entities/debateInfo";
import { useRoomSettingStore } from "../../../entities/debateSetting/model/store";

export const useResetDebateInfo = () => {
  useEffect(() => {
    const persistStores = [useUserInfoStore, useDebateMemoStore, useRoomSettingStore];
    persistStores.forEach((useStore) => {
      useStore.getState().reset();
    });
  }, []);
};
