import { http, HttpResponse } from "msw";

const serverResponse = (data) => ({
  status: "200",
  message: "테스트용",
  data,
});

export const handlers = [
  // 토론방 생성
  http.post(`${import.meta.env.VITE_HTTP}chat`, () => {
    const data = {
      id: "66e19ae8469f5a07b18bde9d",
      memberId: "3c48972e-0702-4d48-aaa7-7a2e8c8863da",
    };
    return HttpResponse.json(serverResponse(data), { status: 201 });
  }),

  // 토론방 참가
  http.post(`${import.meta.env.VITE_HTTP}chat/:id/participants`, ({ params }) => {
    const { id } = params;
    const data = {
      id,
      memberId: "uuid",
      nickName: "abc",
      channelId: "123",
      subChannelId: "123",
      title: "string",
      description: "string",
      chatMode: "string",
      maxParticipants: 6,
      chatDuration: 22,
      ownerId: "UUID",
      chatStatus: "string",
      debateSettings: {
        positiveEntry: 5,
        negativeQuestioning: 5,
        negativeEntry: 5,
        positiveQuestioning: 5,
        positiveRebuttal: 5,
        negativeRebuttal: 5,
      },
      participants: [
        {
          memberId: "UUID",
          role: "string",
          status: "string",
        },
      ],
      severTimeStamp: "2024-09-06T12:34:56Z",
    };

    return HttpResponse.json(serverResponse(data), { status: 201 });
  }),
];
