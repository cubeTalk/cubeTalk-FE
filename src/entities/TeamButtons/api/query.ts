import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../shared/axiosApi";
import { ServerResponse } from "../../../shared/axiosApi/model/axiosInstance";
import { useDebateInfoStore } from "../../debateInfo";

export type GetDebateParticipantsResponse = {
  id: string;
  maxCapacityCount: number;
  totalParticipants: number;
  supportCount: number;
  oppositeCount: number;
  spectatorCount: number;
};

export const getDebateParticipants = (
  id: string
): Promise<ServerResponse<GetDebateParticipantsResponse>> =>
  axios.get(`/chat/${id}/participants`);


export const useDebateParticipantsQuery = () => {
  const id = useDebateInfoStore((state) => state.id);
  return useQuery({
    queryKey: ["getDebateParticipants"],
    queryFn: async () => getDebateParticipants(id),
    refetchInterval: 5000,
  });
}
