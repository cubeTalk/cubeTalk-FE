import { SubmitButton } from "../../shared/components/button";
import Modal from "../../shared/components/modal";
import { useChangeTeamModalStore } from "./model/store";
import { ModalContent } from "./ui/ModalContent";

export const ChangeTeamButton = () => {
  const openModal = useChangeTeamModalStore(state => state.openModal);
  return (
    <SubmitButton text="팀변경" onClickHandler={openModal} className="mr-1 mt-1"/>
  );
}

export const ChangeTeamModal = () => {
  const { modalVisible, closeModal } = useChangeTeamModalStore((state) => state);
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

