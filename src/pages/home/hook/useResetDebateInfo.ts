import { useEffect } from "react";
import { useDebateMemoStore } from "../../../widgets/debateMemo/model/store";
import { useUserInfoStore } from "../../../entities/debateInfo";
import { useSubMessageStore } from "../../../widgets/teamChat/model/store";

export const useResetDebateInfo = () => {
  useEffect(() => {
    const persistStores = [useUserInfoStore, useDebateMemoStore, useSubMessageStore];
    persistStores.forEach((useStore) => {
      useStore.getState().reset();
    });
  }, []);
};
