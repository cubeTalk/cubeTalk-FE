import styled from "styled-components";
import { MessageWithType } from "../../../shared/type";

interface BubbleProps {
  message: MessageWithType;
}

const Bubble = ({ message }: BubbleProps) => {
  const isLeft = !!message.isLeft;
  const color = message.color ? message.color : "var(--white)";
  return (
    <div className={message.isTime ? "mb-2" : ""}>
      {message.isName && <UserName $isLeft={isLeft}>{message.sender}</UserName>}{" "}
      <BubbleWrapper $isLeft={isLeft}>
        <NormalBubble $isLeft={isLeft} $color={color}>
          {message.message}
        </NormalBubble>
        {message.isTime && (
          <BubbleTime $isLeft={isLeft}>
            {new Date(message.serverTimestamp).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
            })}
          </BubbleTime>
        )}
      </BubbleWrapper>
    </div>
  );
};

export default Bubble;

const UserName = styled.h4<{ $isLeft: boolean }>`
  font-size: 15px;
  margin: 0px 0px 5px 4px;
  text-align: ${({ $isLeft }) => ($isLeft ? "left" : "right")};
`;

const BubbleWrapper = styled.div<{ $isLeft: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ $isLeft }) => ($isLeft ? "flex-start" : "flex-end")};
`;

const NormalBubble = styled.h4<{ $isLeft: boolean; $color: string }>`
  width: fit-content;
  background-color: ${({ $color }) => $color};
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
