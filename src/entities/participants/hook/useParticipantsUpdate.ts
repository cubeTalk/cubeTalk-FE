import { useContext, useEffect } from "react";
import { useGetParticipantsQuery } from "../api/query";
import { AlertContext } from "../../alertDialog/model/context";
import { useParticipantsStore } from "../model/store";
import { useUserInfoStore } from "../../debateInfo";

export const useParticipantsUpdate = () => {
  const { data, isPending, isError } = useGetParticipantsQuery();
  const resetParticipants = useParticipantsStore((state) => state.actions.resetParticipants);
  const updateMyStatus = useParticipantsStore((state) => state.actions.updateMyStatus);
  const nickName = useUserInfoStore((state) => state.nickName);
  const { alert } = useContext(AlertContext);
  if (isError) {
    alert("참가자 목록을 불러오는데 실패했습니다.", "확인");
  }
  useEffect(() => {
    if (data) {
      const excludedParticipants = data.filter((participant) => {
        if (participant.nickName === nickName) {
          updateMyStatus(participant.status);
          return false;
        }
        return true;
      });
      resetParticipants(excludedParticipants);
    }
  }, [data, nickName, resetParticipants, updateMyStatus]);
  return isPending;
};
