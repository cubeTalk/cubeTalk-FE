import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../shared/axiosApi";
import { DebateRoomType } from "../../../shared/type";
import { useUserInfoStore } from "../../../entities/debateInfo";

export type GetDebateRoomResponse = DebateRoomType;

export const getDebateInfo = async (id: string): Promise<GetDebateRoomResponse> => {
  const response = await axios.get(`/chat/${id}`);
  return response.data;
};

export const GetDebateInfoKey = "getDebateInfo";

export const useGetDebateInfoQuery = () => {
  const debateRoomId = useUserInfoStore((state) => state.id);
  return useQuery({
    queryKey: [GetDebateInfoKey],
    queryFn: () => getDebateInfo(debateRoomId),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 60000,
  });
};
