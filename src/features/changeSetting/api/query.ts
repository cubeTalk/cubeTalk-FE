import { useContext } from "react";
import { useDebateInfoStore } from "../../../entities/debateInfo";
import { axios } from "../../../shared/axiosApi";
import { ServerResponse } from "../../../shared/axiosApi/model/axiosInstance";
import { DebateSetting } from "../../../shared/type";
import { AlertContext } from "../../../entities/alertDialog/model/context";
import { useSettingChangeModalStore } from "../model/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetDebateSettingKey } from "../../../widgets/debateHome/api/query";
import { AxiosError } from "axios";

export type ChangeSettingRequest = DebateSetting & { ownerId: string };

export const ChangeSettingKey = "/changeSetting";

export const useChangeSettingQuery = () => {
  const id = useDebateInfoStore((state) => state.id);
  const patchChangeSetting = (data: ChangeSettingRequest): Promise<ServerResponse<never>> =>
    axios.patch(`/chat/${id}/settings`, data);
  const { alert } = useContext(AlertContext);
  const closeCreateDebateModal = useSettingChangeModalStore((state) => state.closeModal);
  const queryclient = useQueryClient();

  return useMutation({
    mutationKey: [ChangeSettingKey],
    mutationFn: (data: ChangeSettingRequest) => patchChangeSetting(data),
    onSuccess: () => {
      closeCreateDebateModal();
      queryclient.refetchQueries({ queryKey: [GetDebateSettingKey], exact: true})
    },
    onError: async (error: AxiosError<ServerResponse>) => {
      if (error.response?.status === 500) {
        await alert("서버가 아파요! 잠시후 다시 시도해주세요!", "확인");  
      } else {
        await alert(`${error.response?.data.message}`, "확인");
      }
    },
  });
};
