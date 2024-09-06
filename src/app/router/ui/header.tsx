import styled from "styled-components";
import { center, rowCenter, rowflex } from "../../../shared/style/commonStyle";
import { Pad } from "../../../shared/style/Responsive";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"}>
      <LogoContainer>
        <LogoImage alt="logo" src="/Icon/logo.png" />
        <LogoTitle>CubeTalk</LogoTitle>
      </LogoContainer>
    </Link>
  );
};

const Login = () => {
  return (
    <LoginContainer>
      <Pad>
        <LoginTitle>로그인</LoginTitle>
      </Pad>
      <ProfileContainer>
        <img alt="login" src="/Icon/profile.png" />
      </ProfileContainer>
    </LoginContainer>
  );
};

const Header = () => {
  return (
    <HeaderLayout>
      <HeaderContainer>
        <Logo />
        <Login />
      </HeaderContainer>
    </HeaderLayout>
  );
};

export default Header;

const HeaderLayout = styled.div`
  ${rowCenter}
  background-color: var(--black);
  width: 100%;
  height: 64px;
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
`;

const LoginContainer = styled.div`
  ${rowflex}
`;

const ProfileContainer = styled.div`
  ${center}
  width: 40px;
  height: 40px;
  margin-left: 16px;
  border-radius: 20px;
  background-color: var(--white);
`;

const LoginTitle = styled.h2`
  color: var(--white);
`;
