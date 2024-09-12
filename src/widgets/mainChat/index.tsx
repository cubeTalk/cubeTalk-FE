import styled from "styled-components";
import MessageInput from "../../entities/messageInput";
import { colflex, scrollBar } from "../../shared/style/commonStyle";;
import { useRef } from "react";
import { useChatStore } from "../../entities/message/model/store";
import Announcement from "./ui/Announcement";

const MainChat = () => {
  const chatList = useChatStore((state) => state.chat);
  const bubbleContainerRef = useRef<HTMLDivElement>(null);

  // 스크롤이 바닥에 있었으면 계속 유지하도록함
  const scrollToBottom = (checkingBottom: boolean) => {
    if (!bubbleContainerRef.current) {
      return;
    }
    const bubbleContainer = bubbleContainerRef.current;

    if (!checkingBottom) {
      bubbleContainer.scrollTop = bubbleContainer.scrollHeight;
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
    <>
      <h2>전체 채팅</h2>
      <BubbleContainer ref={bubbleContainerRef}>
        <Announcement />
      </BubbleContainer>
      <MessageInput scrollToBottom={scrollToBottom} />
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
