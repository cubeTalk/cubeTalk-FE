import { useContext, useState } from "react";
import { readyMessage } from "../../../app/worker";
import { useDebateInfoStore, useUserInfoStore } from "../../../entities/debateInfo";
import { AlertContext } from "../../../entities/alertDialog/model/context";
import { useMutation } from "@tanstack/react-query";
import { axios } from "../../../shared/axiosApi";
import { AxiosError } from "axios";
import { ServerResponse } from "../../../shared/axiosApi/model/axiosInstance";

const startDebate = async (id: string, ownerId: string) => {
  const response = await axios.post(`/chat/${id}/start`, { ownerId });
  return response.data;
};

export const useStartMutate = () => {
  const id = useDebateInfoStore((state) => state.id);
  const memberId = useUserInfoStore((state) => state.memberId);
  const { alert } = useContext(AlertContext);

  return useMutation({
    mutationKey: ["startDebate"],
    mutationFn: () => startDebate(id, memberId),
    onError: (error: AxiosError<ServerResponse>) => {
      alert(`${error.response?.data.message}`, "확인");
    },
  });
};

export const useReadyMutate = () => {
  const memberId = useUserInfoStore((state) => state.memberId);
  const chatMode = useDebateInfoStore((state) => state.chatMode);
  const mutate = (myStatus: string) => {
    readyMessage({
      type: chatMode === "찬반" ? "찬반" : "자유",
      memberId,
      status: myStatus === "PENDING" ? "READY" : "PENDING",
    });
  };

  return mutate;
};

// export const useReadyMutate = () => {
//   const memberId = useUserInfoStore(state => state.memberId);
//   const chatMode = useDebateInfoStore(state => state.chatMode);
//   const updateMyStatus = useParticipantsStore(state => state.actions.updateMyStatus);
//   const { alert } = useContext(AlertContext);

//   return useMutation({
//     mutationKey: ["changeReady"],
//     mutationFn: async (myStatus: string) => readyMessage({
//       type: chatMode === "찬반" ? "찬반": "자유",
//       memberId,
//       status: myStatus === "PENDING" ? "READY" : "PENDING"
//     }),
//     onSuccess: (_, variables) => {
//       updateMyStatus(variables === "PENDING" ? "READY" : "PENDING");
//     },
//     onError: () => {
//       alert("상태변경에 실패하였습니다. 다시 시도해 주세요", "확인");
//     }
//   })
// }
