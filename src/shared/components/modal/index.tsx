import BackDrop from "./ui/BackDrop";
import { ReactNode } from "react";
import ModalImage from "./ui/ModalImage";
import { ModalPortal } from "./model/ModalPortal";

export type ModalProps = { 
  children?: ReactNode; 
  closeModal: () => void 
};

const Modal = ({ children, closeModal }: ModalProps) => {
  return (
    <ModalPortal>
      <div className="flex items-center justify-center inset-0 ">
        <BackDrop closeModal={closeModal}/>
        <ModalImage closeModal={closeModal}>
          {children}
        </ModalImage>
      </div>
    </ModalPortal>
  );
};

export default Modal;