import styled from "styled-components";
import { colflex, scrollBar } from "../../shared/style/commonStyle";
import { useRef } from "react";
import { TeamBubbles } from "./ui/TeamBubbles";
import MessageInput from "../../entities/messageInput";
import { useSubInputStore } from "./model/store";
import { useUserInfoStore } from "../../entities/debateInfo";

const TeamChat = () => {
  const bubbleContainerRef = useRef<HTMLDivElement>(null);
  const subChannelId = useUserInfoStore((state) => state.subChannelId);
  const role = useUserInfoStore((state) => state.role);

  return (
    <>
      <h2>팀 채팅</h2>
      <BubbleContainer ref={bubbleContainerRef}>
        <TeamBubbles />
      </BubbleContainer>
      <MessageInput
        containerRef={bubbleContainerRef}
        messageInputStore={useSubInputStore}
        channelId={subChannelId}
        type={role}
      />
    </>
  );
};

export default TeamChat;

const BubbleContainer = styled.div`
  ${colflex}
  ${scrollBar}
  gap: 10px;
  overflow-y: auto;
  margin-bottom: 8px;
`;
