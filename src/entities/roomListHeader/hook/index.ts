import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDebateSearchParamsStore } from "../model/store";

export const useRefreshGetDebateRooms = () => {
  const queryClient = useQueryClient();
  const { mode, sort, status } = useDebateSearchParamsStore((state) => state);
  useEffect(() => {
    queryClient.refetchQueries({ queryKey: ["getDebateRooms", mode, sort, status], exact: true });
  }, [mode, queryClient, sort, status]);
};
