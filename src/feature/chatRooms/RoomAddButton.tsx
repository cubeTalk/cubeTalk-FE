import styled from "styled-components";
import { rowflex } from "../../styles/shared";

const RoomAddButton = () => {
  return (
    <ButtonWrapper>
      <img src="/Icon/create.png" alt="CreateRoom" />
      <ButtonText>토론방생성</ButtonText>
    </ButtonWrapper>
  );
};

export default RoomAddButton;

const ButtonWrapper = styled.button`
  ${rowflex}
  margin-left: auto;
`;

const ButtonText = styled.h3`
  margin: 0px 5px;
`;

