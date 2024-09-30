import { useUserInfoStore } from "../../../entities/debateInfo";
import { useContext, useEffect } from "react";
import { connectWebSocket, disconnectWebSocket, TimeOutMessage } from "../../../app/worker";
import { useWebSocketErrorStore, useWebSocketTimeOutStore } from "../model/store";
import { AlertContext } from "../../../entities/alertDialog/model/context";
import { useNavigate } from "react-router-dom";

export const useWebSocketConnection = () => {
  const { id, channelId, subChannelId, nickName } = useUserInfoStore((state) => state);
  useEffect(() => {
    connectWebSocket({
      chatRoomId: id,
      channelId,
      subChannelId,
      nickName,
    });
    return () => disconnectWebSocket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useWebSocketError = () => {
  const { error, setError } = useWebSocketErrorStore((state) => state);
  const { alert } = useContext(AlertContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      const alertMessage = async () => {
        if (
          error === "해당 채팅방에 없는 멤버입니다." ||
          error === "서버로 부터 메인 채팅방 메세지 불러오기를 실패하였습니다. 다시 참가해주세요"
        ) {
          await alert(error, "나가기", "", () => navigate("/"));
        } else {
          setError("");
          await alert(error, "확인");
        }
      };
      alertMessage();
    }
  }, [alert, error, navigate, setError]);
};

export const useWebScoketTimeout = () => {
  const { error, setError } = useWebSocketTimeOutStore((state) => state);
  const { alert } = useContext(AlertContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      const alertMessage = async () => {
        setError("");
        await alert(
          "서버와 연결이 불안정합니다. 재접속 해주세요",
          "확인",
          "대기",
          () => navigate("/"),
          () => TimeOutMessage()
        );
      };
      alertMessage();
    }
  }, [alert, navigate, error, setError]);
};
