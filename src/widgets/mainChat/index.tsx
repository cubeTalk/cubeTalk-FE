import MessageInput from "../../entities/messageInput";
import { useRef } from "react";
import { MainBubbles } from "./ui/MainBubbles";
import styled from "styled-components";
import { colflex, scrollBar } from "../../shared/style/commonStyle";
import { useMainInputStore } from "./model/store";
import { useUserInfoStore } from "../../entities/debateInfo";

const MainChat = () => {
  const bubbleContainerRef = useRef<HTMLDivElement>(null);
  const channelId = useUserInfoStore((state) => state.channelId);

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
  gap: 5px;
  overflow-y: auto;
  margin-bottom: 8px;
  padding: 5px 10px 0 5px;
`;
