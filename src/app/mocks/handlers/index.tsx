import { http, HttpResponse } from "msw";

export const handlers = [
  // 방생성
  http.post("/chat", () => {
    const data = {
      id: "1",
      memberId: "uuid",
    };
    return HttpResponse.json(data, { status: 201 });
  }),
];
