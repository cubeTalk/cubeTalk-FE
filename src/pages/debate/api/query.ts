import { axios } from "../../../shared/axiosApi";
import { ServerResponse } from "../../../shared/axiosApi/model/axiosInstance";
import { DebateRoomType } from "../../../shared/type";

export type GetDebateRoomResponse = DebateRoomType;

export const getDebateInfo = (id: string | undefined): Promise<ServerResponse<GetDebateRoomResponse>> =>
  axios.get(`/chat/${id}`);
