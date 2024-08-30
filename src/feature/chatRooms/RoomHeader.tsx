import styled from "styled-components";
import Divider from "../common/Divider";
import { colflexCenter, rowflex, rowflexCenter } from "../../styles/shared";
import { ReactElement } from "react";
import Dropdown from "../common/Dropdown";

interface RoomHeaderProps {
  text: string;
  imgSrc: string;
  children?: ReactElement
}

const RoomHeader = ({ text, imgSrc, children }:RoomHeaderProps) => {
  return (
    <HeaderContainer>
      <TitleContainer>
        <TitleIcon src={imgSrc} alt="titleIcon" />
        <HeaderTitle>{text}</HeaderTitle>
      </TitleContainer>
      <DorpdownContainer>
        <Dropdown />
        <Dropdown />
        <Dropdown />
      </DorpdownContainer>
      <Divider/>
    </HeaderContainer>
  );
}

export default RoomHeader;

const HeaderContainer = styled.div`
  ${colflexCenter}
  width: 100%;
`

const TitleContainer = styled.div`
  ${rowflex}
  padding-left: 25px;
`
;
const HeaderTitle = styled.h2`
  font-size: var(--font-size-l);
  font-weight: 700;
`;

const TitleIcon = styled.img`
  margin-right: 8px;
`;

const DorpdownContainer = styled.div`
  ${rowflex}
  padding-left: 10px;
  flex-wrap: wrap;
`;