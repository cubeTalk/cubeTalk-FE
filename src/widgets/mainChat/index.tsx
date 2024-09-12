import MessageInput from "../../entities/messageInput";
import { useRef } from "react";
import { MainBubbles } from "./ui/MainBubbles";
import styled from "styled-components";
import { colflex, scrollBar } from "../../shared/style/commonStyle";

const MainChat = () => {
  const bubbleContainerRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <h2>전체 채팅</h2>
      <BubbleContainer ref={bubbleContainerRef}>
        <MainBubbles />
      </BubbleContainer>
      <MessageInput containerRef={bubbleContainerRef}/>
    </>
  );
};

export default MainChat;

const BubbleContainer = styled.div`
  ${colflex}
  ${scrollBar}
  gap: 10px;
  overflow-y: auto;
`;

