import { useContext } from "react";
import { useUserInfoStore } from "../../../entities/debateInfo";
import { axios } from "../../../shared/axiosApi";
import { AlertContext } from "../../../entities/alertDialog/model/context";
import { useChangeTeamModalStore } from "../model/store";
import { useMutation } from "@tanstack/react-query";
import { DebateRole } from "../../../shared/type";
import { useSubMessageStore } from "../../../widgets/teamChat/model/store";
import { changeTeamWebSocket } from "../../../app/worker";

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
  const { alert } = useContext(AlertContext);
  const closeModal = useChangeTeamModalStore((state) => state.closeModal);
  const changeTeam = useUserInfoStore((state) => state.changeTeam);
  const reset = useSubMessageStore((state) => state.reset);
  return useMutation({
    mutationKey: [ChangeTeamKey],
    mutationFn: (data: ChangeTeamRequest) => patchChangeTeam(data, id, memberId),
    onSuccess: async (data, variables) => {
      changeTeamWebSocket(data.newSubChannelId)
      reset();
      changeTeam(variables.role, data.newSubChannelId);
      closeModal();
    },
    onError: async () => {
      await alert("팀 변경에 실패했습니다. 다시 시도해주세요", "확인");
    },
  });
};
