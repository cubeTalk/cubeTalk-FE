import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../shared/axiosApi";
import { useDebateInfoStore } from "../../debateInfo";

export type GetDebateParticipantsResponse = {
  id: string;
  maxCapacityCount: number;
  totalParticipants: number;
  supportCount: number;
  oppositeCount: number;
  spectatorCount: number;
  totalCount: number;
};

export const getDebateParticipants = async (
  id: string
): Promise<GetDebateParticipantsResponse> => {
  const response = await axios.get(`/chat/${id}/participants`);
  return response.data;
}


export const useDebateParticipantsQuery = () => {
  const id = useDebateInfoStore((state) => state.id);
  return useQuery({
    queryKey: ["getDebateParticipants"],
    queryFn: () => getDebateParticipants(id),
    refetchInterval: 5000,
  });
}
