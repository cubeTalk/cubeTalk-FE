import { http, HttpResponse } from "msw";
import { DebateRoomUrl } from "../../../shared/axiosApi/lib/api.type";

export const handlers = [
  // 방생성
  http.post(DebateRoomUrl(), () => {
    const data = {
      id: "1",
      memberId: "uuid",
    };
    return HttpResponse.json(data, { status: 201 });
  }),
];
