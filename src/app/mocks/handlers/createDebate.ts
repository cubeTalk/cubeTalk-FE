import { http, HttpResponse } from "msw";
import { roomList, serverResponse } from ".";
import {
  CreateDebateRoomRequest,
  CreateDebateRoomResponse,
} from "../../../features/createDebate/api/query";
import { ServerResponse } from "../../../shared/axiosApi/model/axiosInstance";
import {
  DebateRoomAddition,
  DebateRoomType,
  FreeDebate,
  hasFreeSetting,
  hasProsConsSetting,
  ProsConsDebate,
} from "../../../shared/type";
import { generateUserID, generateUUID } from "../lib/uuid";

export const mockingCreateDebateHandler = http.post<
  never,
  CreateDebateRoomRequest,
  ServerResponse<CreateDebateRoomResponse>,
  string
>(`${import.meta.env.VITE_HTTP}chat`, async ({ request }) => {
  const body = await request.json();
  const { title, description, maxParticipants, chatMode } = body;

  // Dummy data
  const newId = `room${roomList.length + 1}`;
  const newMemberId = generateUserID();
  const newChannelId = generateUUID();
  const CreateTime = new Date().toISOString();
  const newRoom: DebateRoomType =
    chatMode === "자유"
      ? ({
          channelId: newChannelId,
          chatStatus: "CREATED",
          ownerId: "",
          id: newId,
          title,
          description,
          maxParticipants,
          chatMode,
          chatDuration: hasFreeSetting(body),
          participants: [],
          updatedAt: CreateTime,
          createdAt: CreateTime,
        } as FreeDebate & DebateRoomAddition)
      : ({
          channelId: newChannelId,
          chatGenerationTime: new Date().toISOString(),
          chatStatus: "CREATED",
          ownerId: "",
          id: newId,
          title,
          description,
          maxParticipants,
          chatMode,
          debateSettings: hasProsConsSetting(body),
          participants: [],
          updatedAt: CreateTime,
          createdAt: CreateTime,
        } as ProsConsDebate & DebateRoomAddition);

  Array.from({ length: 100 }).forEach(() => roomList.push(newRoom));
  const responseData = {
    id: newId,
    memberId: newMemberId,
  };

  return HttpResponse.json(serverResponse(responseData), { status: 201 });
});
