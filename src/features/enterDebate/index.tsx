import Modal from "../../shared/components/modal";
import { useisOwnerStore } from "../createDebate/model/store";
import { useEnterModalStore } from "./model/store";
import { ModalContent } from "./ui/ModalContent";

const EnterDebateModal = () => {
  const isOwner = useisOwnerStore((state) => state.isOwner);
  const { modalVisible, closeModal } = useEnterModalStore((state) => state);
  return (
    <>
      {modalVisible && (
        <Modal closeModal={isOwner ? undefined : closeModal}>
          <ModalContent />
        </Modal>
      )}
    </>
  );
};

export default EnterDebateModal;
