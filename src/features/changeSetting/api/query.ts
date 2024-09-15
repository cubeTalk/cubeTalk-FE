import { useContext } from "react";
import { useDebateInfoStore } from "../../../entities/debateInfo";
import { axios } from "../../../shared/axiosApi";
import { ServerResponse } from "../../../shared/axiosApi/model/axiosInstance";
import { DebateSetting } from "../../../shared/type";
import { AlertContext } from "../../../entities/alertDialog/model/context";
import { useSettingChangeModalStore } from "../model/store";
import { useMutation } from "@tanstack/react-query";

export type ChangeSettingRequest = DebateSetting;

export const ChangeSettingKey = "/changeSetting";

export const useChangeSettingQuery = () => {
  const id = useDebateInfoStore((state) => state.id);
  const patchChangeSetting = (data: ChangeSettingRequest): Promise<ServerResponse<never>> =>
    axios.patch(`/chat/${id}/settings`, data);
  const { alert } = useContext(AlertContext);
  const closeCreateDebateModal = useSettingChangeModalStore((state) => state.closeModal);

  return useMutation({
    mutationKey: [ChangeSettingKey],
    mutationFn: (data: ChangeSettingRequest) => patchChangeSetting(data),
    onSuccess: () => {
      closeCreateDebateModal();
    },
    onError: async () => {
      await alert("토론방 설정 변경에 실패했습니다. 다시 시도해주세요", "확인");
    },
  });
};
