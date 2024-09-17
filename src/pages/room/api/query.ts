import { useInfiniteQuery } from "@tanstack/react-query";
import { axios } from "../../../shared/axiosApi";
import { RoomCardType } from "../../../shared/type";
import { useDebateSearchParamsStore } from "../../../entities/roomListHeader/model/store";
import { useMemo } from "react";

export type GetDebateRoomsResponse = RoomCardType[];

export type QueryString = {
  mode: "찬반" | "자유" | undefined;
  sort: "participants" | "createdAt";
  order?: "asc" | "desc";
  status?: "STARTED" | "CREATED" | undefined;
  page?: string;
  size?: string;
};

export const getDebateRooms = async (
  mode: string | undefined,
  sort: string,
  order: string,
  status: string | undefined,
  page: string,
  size: string
): Promise<GetDebateRoomsResponse> => {
  const res = await axios.get(`/chat/chatrooms`, {
    params: { mode, sort, order, status, page, size } as QueryString,
  });
  return res.data;
};

const sortDisplay = new Map([
  ["사람순", "participants"],
  ["생성순", "createdAt"],
]);

const statusDisplay = new Map([
  ["진행중", "STARTED"],
  ["시작전", "CREATED"],
]);

export const useGetDebateRoomsQuery = () => {
  const { sort, mode, status } = useDebateSearchParamsStore((state) => state);
  const { data, isLoading, isError, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["getDebateRooms"],
    queryFn: async ({ pageParam = 0 }) =>
      getDebateRooms(
        mode === "모두" ? undefined : mode,
        sortDisplay.get(sort) || "CREATED",
        "desc",
        statusDisplay.get(status),
        pageParam.toString(),
        "20"
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages?.length;
      return lastPage?.length === 0 ? undefined : nextPage;
    },
  });
  const rooms = useMemo(() => {
    return data?.pages.flat();
  }, [data]);
  return { rooms, isLoading, isError, isFetchingNextPage, fetchNextPage };
};
