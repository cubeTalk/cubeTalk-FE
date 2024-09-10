const EnterDebateModal = () => {
  const { modalVisible, openModal, closeModal } = useCreateDebateModalStore((state) => state);
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
}

export default EnterDebateModal;