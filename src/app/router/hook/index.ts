import { useContext, useEffect } from "react";
import { useDebateMemoStore } from "../../../widgets/debateMemo/model/store";
import { useSubMessageStore } from "../../../widgets/teamChat/model/store";
import { useisOwnerStore } from "../../../features/createDebate/model/store";
import { useWebSocketErrorStore, useWebSocketTimeOutStore } from "../../../pages/debate/model/store";
import { useUserInfoStore } from "../../../entities/debateInfo";
import { AlertContext } from "../../../entities/alertDialog/model/context";
import { useEnterDebateMutaion } from "../../../features/enterDebate/api/query";
import { getDebateInfo } from "../../../pages/debate/api/query";

export const useResetDebateInfo = () => {
  const setTimeoutError = useWebSocketTimeOutStore((state) => state.setError);
  const setWebsocketError = useWebSocketErrorStore((state) => state.setError);
  useEffect(() => {
    const persistStores = [useDebateMemoStore, useSubMessageStore];
    persistStores.forEach((useStore) => {
      useStore.getState().reset();
    });
    setWebsocketError("");
    setTimeoutError("");
  }, [setTimeoutError, setWebsocketError]);
};

export const useRejoinDebate = () => {
  const { id, memberId, role, nickName } = useUserInfoStore((state) => state);
  const { alert } = useContext(AlertContext);
  const { mutate } = useEnterDebateMutaion();
  const isOwner = useisOwnerStore((state) => state.isOwner);
  const rejoinDebate = () => mutate({ nickName, role, ownerId: isOwner ? memberId : undefined, memberId });

  const resetUserInfo = useUserInfoStore((state) => state.reset);
  const resetisOwner = useisOwnerStore((state) => state.reset);
  const resetState = () => {
    resetUserInfo();
    resetisOwner();
  };

  useEffect(() => {
    const handleRejoinDebate = async () => {
      if (!memberId) return;

      try {
        const response = await getDebateInfo(id);
        const isUserInDebate = response.participants.some((user) => user.nickName === nickName);

        if (!isUserInDebate) return resetState();
        await alert(
          "이전 채팅방에 기록이 있습니다. 재접속 하시겠습니까?",
          "재접속",
          "취소",
          rejoinDebate,
          resetState
        );
      } finally {
        resetState();
      }
    };
    handleRejoinDebate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
