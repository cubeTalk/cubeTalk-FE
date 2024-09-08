import styled from "styled-components";
import { rowflex } from "../../../shared/style/commonStyle";
import { useCreateRoomModalStore } from "../model/store";
import Modal from "../../../shared/components/modal";
import ModalContent from "./ModalContent";

const CreateRoomButton = () => {
  const { modalVisible, openModal, closeModal } = useCreateRoomModalStore((state) => state);
  return (
    <>
      <CreatRoom onClick={openModal}>
        <img src="/Icon/create.png" alt="CreateRoom" />
        <h3>토론방생성</h3>
      </CreatRoom>
      {modalVisible && (
        <Modal closeModal={closeModal}>
          <ModalContent />
        </Modal>
      )}
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
