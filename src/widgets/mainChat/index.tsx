import MessageInput from "../../entities/messageInput";
import { useEffect, useRef } from "react";
import { MainBubbles } from "./ui/MainBubbles";
import styled from "styled-components";
import { colflex, scrollBar } from "../../shared/style/commonStyle";
import { useMainInputStore } from "./model/store";
import webSocket from "../../shared/webSocket";
import { useUserInfoStore } from "../../entities/debateInfo";
import { useWebSocketMessageCallback } from "./hook";

const MainChat = () => {
  const bubbleContainerRef = useRef<HTMLDivElement>(null);
  const { id, channelId, subChannelId, nickName } = useUserInfoStore((state) => state);
  const {
    mainChatCallback,
    subChatCallback,
    progressCallback,
    participantsCallback,
    errorCallback,
  } = useWebSocketMessageCallback();
  // 웹소켓 연결
  useEffect(() => {
    webSocket.connect({
      id,
      mainChatId: channelId,
      subChatId: subChannelId,
      nickName,
      mainChatCallback,
      subChatCallback,
      progressCallback,
      participantsCallback,
      errorCallback,
    });
    return () => webSocket.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h2>전체 채팅</h2>
      <BubbleContainer ref={bubbleContainerRef}>
        <MainBubbles />
      </BubbleContainer>
      <MessageInput
        containerRef={bubbleContainerRef}
        messageInputStore={useMainInputStore}
        channelId={channelId}
        type={"MAIN"}
      />
    </>
  );
};

export default MainChat;

const BubbleContainer = styled.div`
  ${colflex}
  ${scrollBar}
  gap: 10px;
  overflow-y: auto;
  margin-bottom: 8px;
`;
