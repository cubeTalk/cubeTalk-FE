import { ModalProps } from "..";

const BackDrop = ({ closeModal }: ModalProps) => {
  return (
    <div 
      className="fixed inset-0 z-20 bg-black bg-opacity-40"
      onClick={closeModal}
    />
  );
};

export default BackDrop;

