import { http, HttpResponse } from "msw";
import { ServerResponse } from "../../../shared/axiosApi/model/axiosInstance";
import { roomList, serverResponse } from ".";
import { ChangeDescriptionRequest } from "../../../widgets/debateHome/api/query";

type ChangeDescriptionParams = {
  id: string
}

export const mockingChangeDescriptionHandler = http.patch<
  ChangeDescriptionParams,
  ChangeDescriptionRequest,
  ServerResponse<undefined>,
  string
>(`${import.meta.env.VITE_HTTP}chat/:id/description`, async ({ params, request }) => {
  const { id } = params;
  const body = await request.json();
  const room = roomList.find((room) => room.id === id);

  if (!room) {
    return HttpResponse.json(serverResponse(undefined, "Room not found", "404"), { status: 404 });
  }

  if (room.ownerId !== body.ownerId) {
    return HttpResponse.json(serverResponse(undefined, "Only Owner Can change description", "403"), { status: 403 });
  }

  room.description = body.description;
  return HttpResponse.json(serverResponse(undefined, "Success fully changed", "200"), { status: 200 });
});
