import { useContext } from "react";
import { useDebateInfoStore } from "../../../entities/debateInfo";
import { axios } from "../../../shared/axiosApi";
import { ServerResponse } from "../../../shared/axiosApi/model/axiosInstance";
import { AlertContext } from "../../../entities/alertDialog/model/context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetDebateSettingKey } from "../../../widgets/debateHome/api/query";
import { AxiosError } from "axios";

export type ChangeDescriptionRequest = {
  ownerId: string;
  description: string;
};

export const ChangeDescriptionKey = "/changeDescription";

export const useChangeDescriptionQuery = () => {
  const id = useDebateInfoStore((state) => state.id);
  const patchChangeDescription = (data: ChangeDescriptionRequest): Promise<ServerResponse<never>> =>
    axios.patch(`/chat/${id}/description`, data);
  const { alert } = useContext(AlertContext);
  const queryclient = useQueryClient();

  return useMutation({
    mutationKey: [ChangeDescriptionKey],
    mutationFn: (data: ChangeDescriptionRequest) => patchChangeDescription(data),
    onSuccess: async () => {
      await alert("변경 완료하였습니다.", "확인");
      queryclient.refetchQueries({ queryKey: [GetDebateSettingKey], exact: true})
    },
    onError: async (error: AxiosError<ServerResponse>) => {
      await alert(`${error.response?.data.message}`, "확인");
    },
  });
};
