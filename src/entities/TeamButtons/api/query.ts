import { axios } from "../../../shared/axiosApi";
import { ServerResponse } from "../../../shared/axiosApi/model/axiosInstance";

export type GetDebateParticipantsResponse = {
  id: string;
  maxCapacityCount: number;
  totalParticipants: number;
  supportCount: number;
  oppositeCount: number;
  spectatorCount: number;
};

export const getDebateParticipants = (
  id: string
): Promise<ServerResponse<GetDebateParticipantsResponse>> =>
  axios.get(`/chat/${id}/participants/list`);
