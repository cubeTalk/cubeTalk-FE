import styled from "styled-components";
import MessageInput from "../../entities/messageInput";
import { colflex, scrollBar } from "../../shared/style/commonStyle";
import Bubble from "../../entities/message/ui/Bubble";
import { ChangeTeamBubble, EnterBubble } from "../../entities/message/ui/RoomBubbles";
import ModeratorBubble from "../../entities/message/ui/ModeratorBubble";
import { useEffect, useRef } from "react";
import { useChatStore } from "../../entities/message/model/store";
import Announcement from "./ui/Announcement";
import { Message } from "../../shared/type";

const MainChat = () => {
  const chatList = useChatStore((state) => state.chat);
  const bubbleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bubbleContainerRef.current) {
      bubbleContainerRef.current.scrollTop = bubbleContainerRef.current?.scrollHeight;
    }
  }, [chatList]);

  // 스크롤이 바닥에 있었으면 계속 유지하도록함
  const scrollToBottom = (checkingBottom: boolean) => {
    if (!bubbleContainerRef.current) {
      return;
    }
    const bubbleContainer = bubbleContainerRef.current;

    if (!checkingBottom) {
      bubbleContainer.scrollTop = bubbleContainer.scrollHeight - bubbleContainer.clientHeight;
      return;
    }
    const isBottom =
      bubbleContainer.scrollTop + bubbleContainer.clientHeight - bubbleContainer.scrollHeight;
    // -24는 textarea의 한줄 높이
    if (-24 <= isBottom && isBottom <= 0) {
      bubbleContainer.scrollTop = bubbleContainer.scrollHeight - bubbleContainer.clientHeight;
    }
  };
  return (
    <ScreenLayout>
      <h2>전체 채팅</h2>
      <BubbleContainer ref={bubbleContainerRef}>
        <Announcement />
        <EnterBubble userName="배배고고파파" isEnter={true} />
        <ChangeTeamBubble userName="배배고고파파" team="찬성팀" />
        <ModeratorBubble
          order={0}
          topic="이대로 취업을 할 수 있을것인가...!이대로 취업을 할 수 있을것인가...!이대로 취업을 할 수 있을것인가...!"
        />
        <ModeratorBubble
          order={0}
          topic="이대로 취업을 할 수 있을것인가...!이대로 취업을 할 수 있을것인가...!이대로 취업을 할 수 있을것인가...!"
        />
        <ModeratorBubble
          order={0}
          topic="이대로 취업을 할 수 있을것인가...!이대로 취업을 할 수 있을것인가...!이대로 취업을 할 수 있을것인가...!"
        />

        <ModeratorBubble order={1} topic="이대로 취업을 할 수 있을것인가...!" />
        <ModeratorBubble order={6} />
        <ModeratorBubble order={7} />
        {chatList.map((chat: Message, idx: number) => {
          return <Bubble message={chat} key={idx} />;
        })}
      </BubbleContainer>
      <MessageInput scrollToBottom={scrollToBottom} />
    </ScreenLayout>
  );
};

export default MainChat;

const ScreenLayout = styled.div`
  ${colflex}
  padding: 5px;
  border-radius: 8px;
  background-color: var(--color-light);
  height: 100%;
  width: 100%;
`;

const BubbleContainer = styled.div`
  ${colflex}
  ${scrollBar}
  gap: 10px;
  padding: 5px 10px 20px 0px;
  overflow-y: auto;
`;
