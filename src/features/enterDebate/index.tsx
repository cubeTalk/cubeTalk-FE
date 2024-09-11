import { useInfoStore } from "../../entities/debateInfo";
import Modal from "../../shared/components/modal";
import { useEnterModalStore } from "./model/store";
import { ModalContent } from "./ui/ModalContent";

const EnterDebateModal = () => {
  const isOwner = useInfoStore((state) => state.userInfo.isOwner);
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
