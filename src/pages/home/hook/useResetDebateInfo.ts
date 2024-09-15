import { useEffect } from "react";
import { useDebateMemoStore } from "../../../widgets/debateMemo/model/store";
import { useUserInfoStore } from "../../../entities/debateInfo";

export const useResetDebateInfo = () => {
  useEffect(() => {
    const persistStores = [useUserInfoStore, useDebateMemoStore];
    persistStores.forEach((useStore) => {
      const reset = useStore.getState().reset;
      if (typeof reset === "function") {
        reset();
      }
    });
  }, []);
};
