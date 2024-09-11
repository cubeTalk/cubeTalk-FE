import { useMutation } from "@tanstack/react-query";
import { axios } from "../../../shared/axiosApi";
import { DebateRoomBase } from "../../../shared/type";
import { useContext } from "react";
import { AlertContext } from "../../../entities/alertDialog/model/context";
import { useEnterModalStore } from "../../enterDebate/model/store";
import { useInfoStore } from "../../../entities/debateInfo";
import { useCreateDebateModalStore } from "../model/store";
import { ServerResponse } from "../../../shared/axiosApi/model/axiosInstance";

type PostDebateRoomRequest = DebateRoomBase;
type PostDebateRoomResponse = {
  id: string; // 토론방 ID
  memberId: string; // 사용자 UUID
};

export const CreateRoomKey = "/createRoom";

export const useCreateRoomQuery = () => {
  const updateDebateInfo = useInfoStore((state) => state.updateDebateInfo);
  const updateUserInfo = useInfoStore((state) => state.updateUserInfo);
  const postCreateRoom = (
    data: PostDebateRoomRequest
  ): Promise<ServerResponse<PostDebateRoomResponse>> => axios.post("/chat", data);
  const { alert } = useContext(AlertContext);
  const openEnterDebateModal = useEnterModalStore((state) => state.openModal);
  const closeCreateDebateModal = useCreateDebateModalStore((state) => state.closeModal);

  return useMutation({
    mutationKey: [CreateRoomKey],
    mutationFn: (data: PostDebateRoomRequest) => postCreateRoom(data),
    onSuccess: (data: ServerResponse<PostDebateRoomResponse>) => {
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
