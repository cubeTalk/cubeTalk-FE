import { http, HttpResponse } from "msw";
import { ServerResponse } from "../../../shared/axiosApi/model/axiosInstance";
import { roomList, serverResponse } from ".";
import { GetDebateRoomResponse } from "../../../pages/debate/api/query";

type GetDebateRoomParams = {
  id: string
}

export const mockingGetDebateRoomHandler = http.get<
  GetDebateRoomParams,
  never,
  ServerResponse<GetDebateRoomResponse | null>,
  string
>(`${import.meta.env.VITE_HTTP}chat/:id`, async ({ params }) => {
  const { id } = params;
  const room = roomList.find((room) => room.id === id);

  if (!room) {
    return HttpResponse.json(serverResponse(null, "Room not found", "404"), { status: 404 });
  }

  return HttpResponse.json(serverResponse(room), { status: 200 });
});
