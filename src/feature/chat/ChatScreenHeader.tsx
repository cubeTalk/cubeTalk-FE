import styled from "styled-components";
import { center, colflex, commonButton, rowflex } from "../../styles/shared";
import { mediaQuery } from "../../routes/layout/Responsive";
import { useEffect, useRef, useState } from "react";

const ChatScreenHeader = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const textRef = useRef<HTMLDivElement | null>(null);

  // title overflow checking
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
    setIsExpanded(prev => !prev);
  };

  return (
    <HeaderContainer>
      <button onClick={toggleExpand} disabled={!showButton}>
        <ChatTitle ref={textRef} isExpanded={isExpanded}>
          토론제목입니다.토론제목입니다토론제목입니다토론제목입니다.토론제토론제목입니론제목입니다토론제목입니다.토론제목입니다토론제목입니다.토론제목입니다
        </ChatTitle>
      </button>
      <ButtonContainer>
        <RoomParticipant>
          <h3>3/6</h3>
          <Profile>
            <img alt="profile" src="/Icon/profile.png" />
          </Profile>
        </RoomParticipant>
        <StartButton>
          <h3>시작하기</h3>
        </StartButton>
      </ButtonContainer>
    </HeaderContainer>
  );
}

export default ChatScreenHeader;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ChatTitle = styled.h2<{ isExpanded: boolean }>`
  text-align: left;
  color: var(--white);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ isExpanded }) => (isExpanded ? "unset" : 2)};
`;

const ButtonContainer = styled.button`
  ${colflex}
  gap: 0px;
  margin-left: auto;
`

const StartButton = styled.button`
  ${commonButton}
  background-color: var(--color-mid);
  padding: 0px 8px;
  margin: 5px;
`;

const RoomParticipant = styled.button`
  ${commonButton}
  background-color: var(--color-light);
  margin: 5px;
`;

const Profile = styled.div`
  ${center}
  width: 25px;
  height: 25px;
  border-radius: 15px;
  background-color: #65558F;
  img {
    width: 15px;
  }
`;