import styled from "styled-components";
import { mediaQuery, rowCenter, rowflex } from "../../../shared/style/commonStyle";

const ProfileLink = () => {
  return (
    <ProfileContainer>
      <img src="/Icon/github.svg" alt="GitHub" />
      <RepoLink href="https://github.com/cubeTalk">
        <p>CubeTalk</p>
      </RepoLink>
      <RepoLink href="https://github.com/eunsik-kim">
        <p>FE 김은식</p>
      </RepoLink>
      <RepoLink href="https://github.com/leedabin2">
        <p>BE 이다빈</p>
      </RepoLink>
    </ProfileContainer>
  );
};

const Footer = () => {
  return (
    <FooterLayout>
      <FooterContainer>
        <h3>&copy; CubeTalk. All rights reserved.</h3>
        <ProfileLink />
      </FooterContainer>
    </FooterLayout>
  );
};

export default Footer;

const FooterLayout = styled.div`
  ${rowCenter}
  background-color: var(--color-light);
  width: 100%;
  height: 100px;
`;

const FooterContainer = styled.div`
  ${rowflex}
  max-width: 1120px;
  width: 100%;
  padding: 25px;
  gap: 20px;
  @media ${mediaQuery.mobile} {
    flex-wrap: wrap;
  }
`;

const ProfileContainer = styled.div`
  ${rowflex}
  gap: 20px;
  margin-left: auto;
  @media ${mediaQuery.mobile} {
    margin-left: 0;
  }
`;

const RepoLink = styled.a`
  ${rowflex}
  gap: 5px;
  p {
    font-weight: 700;
  }
`;
