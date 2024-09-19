import styled from "styled-components";
import { colflex, scrollBar } from "../../shared/style/commonStyle";
import { useRef } from "react";
import { TeamBubbles } from "./ui/TeamBubbles";
import MessageInput from "../../entities/messageInput";
import { useSubInputStore } from "./model/store";
import { useUserInfoStore } from "../../entities/debateInfo";
import { ChangeTeamButton, ChangeTeamModal } from "../../features/changeTeam";

const TeamChatHeader = () => {
  return (
    <div className="flex flex-row justify-between">
      <h2>팀 채팅</h2>
      <ChangeTeamButton />
      <ChangeTeamModal />
    </div>
  );
};

const TeamChat = () => {
  const bubbleContainerRef = useRef<HTMLDivElement>(null);
  const subChannelId = useUserInfoStore((state) => state.subChannelId);
  const role = useUserInfoStore((state) => state.role);

  return (
    <>
      <TeamChatHeader />
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
  gap: 5px;
  overflow-y: auto;
  margin-bottom: 8px;
  padding: 5px 10px 0 5px;
`;
