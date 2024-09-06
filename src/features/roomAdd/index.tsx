import styled from "styled-components";
import { rowflex } from "../../shared/style/commonStyle";

const RoomAddButton = () => {
  return (
    <ButtonWrapper>
      <img src="/Icon/create.png" alt="CreateRoom" />
      <h3>토론방생성</h3>
    </ButtonWrapper>
  );
};

export default RoomAddButton;

const ButtonWrapper = styled.button`
  ${rowflex}
  margin-left: auto;
  h3 {
    margin: 0px 5px;
  }
`;
