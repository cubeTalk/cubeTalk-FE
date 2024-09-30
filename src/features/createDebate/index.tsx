import styled from "styled-components";
import { useCreateDebateModalStore } from "./model/store";
import { rowflex } from "../../shared/style/commonStyle";
import ModalContent from "./ui/ModalContent";
import Modal from "../../shared/components/modal";

export const CreateDebateButton = ({ ...rest }) => {
  const openModal = useCreateDebateModalStore((state) => state.openModal);
  return (
    <HoverLine>
      <CreateRoom onClick={openModal} {...rest}>
        <img src="/Icon/create.png" alt="CreateRoom" />
        <h3>토론방생성</h3>
      </CreateRoom>
    </HoverLine>
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

const HoverLine = styled.div`
  display: inline-block;
  margin-left: auto;
`;

const CreateRoom = styled.button`
  ${rowflex}
  h3 {
    margin: 0px 5px;
  }
  transition: transform 0.2s ease;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: var(--color-free);
    transform: scaleX(0);
    transition: transform 0.2s ease;
  }

  &:hover {
    transform: translateY(4px);
    &::after {
      transform: scaleX(1);
    }
  }
`;
