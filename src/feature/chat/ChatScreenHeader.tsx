import styled from "styled-components";
import { center, colflex, commonButton } from "../../styles/shared";
import { mediaQuery } from "../../routes/layout/Responsive";

const ChatScreenHeader = () => {
  return (
    <HeaderContainer>
      <ChatTittle>토론제목입니다.토론제목입니다.토론제목입니다토론제목입니다.토론제목입니다토론제목입니다토론제목입니다토론제목입니다토론제목입니다토론제목입니다</ChatTittle>
      <ButtonContainer>
        <RoomParticipant>
          <h3>3/6</h3>
          <ProfileContainer>
            <Profile alt="profile" src="/Icon/profile.png" />
          </ProfileContainer>
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

const ChatTittle = styled.h2`
  @media ${mediaQuery.mobile} {
    font-size: var(--font-size-m)
  }
  @media ${mediaQuery.tablet} {
    font-size: var(--font-size-m)
  }
  color: var(--white);
`

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

const ProfileContainer = styled.div`
  ${center}
  width: 25px;
  height: 25px;
  border-radius: 15px;
  background-color: #65558F;
`;

const Profile = styled.img`
  width: 15px;
`