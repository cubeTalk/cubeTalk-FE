import Modal from "../../../shared/components/modal";
import { useCreateRoomModalStore } from "../model/store";

const CreateRoomModal = () => {
  const { modalVisible, closeModal } = useCreateRoomModalStore((state) => state);
  return (
    <>
      {modalVisible && (
        <Modal closeModal={closeModal}>
          <h1>토론방 생성</h1>  
        </Modal>
      )}
    </>
  );
}

export default CreateRoomModal;