import { useContext, useEffect } from "react";
import { useDebateInfoStore, useUserInfoStore } from "../../../entities/debateInfo";
import { useRoomSettingStore } from "../../../entities/debateSetting/model/store";
import { useParticipantsStore } from "../../../entities/participants/model/store";
import { useisOwnerStore } from "../../../features/createDebate/model/store";
import { hasFreeSetting, hasProsConsSetting } from "../../../shared/type";
import { useGetDebateInfoQuery } from "../api/query";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../../entities/alertDialog/model/context";

export const useFetchandUpdateData = () => {
  const updateDebateInfo = useDebateInfoStore((state) => state.setInfo);
  const resetSettings = useRoomSettingStore((state) => state.resetSettings);
  const setIsOwner = useisOwnerStore((state) => state.actions.setIsOwner);
  const memberId = useUserInfoStore((state) => state.memberId);
  const resetParticipants = useParticipantsStore((state) => state.actions.resetParticipants);
  const { data, isError } = useGetDebateInfoQuery();
  
  const navigate = useNavigate();
  const { alert } = useContext(AlertContext);
  useEffect(() => {
    if (isError) {
      alert("토론방 정보를 가져오는데 실패하였습니다. 다시 참가해 주세요", "확인");
      navigate("/");
    }
  }, [isError, alert, navigate]);



  useEffect(() => {
    if (data && data.data) {
      const debateInfo = data.data;
      updateDebateInfo({
        id: debateInfo.id,
        chatMode: debateInfo.chatMode,
        chatStatus: debateInfo.chatStatus,
        description: debateInfo.description,
        title: debateInfo.title,
      });
      resetSettings({
        maxParticipants: debateInfo.maxParticipants,
        chatDuration: hasFreeSetting(debateInfo),
        debateSettings: hasProsConsSetting(debateInfo),
      });
      resetParticipants(debateInfo.participants);
      if (debateInfo.ownerId === memberId) {
        setIsOwner();
      }
    }
  }, [data, memberId, resetParticipants, resetSettings, setIsOwner, updateDebateInfo]);
}