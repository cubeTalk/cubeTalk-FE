import { useContext, useEffect } from "react";
import { useDebateInfoStore, useUserInfoStore } from "../../../entities/debateInfo";
import { useRoomSettingStore } from "../../../entities/debateSetting/model/store";
import { useisOwnerStore } from "../../../features/createDebate/model/store";
import { hasFreeSetting, hasProsConsSetting } from "../../../shared/type";
import { useGetDebateInfoQuery } from "../api/query";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../../entities/alertDialog/model/context";
import { useGetMessagesQuery } from "../../../widgets/mainChat/api/query";
import { useMainMessageStore } from "../../../widgets/mainChat/model/store";
import { useQueryClient } from "@tanstack/react-query";
import { GetParticipantsKey } from "../../../entities/participants/api/query";

export const useUpdateMessageList = () => {
  const { data, isError, isPending } = useGetMessagesQuery();
  const messageUpdate = useMainMessageStore((state) => state.actions.messageUpdate);
  const nickName = useUserInfoStore((state) => state.nickName);
  const role = useUserInfoStore((state) => state.role);
  const { alert } = useContext(AlertContext);
  useEffect(() => {
    if (isError) {
      alert("메세지를 불러오기를 실패하였습니다. F5를 눌러 새로고침 해주세요", "확인");
    }
  }, [alert, isError]);

  useEffect(() => {
    if (data) {
      messageUpdate(data, nickName, role);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, messageUpdate, nickName]);

  return isPending;
};

export const useFetchandUpdateData = () => {
  const updateDebateInfo = useDebateInfoStore((state) => state.actions.setInfo);
  const resetSettings = useRoomSettingStore((state) => state.actions.resetSettings);
  const setIsOwner = useisOwnerStore((state) => state.actions.setIsOwner);
  const memberId = useUserInfoStore((state) => state.memberId);
  const queryClient = useQueryClient();
  const { data, isPending, isError } = useGetDebateInfoQuery();

  const navigate = useNavigate();
  const { alert } = useContext(AlertContext);
  useEffect(() => {
    if (isError) {
      alert("토론방 정보를 가져오는데 실패하였습니다. 다시 참가해 주세요", "확인");
      navigate("/");
    }
  }, [isError, alert, navigate]);

  useEffect(() => {
    if (data) {
      const debateInfo = data;
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
      queryClient.setQueryData([GetParticipantsKey], () => debateInfo.participants);
      if (debateInfo.ownerId === memberId) {
        setIsOwner();
      }
    }
  }, [data, memberId, queryClient, resetSettings, setIsOwner, updateDebateInfo]);
  return isPending;
};
