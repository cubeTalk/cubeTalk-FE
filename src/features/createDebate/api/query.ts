import { useMutation } from "@tanstack/react-query";
import { axios } from "../../../shared/axiosApi";
import { useContext } from "react";
import { AlertContext } from "../../../entities/alertDialog/model/context";
import { useEnterModalStore } from "../../enterDebate/model/store";
import { useInfoStore } from "../../../entities/debateInfo";
import { useCreateDebateModalStore } from "../model/store";
import { ServerResponse } from "../../../shared/axiosApi/model/axiosInstance";
import { DebateRoomBaseType } from "../../../shared/type";

export type CreateDebateRoomRequest = DebateRoomBaseType;
export type CreateDebateRoomResponse = {
  id: string; // 토론방 ID
  memberId: string; // 사용자 UUID
};

export const CreateRoomKey = "/createRoom";

export const useCreateRoomQuery = () => {
  const updateDebateInfo = useInfoStore((state) => state.updateDebateInfo);
  const updateUserInfo = useInfoStore((state) => state.updateUserInfo);
  const postCreateRoom = (
    data: CreateDebateRoomRequest
  ): Promise<ServerResponse<CreateDebateRoomResponse>> => axios.post("/chat", data);
  const { alert } = useContext(AlertContext);
  const openEnterDebateModal = useEnterModalStore((state) => state.openModal);
  const closeCreateDebateModal = useCreateDebateModalStore((state) => state.closeModal);

  return useMutation({
    mutationKey: [CreateRoomKey],
    mutationFn: (data: CreateDebateRoomRequest) => postCreateRoom(data),
    onSuccess: (data: ServerResponse<CreateDebateRoomResponse>) => {
      const response = data.data;
      if (!response) return;
      updateDebateInfo({ id: response.id });
      updateUserInfo({ memberId: response.memberId, isOwner: true });
      closeCreateDebateModal();
      openEnterDebateModal();
    },
    onError: async () => {
      await alert("토론방 생성에 실패했습니다. 나중에 다시 시도해주세요", "확인");
    },
  });
};
