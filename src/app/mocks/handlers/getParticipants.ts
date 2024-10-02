import { http, HttpResponse } from "msw";
import { ServerResponse } from "../../../shared/axiosApi/model/axiosInstance";
import { roomList, serverResponse } from ".";
import { GetDebateParticipantsResponse } from "../../../entities/TeamButtons/api/query";
import { Participant } from "../../../shared/type";

type GetParticipantsListParams = {
  id: string;
};

export const mockingGetParticipantsListHandler = http.get<
  GetParticipantsListParams,
  never,
  ServerResponse<GetDebateParticipantsResponse | null>,
  string
>(`${import.meta.env.VITE_HTTP}chat/:id/participants`, async ({ params }) => {
  const { id } = params;
  
  const room = roomList.find((room) => room.id === id);

  if (!room) {
    return HttpResponse.json(serverResponse(null, "Room not found", "404"), { status: 404 });
  }

  const participants = room.participants;
  const supportCount = Object.values(participants).reduce((acc, participant: Participant) => {
    return participant.role === "찬성" ? acc + 1 : acc;
  }, 0);
  const oppositeCount = Object.values(participants).reduce((acc, participant: Participant) => {
    return participant.role === "반대" ? acc + 1 : acc;
  }, 0);  
  const spectatorCount = Object.values(participants).reduce((acc, participant: Participant) => {
    return participant.role === "관전" ? acc + 1 : acc;
  }, 0);

  const participantsData: GetDebateParticipantsResponse  = {
    id: room.id,
    maxCapacityCount: room.maxParticipants,  // 최대 수용 인원
    totalParticipants: room.participants.length,  // 현재 참가자 수
    supportCount,  // 찬성 참가자 수
    oppositeCount,  // 반대 참가자 수
    spectatorCount,  // 관전자 수
    totalCount: 0,
  };

  return HttpResponse.json(serverResponse(participantsData), { status: 200 });
});
