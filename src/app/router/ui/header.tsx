import styled from "styled-components";
import { rowCenter, rowflex } from "../../../shared/style/commonStyle";
import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AlertContext } from "../../../entities/alertDialog/model/context";
import { useMediaQuery } from "react-responsive";

const Logo = () => {
  return (
    <Link to="/">
      <LogoContainer>
        <LogoImage alt="logo" src="/Icon/logo.png" />
        <LogoTitle>CubeTalk</LogoTitle>
      </LogoContainer>
    </Link>
  );
};

const Login = () => {
  const location = useLocation();
  const isActive = location.pathname === "/login";
  const { alert } = useContext(AlertContext);
  const onClickHandler = () => {
    alert("로그인은 현재 구현중입니다. 익명으로 사용해 주세요!", "확인");
  };

  return (
    <LoginContainer onClick={onClickHandler}>
      <StyledText $isActive={isActive}>로그인</StyledText>
      {/* <ProfileContainer>
          <img alt="login" src="/Icon/profile.png" />
        </ProfileContainer> */}
    </LoginContainer>
  );
};

const DebateListButton = () => {
  const location = useLocation();
  const isActive = location.pathname === "/room";

  return (
    <StyledLink to="/room">
      <StyledText $isActive={isActive}>토론 목록</StyledText>
    </StyledLink>
  );
};

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <HamburgerContainer>
      <HamburgerIcon onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </HamburgerIcon>
      {isOpen && (
        <MobileMenu>
          <DebateListButton />
          <Login />
        </MobileMenu>
      )}
    </HamburgerContainer>
  );
};

const Header = () => {
  const isHamburger = useMediaQuery({
    query: "(max-width: 500px)",
  });
  return (
    <HeaderLayout>
      <HeaderContainer>
        <Logo />
        {isHamburger ? (
          <HamburgerMenu />
        ) : (
          <div className="flex flex-row gap-16 items-center">
            <DebateListButton />
            <Login />
          </div>
        )}
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

const LogoContainer = styled.button`
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

// const ProfileContainer = styled.div`
//   ${center}
//   width: 30px;
//   height: 30px;
//   margin-left: 8px;
//   border-radius: 20px;
//   background-color: var(--white);
// `;

const StyledLink = styled(Link)`
  display: inline-block;
  position: relative;
`;

const StyledText = styled.h3<{ $isActive: boolean }>`
  font-size: 1rem;
  white-space: nowrap;
  transition: transform 0.2s ease;
  color: var(--white);
  position: relative;
  padding-bottom: 2px;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: var(--color-free);
    transform: scaleX(${(props) => (props.$isActive ? 1 : 0)});
    transition: transform 0.2s ease;
  }

  &:hover {
    transform: translateY(4px);
    &::after {
      transform: scaleX(1);
    }
  }
`;

const HamburgerContainer = styled.div`
  position: relative;
`;

const HamburgerIcon = styled.div`
  width: 30px;
  height: 20px;
  position: relative;
  cursor: pointer;

  span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: var(--white);
    border-radius: 3px;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;

    &:nth-child(1) {
      top: 0px;
    }
    &:nth-child(2) {
      top: 8px;
    }
    &:nth-child(3) {
      top: 16px;
    }
  }
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--black);
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
