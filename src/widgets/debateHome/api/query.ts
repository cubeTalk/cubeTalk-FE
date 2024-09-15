import { useContext } from "react";
import { useDebateInfoStore } from "../../../entities/debateInfo";
import { axios } from "../../../shared/axiosApi";
import { ServerResponse } from "../../../shared/axiosApi/model/axiosInstance";
import { AlertContext } from "../../../entities/alertDialog/model/context";
import { useMutation } from "@tanstack/react-query";

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

  return useMutation({
    mutationKey: [ChangeDescriptionKey],
    mutationFn: (data: ChangeDescriptionRequest) => patchChangeDescription(data),
    onSuccess: async () => {
      await alert("변경 완료하였습니다.", "확인");
    },
    onError: async () => {
      await alert("토론방 설명 변경에 실패했습니다. 다시 시도해주세요", "확인");
    },
  });
};
