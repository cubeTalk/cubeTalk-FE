import { useUserInfoStore } from "../../../entities/debateInfo";
import { useContext, useEffect } from "react";
import { connectWebSocket, disconnectWebSocket } from "../../../app/worker";
import { useWebSocketErrorStore } from "../model/store";
import { AlertContext } from "../../../entities/alertDialog/model/context";

export const useWebSocketConnection = () => {
  const { id, channelId, subChannelId, nickName } = useUserInfoStore((state) => state);
  const { error, setError } = useWebSocketErrorStore((state) => state);
  const { alert } = useContext(AlertContext);
  useEffect(() => {
    connectWebSocket({
      chatRoomId: id,
      channelId,
      subChannelId,
      nickName,
    });

    if (error) {
      const alertMessage = async () => await alert(error, "확인", "", () => setError(""));
      alertMessage();
    }
    return () => disconnectWebSocket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);
};
