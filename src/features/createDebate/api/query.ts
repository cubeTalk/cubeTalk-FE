import { useMutation } from "@tanstack/react-query";
import { axios } from "../../../shared/axiosApi";
import { useContext } from "react";
import { AlertContext } from "../../../entities/alertDialog/model/context";
import { useEnterModalStore } from "../../enterDebate/model/store";
import { useCreateDebateModalStore, useisOwnerStore } from "../model/store";
import { ServerResponse } from "../../../shared/axiosApi/model/axiosInstance";
import { DebateRoomBaseType } from "../../../shared/type";
import { useDebateInfoStore, useUserInfoStore } from "../../../entities/debateInfo";
import { AxiosError } from "axios";

export type CreateDebateRoomRequest = DebateRoomBaseType;
export type CreateDebateRoomResponse = {
  id: string; // 토론방 ID
  memberId: string; // 사용자 UUID
};

export const CreateDebateKey = "/createDebate";

export const useCreateDebateQuery = () => {
  const postCreateDebate = (
    data: CreateDebateRoomRequest
  ): Promise<ServerResponse<CreateDebateRoomResponse>> => axios.post("/chat", data);
  const { alert } = useContext(AlertContext);
  const openEnterDebateModal = useEnterModalStore((state) => state.openModal);
  const closeCreateDebateModal = useCreateDebateModalStore((state) => state.closeModal);
  const setId = useDebateInfoStore((state) => state.actions.setId);
  const setMemberId = useUserInfoStore((state) => state.setMemberId);
  const setIsOwner = useisOwnerStore((state) => state.actions.setIsOwner);

  return useMutation({
    mutationKey: [CreateDebateKey],
    mutationFn: (data: CreateDebateRoomRequest) => postCreateDebate(data),
    onSuccess: (data: ServerResponse<CreateDebateRoomResponse>) => {
      const response = data.data;
      if (!response) return;
      setId(response.id);
      setMemberId(response.memberId);
      setIsOwner();
      closeCreateDebateModal();
      openEnterDebateModal(false);
    },
    onError: async (error: AxiosError<ServerResponse>) => {
      await alert(`${error.response?.data.message}`, "확인");
    },
  });
};
