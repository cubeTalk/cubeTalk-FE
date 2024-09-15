import { http, HttpResponse } from "msw";
import { ServerResponse } from "../../../shared/axiosApi/model/axiosInstance";
import { roomList, serverResponse } from ".";
import { ChangeSettingRequest } from "../../../features/changeSetting/api/query";
import { isFreeDebate, isProsConsDebate } from "../../../shared/type";

type ChangeSettingParams = {
  id: string
}

export const mockingChangeSettingHandler = http.patch<
  ChangeSettingParams,
  ChangeSettingRequest,
  ServerResponse<undefined>,
  string
>(`${import.meta.env.VITE_HTTP}chat/:id/settings`, async ({ params, request }) => {
  const { id } = params;
  const body = await request.json();
  const room = roomList.find((room) => room.id === id);

  if (!room) {
    return HttpResponse.json(serverResponse(undefined, "Room not found", "404"), { status: 404 });
  }

  if (room.ownerId !== body.ownerId) {
    return HttpResponse.json(serverResponse(undefined, "Only Owner Can change settings", "403"), { status: 403 });
  }
  if (isFreeDebate(room) && "chatDuration" in body) {
    room.maxParticipants = body.maxParticipants;
    room.chatDuration = body.chatDuration;
  } else if (isProsConsDebate(room) && "debateSettings" in body) {
    room.maxParticipants = body.maxParticipants;
    room.debateSettings = body.debateSettings;
  } else {
    return HttpResponse.json(serverResponse(undefined, "Miss Matched chatMode with requests", "404"), { status: 404 });
  }

  return HttpResponse.json(serverResponse(undefined, "Success fully changed", "200"), { status: 200 });
});
