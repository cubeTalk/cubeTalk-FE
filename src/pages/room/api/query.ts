import { useInfiniteQuery } from "@tanstack/react-query";
import { axios } from "../../../shared/axiosApi";
import { ServerResponse } from "../../../shared/axiosApi/model/axiosInstance";
import { RoomCardType } from "../../../shared/type";
import { useDebateSearchParamsStore } from "../../../widgets/roomHeader/model/store";

export type GetDebateRoomsResponse = RoomCardType[]

export type QueryString = {
  sort: "participants" | "createdAt";
  order?: "asc" | "desc";
  status?: "STARTED" | "CREATED";
  page?: string;
  size?: string;
}

export const getDebateRooms = async (
  mode: string, sort: string, order:string, status:string, page: string, size: string,
): Promise<GetDebateRoomsResponse> => {
  const res = await axios.get(`/chat/chatrooms/${mode}`, {
    params: { sort, order, status, page, size } as QueryString
  });
  return res.data;
};


export const useGetDebateRoomsQuery = () => {
  const { sort, mode, status } = useDebateSearchParamsStore((state) => state);
  return useInfiniteQuery({
    queryKey: ["getCreatedDebate"],
    queryFn: async ({ pageParam = 0 }) =>
      getDebateRooms(mode, sort, "desc", status, pageParam.toString(), "20"),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages?.length;
      return lastPage?.length === 0 ? undefined : nextPage;
    },
  });
}
    
