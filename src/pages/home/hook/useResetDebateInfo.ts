import { useEffect } from "react";
import { useDebateMemoStore } from "../../../widgets/debateMemo/model/store";
import { useSubMessageStore } from "../../../widgets/teamChat/model/store";
import { useisOwnerStore } from "../../../features/createDebate/model/store";
import { useWebSocketErrorStore, useWebSocketTimeOutStore } from "../../debate/model/store";

export const useResetDebateInfo = () => {
  const setTimeoutError = useWebSocketTimeOutStore((state) => state.setError);
  const setWebsocketError = useWebSocketErrorStore((state) => state.setError);
  useEffect(() => {
    const persistStores = [
      useDebateMemoStore,
      useSubMessageStore,
      useisOwnerStore,
    ];
    persistStores.forEach((useStore) => {
      useStore.getState().reset();
    });
    setWebsocketError("");
    setTimeoutError("");
  }, [setTimeoutError, setWebsocketError]);
};
