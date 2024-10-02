import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../shared/axiosApi";
import { RoomCardType } from "../../../shared/type";
import { QueryString } from "../../room/api/query";

export type GetDebateRoomsResponse = RoomCardType[]

export const getDebateRooms = async (
  status: string
): Promise<GetDebateRoomsResponse> =>  {
  const response = await axios.get(`/chat/chatrooms`, {
    params: {sort: "createdAt", order: "desc", status, page:"0", size: "24" } as QueryString
  });
  return response.data 
} 

export const useGetStartedDebateQuery = () => {
  return useQuery({
    queryKey: ["getStartedDebate"],
    queryFn: async () => getDebateRooms("STARTED"),
    refetchInterval: 20000,
    retry: 1,
  });
}

export const useGetCreatedDebateQuery = () => {
  return useQuery({
    queryKey: ["getCreatedDebate"],
    queryFn: async () => getDebateRooms("CREATED"),
    refetchInterval: 20000,
    retry: 1,
  });
}
