import styled from "styled-components";
import { ChatMessage } from "../../../shared/type";

interface BubbleProps {
  message: ChatMessage;
  isleft?: boolean;
}

const Bubble = ({ message, isleft = true }: BubbleProps) => {
  return (
    <div>
      <UserName isleft={isleft}>{message.sender}</UserName>
      <BubbleWrapper isleft={isleft}>
        <NormalBubble isleft={isleft}>{message.message}</NormalBubble>
        <BubbleTime isleft={isleft}>
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

const UserName = styled.h3<{ isleft: boolean }>`
  margin: 0px 0px 5px 5px;
  text-align: ${({ isleft }) => (isleft ? "left" : "right")};
`;

const BubbleWrapper = styled.div<{ isleft: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ isleft }) => (isleft ? "flex-start" : "flex-end")};
`;

const NormalBubble = styled.h4<{ isleft: boolean }>`
  width: fit-content;
  background-color: var(--color-pro);
  line-height: 1.4;
  padding: 5px 10px;
  border-radius: 5px;
  max-width: 80%;
  white-space: pre-wrap;
  word-wrap: break-word;
  order: ${({ isleft }) => (isleft ? 0 : 1)};
`;

const BubbleTime = styled.h5<{ isleft: boolean }>`
  margin: auto 5px 0px 5px;
  text-align: ${({ isleft }) => (isleft ? "left" : "right")};
`;
