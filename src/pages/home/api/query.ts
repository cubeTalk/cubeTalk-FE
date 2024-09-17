import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../shared/axiosApi";
import { ServerResponse } from "../../../shared/axiosApi/model/axiosInstance";
import { RoomCardType } from "../../../shared/type";

export type GetDebateRoomsResponse = RoomCardType[]

export type QueryString = {
  sort: "participants" | "createdAt";
  order?: "asc" | "desc";
  status?: "STARTED" | "CREATED";
  page?: string;
  size?: string;
}

export const getDebateRooms = (
  status: string
): Promise<ServerResponse<GetDebateRoomsResponse>> => axios.get(`/chat/chatrooms/찬반`, {
  params: { sort: "participants", order: "desc", status, page:"0", size: "5" } as QueryString
});

export const useGetStartedDebateQuery = () => {
  return useQuery({
    queryKey: ["getStartedDebate"],
    queryFn: async () => getDebateRooms("STARTED"),
    refetchInterval: 10000,
    retry: 1,
  });
}

export const useGetCreatedDebateQuery = () => {
  return useQuery({
    queryKey: ["getCreatedDebate"],
    queryFn: async () => getDebateRooms("CREATED"),
    refetchInterval: 10000,
    retry: 1,
  });
}
