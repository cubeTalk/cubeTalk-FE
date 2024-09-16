import Modal from "../../shared/components/modal";
import { useSettingChangeModalStore } from "./model/store";
import { ModalContent } from "./ui/ModalContent";

export const SettingButton = () => {
  const { modalVisible, openModal, closeModal } = useSettingChangeModalStore((state) => state);
  return (
    <>
      <button onClick={() => openModal()}>
        <img src="/chatIcon/setting.png" alt="setting" className="w-5 h-5" />
      </button>
      {modalVisible && (
        <Modal closeModal={closeModal}>
          <ModalContent />
        </Modal>
      )}
    </>
  );
};
