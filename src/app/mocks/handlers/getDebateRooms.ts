import { http, HttpResponse } from "msw";
import { ServerResponse } from "../../../shared/axiosApi/model/axiosInstance";
import { GetDebateRoomResponse } from "../../../pages/debate/api/query";
import { roomList, serverResponse } from ".";

export const mockingGetDebateRoomsHandler = http.get<
  never,
  never,
  ServerResponse<GetDebateRoomResponse[]>,
  string
>(`${import.meta.env.VITE_HTTP}chat/chatrooms`, async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams;

  const mode = query.get("mode") || "찬반";
  const sort = query.get("sort") || "createdAt";
  const order = query.get("order") || "asc";
  const status = query.get("status") as "STARTED" | "CREATED";
  const page = Number(query.get("page")) || 0;
  const size = Number(query.get("size")) || 20;

  let filteredRooms = roomList.filter((room) => room.chatMode === mode);

  if (status) {
    filteredRooms = filteredRooms.filter((room) => room.chatStatus === status);
  }

  // Sort the rooms by participants or createdAt
  filteredRooms = filteredRooms.sort((a, b) => {
    if (sort === "participants") {
      return order === "asc"
        ? a.participants.length - b.participants.length
        : b.participants.length - a.participants.length;
    } else if (sort === "createdAt") {
      return order === "asc"
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0;
  });

  const paginatedRooms = filteredRooms.slice(page * size, (page + 1) * size);
  if (!paginatedRooms.length) {
    return HttpResponse.json(serverResponse([], "No Rooms found"), { status: 200 });
  }

  const addedpaginatedRooms = paginatedRooms.map((room) => {
    return { ...room, currentParticipantsCount: room.participants.length };
  });
  // Otherwise, return the paginated list of rooms
  return HttpResponse.json(serverResponse(addedpaginatedRooms), { status: 200 });
});
