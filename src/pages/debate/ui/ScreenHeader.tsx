import styled from "styled-components";
import { colflex } from "../../../shared/style/commonStyle";
import { useEffect, useRef, useState } from "react";
import { useDebateInfoStore } from "../../../entities/debateInfo";
import { ParticipantsButton, ParticipantsModal } from "../../../entities/participants";
import { StatusButton } from "../../../features/changeStatus";

const Title = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const textRef = useRef<HTMLDivElement | null>(null);
  const titleText = useDebateInfoStore((state) => state.title);
  // title overflow 체크 타이틀 길이가 2줄을 넘어가면 버튼으로 조절 가능하게 설정
  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        const element = textRef.current;
        const isOverflowing = element.scrollHeight > element.clientHeight;
        setShowButton(isOverflowing);
      }
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <button onClick={toggleExpand} disabled={!showButton}>
      <ChatTitle ref={textRef} $isexpanded={isExpanded}>
        {titleText}
      </ChatTitle>
    </button>
  );
};

const ScreenHeader = () => {
  return (
    <HeaderContainer>
      <Title />
      <ButtonContainer>
        <ParticipantsButton />
        <ParticipantsModal />
        <StatusButton />
      </ButtonContainer>
    </HeaderContainer>
  );
};

export default ScreenHeader;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ChatTitle = styled.h2<{ $isexpanded: boolean }>`
  color: var(--white);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ $isexpanded }) => ($isexpanded ? "unset" : 2)};
`;

const ButtonContainer = styled.div`
  ${colflex}
  gap: 0px;
  margin-left: auto;
`;