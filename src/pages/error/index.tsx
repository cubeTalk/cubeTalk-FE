import { useState } from "react";
import Modal from "../../shared/components/modal";

const ErrorPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
    <button onClick={() => setModalVisible(true)}>모달열기</button>
    {modalVisible && (
      <Modal closeModal={() => setModalVisible(false)}>
        <p>모달입니다.</p>  
      </Modal>
    )}
    </>
  );
};

export default ErrorPage;
