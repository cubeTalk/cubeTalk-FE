import { http, HttpResponse } from "msw";
import { ServerResponse } from "../../../shared/axiosApi/model/axiosInstance";
import { EnterDebateRequest, EnterDebateResponse } from "../../../features/enterDebate/api/query";
import { roomList, serverResponse } from ".";
import { hasFreeSetting, hasProsConsSetting, Participant } from "../../../shared/type";
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
    status: ownerId ? "방장" : "대기",
  };

  room.participants.push(newParticipant);

  // Return updated room info
  const responseData: EnterDebateResponse = {
    id: room.id,
    chatStatus: room.chatStatus,
    participants: room.participants,
    title: room.title,
    description: room.description,
    chatMode: room.chatMode,
    maxParticipants: room.maxParticipants,
    channelId: room.channelId,
    chatDuration: hasFreeSetting(room),
    debateSettings: hasProsConsSetting(room),
    chatGenerationTime: room.chatGenerationTime,

    memberId: newParticipant.memberId,
    nickName: newParticipant.nickName,
    subChannelId: generateChannelID(),
    ownerId: ownerId || "",
    severTimeStamp: new Date().toISOString(),
  };

  return HttpResponse.json(serverResponse(responseData), { status: 201 });
});
