import styled from "styled-components";
import Divider from "../common/Divider";
import { colflexCenter, rowflex } from "../../styles/shared";
import Dropdown from "../common/Dropdown";
import RoomAddButton from "./RoomAddButton";

interface RoomHeaderProps {
  text: string;
  imgSrc: string;
}

const RoomHeader = ({ text, imgSrc }:RoomHeaderProps) => {
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
        <RoomAddButton />
      </DorpdownContainer>
      <Divider />
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
  padding-left: 15px;
  margin-bottom: 5px;
`
;
const HeaderTitle = styled.h2`
`;

const TitleIcon = styled.img`
  margin-right: 8px;
`;

const DorpdownContainer = styled.div`
  ${rowflex}
  flex-wrap: wrap;
`;