import styled from "styled-components";

interface BubbleProps {
  isleft?: boolean;
}

export const Bubble = ({ isleft = true }: BubbleProps) => {
  return (
    <div>
      <UserName isleft={isleft}>닉네임</UserName>
      <BubbleWrapper isleft={isleft}>
        <NormalBubble isleft={isleft}>
          메세지 입니다.메세지 입니다.메세지 입니다.메세지 입니다.메세지 입니다.메세지 입니다.메세지
          입니다.메세지 입니다.입니다.메세지 입니다.입니다.메세지 입니다.
        </NormalBubble>
        <BubbleTime>
          {new Date().toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          })}
        </BubbleTime>
      </BubbleWrapper>
    </div>
  );
};

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
  word-wrap: break-word;
  order: ${({ isleft }) => (isleft ? 0 : 1)};
`;

const BubbleTime = styled.h5`
  margin: auto 5px 0px 5px;
`;
