import styled from "styled-components";
import { ChatMessage } from "../../../shared/type";

interface BubbleProps {
  message: ChatMessage;
  isLeft?: boolean;
}

const Bubble = ({ message, isLeft = true }: BubbleProps) => {
  return (
    <div>
      <UserName $isLeft={isLeft}>{message.sender}</UserName>
      <BubbleWrapper $isLeft={isLeft}>
        <NormalBubble $isLeft={isLeft}>{message.message}</NormalBubble>
        <BubbleTime $isLeft={isLeft}>
          {new Date(message.serverTimestamp).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          })}
        </BubbleTime>
      </BubbleWrapper>
    </div>
  );
};

export default Bubble;

const UserName = styled.h3<{ $isLeft: boolean }>`
  margin: 0px 0px 5px 5px;
  text-align: ${({ $isLeft }) => ($isLeft ? "left" : "right")};
`;

const BubbleWrapper = styled.div<{ $isLeft: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ $isLeft }) => ($isLeft ? "flex-start" : "flex-end")};
`;

const NormalBubble = styled.h4<{ $isLeft: boolean }>`
  width: fit-content;
  background-color: var(--color-pro);
  line-height: 1.4;
  padding: 5px 10px;
  border-radius: 5px;
  max-width: 80%;
  white-space: pre-wrap;
  word-wrap: break-word;
  order: ${({ $isLeft }) => ($isLeft ? 0 : 1)};
`;

const BubbleTime = styled.h5<{ $isLeft: boolean }>`
  margin: auto 5px 0px 5px;
  text-align: ${({ $isLeft }) => ($isLeft ? "left" : "right")};
`;
