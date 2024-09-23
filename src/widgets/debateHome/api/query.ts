import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../shared/axiosApi";
import { TimeSetting } from "../../../shared/type";
import { useUserInfoStore } from "../../../entities/debateInfo";

export type GetDebateSettingResponse = {
  description: string;
  chatDuration?: number;
  maxParticipants: number;
  debateSettings?: TimeSetting;
};

export const GetDebateSettingKey = "getDebateSetting"

const getDebateSetting = async (id: string): Promise<GetDebateSettingResponse> => {
  const response = await axios.get(`/chat/${id}/home`);
  return response.data;
};

export const useGetDebateSettingQuery = () => {
  const id = useUserInfoStore(state => state.id);
  return useQuery({
    queryKey: [GetDebateSettingKey],
    queryFn: () => getDebateSetting(id),
    refetchOnMount: false,
    retry: 1,
  })
};
