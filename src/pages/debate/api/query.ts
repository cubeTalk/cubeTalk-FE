import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../shared/axiosApi";
import { ServerResponse } from "../../../shared/axiosApi/model/axiosInstance";
import { DebateRoomType } from "../../../shared/type";
import { useParams } from "react-router-dom";

export type GetDebateRoomResponse = DebateRoomType;

export const getDebateInfo = (
  id: string | undefined
): Promise<ServerResponse<GetDebateRoomResponse>> => axios.get(`/chat/${id}`);


export const useGetDebateInfoQuery = () => {
  const { debateRoomId } = useParams();
  return useQuery({
    queryKey: ["getDebateInfo"],
    queryFn: async () => getDebateInfo(debateRoomId),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 60000,
  });
}