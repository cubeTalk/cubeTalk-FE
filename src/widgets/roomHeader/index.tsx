import styled from "styled-components";
import Divider from "../../shared/components/divider";
import { colflexCenter, rowflex } from "../../shared/style/commonStyle";
import Dropdown from "../../shared/components/dropdown";
import { CreateRoomButton } from "../../features/createRoom";

interface RoomHeaderProps {
  text: string;
  imgSrc: string;
}

const RoomHeader = ({ text, imgSrc }: RoomHeaderProps) => {
  return (
    <HeaderContainer>
      <Title>
        <img src={imgSrc} alt="titleIcon" />
        <h2>{text}</h2>
      </Title>
      <DorpdownContainer>
        <Dropdown />
        <Dropdown />
        <Dropdown />
        <CreateRoomButton />
      </DorpdownContainer>
      <Divider />
    </HeaderContainer>
  );
};

export default RoomHeader;

const HeaderContainer = styled.div`
  ${colflexCenter}
  width: 100%;
`;

const Title = styled.div`
  ${rowflex}
  padding-left: 15px;
  margin-bottom: 5px;
  img {
    margin-right: 8px;
  }
`;

const DorpdownContainer = styled.div`
  ${rowflex}
  flex-wrap: wrap;
`;
