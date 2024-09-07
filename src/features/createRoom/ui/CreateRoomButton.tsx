import styled from "styled-components";
import { rowflex } from "../../../shared/style/commonStyle";
import { useCreateRoomModalStore } from "../model/store";
import CreateRoomModal from "./CreateRoomModal";

const CreateRoomButton = () => {
  const openModal = useCreateRoomModalStore((state) => state.openModal);
  return (
    <>
      <CreatRoom onClick={openModal}>
        <img src="/Icon/create.png" alt="CreateRoom" />
        <h3>토론방생성</h3>
      </CreatRoom>
      <CreateRoomModal />
    </>
  );
};

export default CreateRoomButton;

const CreatRoom = styled.button`
  ${rowflex}
  margin-left: auto;
  h3 {
    margin: 0px 5px;
  }
`;
