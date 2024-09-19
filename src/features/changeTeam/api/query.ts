import { useContext } from "react";
import { useUserInfoStore } from "../../../entities/debateInfo";
import { axios } from "../../../shared/axiosApi";
import { AlertContext } from "../../../entities/alertDialog/model/context";
import { useChangeTeamModalStore } from "../model/store";
import { useMutation } from "@tanstack/react-query";
import { ChatMessage, DebateRole } from "../../../shared/type";
import webSocket from "../../../shared/webSocket";
import { useSubMessageStore } from "../../../widgets/teamChat/model/store";
import { IMessage } from "@stomp/stompjs";

export type ChangeTeamRequest = { role: DebateRole; subChannelId: string };
export type ChangeTeamResponse = {
  id: string;
  channeldId: string;
  newSubChannelId: string;
  previousSubChannelId: string;
};

export const ChangeTeamKey = "/changeTeam";

const patchChangeTeam = async (
  data: ChangeTeamRequest,
  id: string,
  memberId: string
): Promise<ChangeTeamResponse> => {
  const response = await axios.patch(`/chat/${id}/role/${memberId}`, data);
  return response.data;
};

export const useChangeTeamQuery = () => {
  const id = useUserInfoStore((state) => state.id);
  const memberId = useUserInfoStore((state) => state.memberId);
  const nickName = useUserInfoStore((state) => state.nickName);
  const { alert } = useContext(AlertContext);
  const closeModal = useChangeTeamModalStore((state) => state.closeModal);
  const changeTeam = useUserInfoStore((state) => state.changeTeam);
  const subMessageAdd = useSubMessageStore((state) => state.messageAdd);
  const reset = useSubMessageStore((state) => state.reset);
  return useMutation({
    mutationKey: [ChangeTeamKey],
    mutationFn: (data: ChangeTeamRequest) => patchChangeTeam(data, id, memberId),
    onSuccess: (data, variables) => {
      closeModal();
      reset();
      changeTeam(variables.role, data.newSubChannelId);
      const subChatCallback = (message: IMessage) => {
        const chatMessage: ChatMessage = JSON.parse(message.body);
        subMessageAdd(chatMessage, nickName);
      };
      webSocket.changeTeam(data.previousSubChannelId, data.newSubChannelId, subChatCallback);
    },
    onError: async () => {
      await alert("설정 변경에 실패했습니다. 다시 시도해주세요", "확인");
    },
  });
};
