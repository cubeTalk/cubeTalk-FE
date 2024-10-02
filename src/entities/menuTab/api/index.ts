import { useMutation } from "@tanstack/react-query";
import { axios } from "../../../shared/axiosApi";
import { useUserInfoStore } from "../../debateInfo";
import { useContext } from "react";
import { AlertContext } from "../../alertDialog/model/context";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { ServerResponse } from "../../../shared/axiosApi/model/axiosInstance";

const debateOut = async (id: string, memberId: string) => {
  axios.delete(`/chat/${id}/member/${memberId}`);
};

export const useDebateOutMutate = () => {
  const id = useUserInfoStore((state) => state.id);
  const memberId = useUserInfoStore((state) => state.memberId);
  const { alert } = useContext(AlertContext);
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["DebateOut"],
    mutationFn: () => debateOut(id, memberId),
    onSuccess: () => {
      navigate("/room");
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
