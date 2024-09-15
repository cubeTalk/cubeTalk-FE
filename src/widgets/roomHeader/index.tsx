import styled from "styled-components";
import { colflex, rowflex } from "../../shared/style/commonStyle";
import Divider from "../../shared/components/divider";
import Dropdown from "../../shared/components/dropdown";
import { CreateDebateButton } from "../../features/createDebate";

interface RoomHeaderProps {
  text: string;
  imgSrc: string;
  isHome?: boolean;
}

const RoomHeader = ({ text, imgSrc, isHome = false }: RoomHeaderProps) => {
  return (
    <HeaderContainer>
      <Title>
        <img src={imgSrc} alt="titleIcon" />
        <h2>{text}</h2>
      </Title>
      {!isHome && <CreateDebateButton />}
      {!isHome && (
        <DorpdownContainer>
          <Dropdown list={["목록1", "목록2", "목록3"]} selected="목록1" />
          <Dropdown list={["목록1", "목록2", "목록3"]} selected="목록1" />
          <Dropdown list={["목록1", "목록2", "목록3"]} selected="목록1" />
        </DorpdownContainer>
      )}

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
