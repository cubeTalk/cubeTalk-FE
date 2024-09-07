import { CloseButton } from "../../button";
import { ModalProps } from "..";

const ModalImage = ({ closeModal, children }: ModalProps) => {
  return (
    <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-30 p-2 rounded shadow-lg">
      <CloseButton onClickHandler={closeModal}/>
      <div className="flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default ModalImage;