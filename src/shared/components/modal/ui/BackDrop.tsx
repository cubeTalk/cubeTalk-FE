import { HTMLAttributes } from "react";
import { ModalProps } from "..";

const BackDrop = ({ closeModal, ...rest }: ModalProps & HTMLAttributes<HTMLDivElement>) => {
  return <div className="fixed inset-0 z-20 bg-black bg-opacity-40" onClick={closeModal} {...rest}/>;
};

export default BackDrop;
