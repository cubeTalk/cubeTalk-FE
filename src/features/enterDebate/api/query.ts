import { useMutation } from "@tanstack/react-query";
import {
  DebateRole,
  UserInfo,
} from "../../../shared/type";
import { AxiosError } from "axios";
import { axios } from "../../../shared/axiosApi";
import { useContext } from "react";
import { AlertContext } from "../../../entities/alertDialog/model/context";
import { useEnterDebateStore, useEnterModalStore } from "../model/store";
import { useNavigate } from "react-router-dom";
import { ServerResponse } from "../../../shared/axiosApi/model/axiosInstance";
import { useDebateInfoStore, useUserInfoStore } from "../../../entities/debateInfo";

export type EnterDebateRequest = {
  nickName: string; // 토론 참가자 닉네임
  role: DebateRole; // 토론 역할
  ownerId?: string; // 토론 방장 ID
};
export type EnterDebateResponse = UserInfo;

export const EnterDebateKey = "/enterDebate";

export const useEnterDebateQuery = () => {
  const id = useDebateInfoStore((state) => state.id);
  const postEnterDebate = (
    data: EnterDebateRequest
  ): Promise<ServerResponse<EnterDebateResponse>> => axios.post(`/chat/${id}/participants`, data);

  const setInfo = useUserInfoStore((state) => state.setInfo);
  const setCheckName = useEnterDebateStore((state) => state.actions.setCheckName);
  const navigate = useNavigate();
  const closeEnterDebateModal = useEnterModalStore((state) => state.closeModal);
  const { alert } = useContext(AlertContext);

  return useMutation({
    mutationKey: [EnterDebateKey],
    mutationFn: (data: EnterDebateRequest) => postEnterDebate(data),
    onSuccess: (data: ServerResponse<EnterDebateResponse>, variables) => {
      if (data && data.data) {
        const response = data.data;
        setInfo({ ...data.data, role: variables.role });
        closeEnterDebateModal();
        navigate(`/debate/${response.id}`);
      }
    },
    onError: async (error: AxiosError<ServerResponse>, variables) => {
      if (error.response?.data?.message === "이미 사용중인 닉네임 입니다.") {
        setCheckName(variables.nickName);
      } 
      await alert(`${error.response?.data.message}`, "확인");
    },
  });
};
