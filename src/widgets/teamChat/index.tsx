import styled from "styled-components";
import { colflex, scrollBar } from "../../shared/style/commonStyle";
import { useRef } from "react";
import { TeamBubbles } from "./ui/TeamBubbles";
import MessageInput from "../../entities/messageInput";

const TeamChat = () => {
  const bubbleContainerRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <h2>팀 채팅</h2>
      <BubbleContainer ref={bubbleContainerRef}>
        <TeamBubbles />
      </BubbleContainer>
      <MessageInput containerRef={bubbleContainerRef}/>
    </>
  );
};

export default TeamChat;

const BubbleContainer = styled.div`
  ${colflex}
  ${scrollBar}
  gap: 10px;
  overflow-y: auto;
`;

