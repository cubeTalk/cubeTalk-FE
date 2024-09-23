import { http, HttpResponse } from "msw";
import { ServerResponse } from "../../../shared/axiosApi/model/axiosInstance";
import { EnterDebateRequest, EnterDebateResponse } from "../../../features/enterDebate/api/query";
import { roomList, serverResponse } from ".";
import { Participant } from "../../../shared/type";
import { generateChannelID, generateUserID } from "../lib/uuid";

type EnterDebateParams = {
  id: string
}

export const mockingEnterDebateHandler = http.post<
  EnterDebateParams,
  EnterDebateRequest,
  ServerResponse<EnterDebateResponse | null>,
  string
>(`${import.meta.env.VITE_HTTP}chat/:id/participants`, async ({ params, request }) => {
  const { id } = params;
  const body = await request.json();
  const { nickName, role, ownerId } = body;

  const room = roomList.find((room) => room.id === id);

  if (!room) {
    return HttpResponse.json(serverResponse(null, "Room not found", "404"), { status: 404 });
  }

  // 최대인원체크
  if (room.participants.length >= room.maxParticipants) {
    return HttpResponse.json(serverResponse(null, "Room is full", "403"), { status: 403 });
  }

  const newParticipant: Participant = {
    memberId: ownerId ? ownerId : generateUserID(),
    nickName: nickName || `user-${room.participants.length + 1}`,
    role,
    status: ownerId ? "OWNER" : "PENDING",
  };

  room.ownerId = ownerId ? ownerId : "";
  room.participants.push(newParticipant);

  // Return updated room info
  const responseData: EnterDebateResponse = {
    id,
    memberId: newParticipant.memberId,
    nickName: newParticipant.nickName,
    channelId: room.channelId,
    subChannelId: generateChannelID(),
    role: body.role,
  };

  return HttpResponse.json(serverResponse(responseData), { status: 201 });
});
