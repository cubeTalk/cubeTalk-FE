import styled from "styled-components";
import { useCreateDebateModalStore } from "./model/store";
import { rowflex } from "../../shared/style/commonStyle";
import ModalContent from "./ui/ModalContent";
import Modal from "../../shared/components/modal";

export const CreateDebateButton = ({ ...rest }) => {
  const openModal = useCreateDebateModalStore((state) => state.openModal);
  return (
    <CreateRoom onClick={openModal} { ...rest }>
      <img src="/Icon/create.png" alt="CreateRoom" />
      <h3>토론방생성</h3>
    </CreateRoom>
  );
};

export const CreateDebateModal = () => {
  const { modalVisible, closeModal } = useCreateDebateModalStore((state) => state);
  return (
    <>
      {modalVisible && (
        <Modal closeModal={closeModal}>
          <ModalContent />
        </Modal>
      )}
    </>
  );
};

const CreateRoom = styled.button`
  ${rowflex}
  h3 {
    margin: 0px 5px;
  }
`;
