import { useMutation } from "@tanstack/react-query";
import { axios } from "../../../shared/axiosApi";
import { useContext } from "react";
import { AlertContext } from "../../../entities/alertDialog/model/context";
import { useEnterModalStore } from "../../enterDebate/model/store";
import { useCreateDebateModalStore, useisOwnerStore } from "../model/store";
import { ServerResponse } from "../../../shared/axiosApi/model/axiosInstance";
import { DebateRoomBaseType } from "../../../shared/type";
import { useUserInfoStore } from "../../../entities/debateInfo";

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
  const setIds = useUserInfoStore((state) => state.setIds);

  const setIsOwner = useisOwnerStore((state) => state.actions.setIsOwner);

  return useMutation({
    mutationKey: [CreateDebateKey],
    mutationFn: (data: CreateDebateRoomRequest) => postCreateDebate(data),
    onSuccess: (data: ServerResponse<CreateDebateRoomResponse>) => {
      const response = data.data;
      if (!response) return;
      setIds(response);
      setIsOwner();
      closeCreateDebateModal();
      openEnterDebateModal();
    },
    onError: async () => {
      await alert("토론방 생성에 실패했습니다. 나중에 다시 시도해주세요", "확인");
    },
  });
};
