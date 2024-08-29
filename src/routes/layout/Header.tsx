import styled from "styled-components";
import { center, rowCenter, rowflex } from "../../styles/shared";
import { Pad } from "./Responsive";

const Header = () => {
  return (
    <HeaderLayout>
      <HeaderContainer>
        <LogoContainer>
          <LogoImage alt="logo" src="/Icon/logo.png" />
          <LogoTitle>CubeTalk</LogoTitle>
        </LogoContainer>
        <LoginContainer>
          <Pad>
            <LoginTitle>로그인</LoginTitle>
          </Pad>
          <ProfileContainer>
            <LoginImage alt="login" src="/Icon/profile.png" />
          </ProfileContainer>
        </LoginContainer>
      </HeaderContainer>
    </HeaderLayout>
  );
};

export default Header;

const HeaderLayout = styled.div`
  ${rowCenter}
  background-color: var(--black);
  width: 100%;
  height: 80px;
`;
const HeaderContainer = styled.div`
  ${rowflex}
  max-width: 1120px;
  width: 100%;
  justify-content: space-between;
  padding: 25px;
`;

const LogoContainer = styled.div`
  ${rowflex}
`;

const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 8px;
`;

const LogoTitle = styled.h1`
  color: var(--white);
  font-size: var(--font-size-xl);
  font-weight: 700;
`;

const LoginContainer = styled.div`
  ${rowflex}
`;

const ProfileContainer = styled.div`
  ${center}
  width: 40px;
  height: 40px;
  margin-left: 8px;
  border-radius: 20px;
  background-color: var(--white);
`

const LoginImage = styled.img`
`;

const LoginTitle = styled.h1`
  color: var(--white);
  font-size: var(--font-size-xl);
`;
