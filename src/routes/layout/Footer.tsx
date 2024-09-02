import styled from "styled-components";
import { rowCenter, rowflex } from "../../styles/shared";

const Footer = () => {
  return (
    <FooterLayout>
      <FooterContainer>
        <h3>&copy; CubeTalk. All rights reserved.</h3>
        <ProfileContainer>
          <GitHubIcon src="/Icon/github.svg" alt="GitHub" />
          <RepoLink href="https://github.com/cubeTalk">
            <BoldText>CubeTalk</BoldText>
          </RepoLink>
          <RepoLink href="https://github.com/eunsik-kim">
            <BoldText>FE 김은식</BoldText>
          </RepoLink>
          <RepoLink href="https://github.com/leedabin2">
            <BoldText>BE 이다빈</BoldText>
          </RepoLink>
        </ProfileContainer>
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
`;

const ProfileContainer = styled.div`
  ${rowflex}
  gap: 20px;
  margin-left: auto;
`;

const RepoLink = styled.a`
  ${rowflex}
  gap: 5px;
`;

const BoldText = styled.p`
  font-weight: 700;
`;

const GitHubIcon = styled.img`
  fill: var(--icon-color);
`;
