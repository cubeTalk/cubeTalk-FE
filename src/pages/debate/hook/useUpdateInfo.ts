import { useContext, useEffect } from "react";
import { useDebateInfoStore, useUserInfoStore } from "../../../entities/debateInfo";
import { useRoomSettingStore } from "../../../entities/debateSetting/model/store";
import { hasFreeSetting, hasProsConsSetting } from "../../../shared/type";
import { useGetDebateInfoQuery } from "../api/query";
import { useNavigate, useParams } from "react-router-dom";
import { AlertContext } from "../../../entities/alertDialog/model/context";
import { useGetMessagesQuery } from "../../../widgets/mainChat/api/query";
import { useMainMessageStore } from "../../../widgets/mainChat/model/store";
import { useParticipantsStore } from "../../../entities/participants/model/store";
import { useisOwnerStore } from "../../../features/createDebate/model/store";

export const useUpdateMessageList = () => {
  const { data, isError, isPending } = useGetMessagesQuery();
  const messageUpdate = useMainMessageStore((state) => state.actions.messageUpdate);
  const nickName = useUserInfoStore((state) => state.nickName);
  const { alert } = useContext(AlertContext);
  useEffect(() => {
    if (isError) {
      const alertMessage = async () =>
        await alert(
          "서버로 부터 메인 채팅방 메세지 불러오기를 실패하였습니다. 다시 참가해 주세요",
          "확인"
        );
      alertMessage();
    }
  }, [alert, isError]);

  useEffect(() => {
    if (data) {
      messageUpdate(data, nickName);
    }
  }, [data, messageUpdate, nickName]);

  return isPending;
};

export const useFetchandUpdateData = () => {
  const { debateRoomId = "" } = useParams();
  const { data, isPending, isError } = useGetDebateInfoQuery(debateRoomId);
  const resetParticipants = useParticipantsStore((state) => state.actions.resetParticipants);
  const updateDebateInfo = useDebateInfoStore((state) => state.actions.setInfo);
  const resetSettings = useRoomSettingStore((state) => state.actions.resetSettings);
  const memberId = useUserInfoStore((state) => state.memberId);
  const actions = useisOwnerStore((state) => state.actions);
  const navigate = useNavigate();
  const { alert } = useContext(AlertContext);
  useEffect(() => {
    if (isError) {
      const alertMessage = async () =>
        alert("토론방 정보를 가져오는데 실패하였습니다. 다시 참가해 주세요", "확인", "", () =>
          navigate("/")
        );
      alertMessage();
    }
  }, [isError, alert, navigate]);

  useEffect(() => {
    if (data) {
      const debateInfo = data;
      const debateSetting =
        debateInfo.chatMode === "자유"
          ? {
              maxParticipants: debateInfo.maxParticipants,
              chatDuration: hasFreeSetting(debateInfo),
            }
          : {
              maxParticipants: debateInfo.maxParticipants,
              debateSettings: hasProsConsSetting(debateInfo),
            };

      console.log(data);
      resetSettings(debateSetting);
      updateDebateInfo({
        id: debateInfo.id,
        chatMode: debateInfo.chatMode,
        chatStatus: debateInfo.chatStatus,
        description: debateInfo.description,
        title: debateInfo.title,
      });
      resetParticipants(debateInfo.participants);
      if (memberId === data.ownerId) {
        actions.setIsOwner();
      } else {
        actions.setIsNotOwner();
      }
    }
  }, [actions, data, memberId, resetParticipants, resetSettings, updateDebateInfo]);

  useEffect(() => {
    if (data?.chatStatus === "ENDED") {
      const alertMessage = async () =>
        alert("토론이 종료되었습니다. 메인화면으로 이동합니다.", "이동", "", () => navigate("/"));
      alertMessage();
    }
  }, [alert, data?.chatStatus, navigate]);

  return isPending;
};
