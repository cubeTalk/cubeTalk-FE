import { useQuery } from "@tanstack/react-query";
import { getDebateInfo } from "../../../pages/debate/api/query";
import { useUserInfoStore } from "../../debateInfo";

export const GetParticipantsKey = "getParticipants";

export const useGetParticipantsQuery = () => {
  const debateRoomId = useUserInfoStore(state => state.id);
  return useQuery({
    queryKey: [GetParticipantsKey],
    queryFn: async () => {
      const reponse = await getDebateInfo(debateRoomId);
      return reponse.participants;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}