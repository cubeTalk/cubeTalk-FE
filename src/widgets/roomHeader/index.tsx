import styled from "styled-components";
import { colflex, rowflex } from "../../shared/style/commonStyle";
import CreateDebateButton from "../../features/createDebate";
import Divider from "../../shared/components/divider";

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
      <CreateDebateButton />
      {/* <DorpdownContainer>
        <Dropdown list={["목록1", "목록2", "목록3"]} selected="목록1" />
        <Dropdown list={["목록1", "목록2", "목록3"]} selected="목록1"/>
        <Dropdown list={["목록1", "목록2", "목록3"]} selected="목록1"/>
      </DorpdownContainer> */}

      <Divider />
    </HeaderContainer>
  );
};

export default RoomHeader;

const HeaderContainer = styled.div`
  ${colflex}
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
