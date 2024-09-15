import { useMutation } from "@tanstack/react-query";
import {
  DebateRole,
  DebateRoomType,
  hasFreeSetting,
  hasProsConsSetting,
  UserInfo,
} from "../../../shared/type";
import { AxiosError } from "axios";
import { axios } from "../../../shared/axiosApi";
import { useInfoStore } from "../../../entities/debateInfo";
import { useContext } from "react";
import { AlertContext } from "../../../entities/alertDialog/model/context";
import { useParticipantsStore } from "../../../entities/participants/model/store";
import { useRoomSettingStore } from "../../../entities/debateSetting/model/store";
import { useEnterDebateStore, useEnterModalStore } from "../model/store";
import { useNavigate } from "react-router-dom";
import { ServerResponse } from "../../../shared/axiosApi/model/axiosInstance";

export type EnterDebateRequest = {
  nickName: string; // 토론 참가자 닉네임
  role: DebateRole; // 토론 역할
  ownerId?: string; // 토론 방장 ID
};
export type EnterDebateResponse = UserInfo & DebateRoomType;

export const EnterDebateKey = "/enterDebate";

export const useEnterDebateQuery = () => {
  const id = useInfoStore((state) => state.debateInfo.id);
  const postEnterDebate = (
    data: EnterDebateRequest
  ): Promise<ServerResponse<EnterDebateResponse>> => axios.post(`/chat/${id}/participants`, data);

  const updateSubscribeInfo = useInfoStore((state) => state.updateSubscribeInfo);
  const updateUserInfo = useInfoStore((state) => state.updateUserInfo);
  const updateDebateInfo = useInfoStore((state) => state.updateDebateInfo);
  const resetSettings = useRoomSettingStore((state) => state.resetSettings);
  const resetParticipants = useParticipantsStore((state) => state.resetParticipants);
  const setCheckName = useEnterDebateStore((state) => state.actions.setCheckName);
  const navigate = useNavigate();
  const closeEnterDebateModal = useEnterModalStore((state) => state.closeModal);
  const { alert } = useContext(AlertContext);

  return useMutation({
    mutationKey: [EnterDebateKey],
    mutationFn: (data: EnterDebateRequest) => postEnterDebate(data),
    onSuccess: (data: ServerResponse<EnterDebateResponse>, variables) => {
      const response = data.data;
      if (!response) return;
      updateUserInfo({
        memberId: response.memberId,
        nickName: response.nickName,
        severTimeStamp: response.severTimeStamp,
        role: variables.role,
      });
      updateSubscribeInfo({
        channelId: response.channelId,
        subChannelId: response.subChannelId,
      });
      updateDebateInfo({
        id: response.id,
        chatMode: response.chatMode,
        chatStatus: response.chatStatus,
        description: response.description,
        title: response.title,
      });
      resetSettings({
        maxParticipants: response.maxParticipants,
        chatDuration: hasFreeSetting(response),
        debateSettings: hasProsConsSetting(response),
      });
      resetParticipants(response.participants);
      closeEnterDebateModal();
      navigate(`/debate/${response.id}`);
    },
    onError: async (error: AxiosError<ServerResponse>, variables) => {
      if (error.response?.data?.message === "이미 사용중인 닉네임 입니다.") {
        setCheckName(variables.nickName);
        await alert("이미 사용중인 닉네임 입니다.", "확인");
      } else {
        await alert("토론 참가에 실패했습니다. 다시 시도해주세요", "확인");
      }
    },
  });
};
