import { useMutation } from "@tanstack/react-query";
import { DebateRole, UserInfo } from "../../../shared/type";
import { AxiosError } from "axios";
import { axios } from "../../../shared/axiosApi";
import { useContext } from "react";
import { AlertContext } from "../../../entities/alertDialog/model/context";
import { useEnterDebateStore, useEnterModalStore } from "../model/store";
import { useNavigate } from "react-router-dom";
import { ServerResponse } from "../../../shared/axiosApi/model/axiosInstance";
import { useUserInfoStore } from "../../../entities/debateInfo";

export type EnterDebateRequest = {
  nickName: string; // 토론 참가자 닉네임
  role: DebateRole; // 토론 역할
  ownerId?: string; // 토론 방장 ID
  memberId?: string; // 재접속인경우
};
export type EnterDebateResponse = UserInfo;

export const EnterDebateKey = "/enterDebate";

const postEnterDebate = async (
  data: EnterDebateRequest,
  id: string
): Promise<EnterDebateResponse> => {
  const response = await axios.post(`/chat/${id}/participants`, data);
  return response.data;
};

export const useEnterDebateMutaion = () => {
  const id = useUserInfoStore((state) => state.id);
  const setInfo = useUserInfoStore((state) => state.setInfo);
  const setCheckName = useEnterDebateStore((state) => state.actions.setCheckName);
  const navigate = useNavigate();
  const closeEnterDebateModal = useEnterModalStore((state) => state.closeModal);
  const { alert } = useContext(AlertContext);

  return useMutation({
    mutationKey: [EnterDebateKey],
    mutationFn: (data: EnterDebateRequest) => postEnterDebate(data, id),
    onSuccess: (data: EnterDebateResponse, variables) => {
      if (data) {
        setInfo({ ...data, role: variables.role });
        setCheckName("");
        closeEnterDebateModal();
        setTimeout(() => navigate(`/debate/${data.id}`), 0);
      }
    },
    onError: async (error: AxiosError<ServerResponse>, variables) => {
      if (error.response?.data?.message === "이미 사용중인 닉네임 입니다.") {
        setCheckName(variables.nickName);
      }
      if (error.response?.status === 500) {
        await alert("서버가 아파요! 잠시후 다시 시도해주세요!", "확인");
      } else {
        await alert(`${error.response?.data.message}`, "확인");
      }
    },
  });
};
