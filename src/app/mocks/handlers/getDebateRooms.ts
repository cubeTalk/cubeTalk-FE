import { http, HttpResponse } from "msw";
import { ServerResponse } from "../../../shared/axiosApi/model/axiosInstance";
import { GetDebateRoomResponse } from "../../../pages/debate/api/query";
import { roomList, serverResponse } from ".";

type GetChatRoomParams = {
  mode: "찬반" | "자유";
};

export const mockingGetDebateRoomsHandler = http.get<
  GetChatRoomParams,
  never,
  ServerResponse<GetDebateRoomResponse[]>,
  string
>(`${import.meta.env.VITE_HTTP}chat/chatrooms/:mode`, async ({ params, request }) => {
  const { mode } = params;
  const url = new URL(request.url);
  const query = url.searchParams;

  const sort = query.get('sort') || 'createdAt';
  const order = query.get('order') || 'asc';
  const status = query.get('status') as "STARTED" | "CREATED";
  const page = Number(query.get('page')) || 0;
  const size = Number(query.get('size')) || 20;

  let filteredRooms = roomList.filter((room) => room.chatMode === mode);

  if (status) {
    filteredRooms = filteredRooms.filter((room) => room.chatStatus === status);
  }

  // Sort the rooms by participants or createdAt
  filteredRooms = filteredRooms.sort((a, b) => {
    if (sort === 'participants') {
      return order === 'asc'
        ? a.participants.length - b.participants.length
        : b.participants.length - a.participants.length;
    } else if (sort === 'createdAt') {
      return order === 'asc'
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0;
  });

  const paginatedRooms = filteredRooms.slice(page * size, (page + 1) * size);

  if (!paginatedRooms.length) {
    return HttpResponse.json(serverResponse([], "No Rooms found"), { status: 200 });
  }

  // Otherwise, return the paginated list of rooms
  return HttpResponse.json(serverResponse(paginatedRooms), { status: 200 });
});
