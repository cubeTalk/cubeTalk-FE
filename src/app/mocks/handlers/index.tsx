import { http, HttpResponse } from "msw";

const serverResponse = (data: unknown) => ({
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
      memberId: "3c48972e-0702-4d48-aaa7-7a2e8c8863da",
      nickName: "더미 닉네임",
      channelId: "123456",
      subChannelId: "123456789",
      title: "더미 타이틀입니다.",
      description: "더미 설명입니다.",
      chatMode: "찬반",
      maxParticipants: 6,
      chatDuration: 22,
      ownerId: "UUID",
      chatStatus: "CREATED",
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
          memberId: "3c48972e-0702-4d48-aaa7-7a2e8c8863da",
          role: "찬성",
          status: "방장",
          nickName: "더미 닉네임",
        },
      ],
      severTimeStamp: "2024-09-06T12:34:56Z",
    };

    return HttpResponse.json(serverResponse(data), { status: 201 });
  }),
];
