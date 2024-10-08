import { CloseEvent } from "sockjs-client";

// https://mytory.net/archives/14526
export const getCloseEventCodeReason = (event: CloseEvent) => {
  const reasonMap = new Map([
    [1000, "정상 종료"],
    [1001, "엔드포인트가 “떠나간” 상황. 예컨대 서버가 다운되거나, 브라우저가 페이지에서 나간 경우"],
    [1002, "프로토콜 오류"],
    [
      1003,
      "허용되지 않은 데이터 유형을 수신으로 인한 종료. (예: 텍스트 데이터만 이해할 수 있는 엔드포인트가 바이너리 메시지를 받은 경우)",
    ],
    [
      1004,
      "1004번 종료 이벤트 코드는 예약돼 있지만 현재는 의미가 없음. 향후에 의미가 정의될 수 있음",
    ],
    [1005, "상태 코드가 없는 채로 종료"],
    [1006, "비정상 종료(ex. close 명령 없이 종료)"],
    [
      1007,
      "엔드포인트가 메시지 내에서 일치하지 않는 데이터를 받음. (예: 텍스트 메시지 내의 비 UTF-8 데이터)",
    ],
    [
      1008,
      "정책 위반(다른 적합한 원인이 없거나, 정책에 대한 구체적인 세부 사항을 숨길 필요가 있을 때)",
    ],
    [1009, "메시지 처리 용량 초과"],
    [
      1010,
      "서버에서 하나 이상의 확장을 협상할 것으로 예상했지만, 서버가 WebSocket 핸드셰이크의 응답 메시지에서 그것들을 반환하지 않음. 구체적으로 필요한 확장은 : " +
        event.reason,
    ],
    [1011, "서버가 요청을 완료하는 데 방해가 되는 예기치 않은 상황에 직면하여 연결을 종료"],
    [1015, "TLS 핸드셰이크 수행 실패(ex. 서버 인증서를 검증할 수 없음)."],
  ]);

  return reasonMap.get(event.code) || "알 수 없는 이유";
};

export const sleep = async (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}