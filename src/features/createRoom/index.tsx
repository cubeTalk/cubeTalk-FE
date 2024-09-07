import styled from "styled-components";
import { rowflex } from "../../shared/style/commonStyle";

const CreateRoomButton = () => {
  return (
    <CreateRoom>
      <img src="/Icon/create.png" alt="CreateRoom" />
      <h3>토론방생성</h3>
    </CreateRoom>
  );
};

export default CreateRoomButton;

const CreateRoom = styled.button`
  ${rowflex}
  margin-left: auto;
  h3 {
    margin: 0px 5px;
  }
`;
