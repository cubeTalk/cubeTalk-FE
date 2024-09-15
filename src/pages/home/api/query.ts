import { axios } from "../../../shared/axiosApi";
import { ServerResponse } from "../../../shared/axiosApi/model/axiosInstance";
import { DebateMode, RoomCardType } from "../../../shared/type";

export type GetDebateRoomsResponse = RoomCardType[]

export type QueryString = {
  sort: "participants" | "createdAt";
  order?: "asc" | "desc";
  status?: "STARTED" | "CREATED";
  page?: string;
  size?: string;
}

export const getStartedDebateQuery = (
  mode: DebateMode
): Promise<ServerResponse<GetDebateRoomsResponse>> => axios.get(`/chat/chatrooms/${mode}`, {
  params: { sort: "participants", order: "desc", status: "STARTED", page:"0", size: "5" } as QueryString
});

export const getCreatedDebateQuery = (
  mode: DebateMode
): Promise<ServerResponse<GetDebateRoomsResponse>> => axios.get(`/chat/chatrooms/${mode}`, {
  params: { sort: "participants", order: "desc", status: "CREATED", page:"0", size: "5" } as QueryString
});
