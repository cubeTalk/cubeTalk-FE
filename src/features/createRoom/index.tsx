import styled from "styled-components";
import { useCreateRoomModalStore } from "./model/store";
import { rowflex } from "../../shared/style/commonStyle";
import ModalContent from "./ui/ModalContent";
import Modal from "../../shared/components/modal";

const CreateRoomButton = () => {
  const { modalVisible, openModal, closeModal } = useCreateRoomModalStore((state) => state);
  return (
    <>
      <CreateRoom onClick={openModal}>
        <img src="/Icon/create.png" alt="CreateRoom" />
        <h3>토론방생성</h3>
      </CreateRoom>
      {modalVisible && (
        <Modal closeModal={closeModal}>
          <ModalContent />
        </Modal>
      )}
    </>
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
