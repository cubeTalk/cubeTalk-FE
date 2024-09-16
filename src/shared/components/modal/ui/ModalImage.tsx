import { CloseButton } from "../../button";
import { ModalProps } from "..";
import styled from "styled-components";
import { scrollBar } from "../../../style/commonStyle";

const ModalImage = ({ closeModal, children }: ModalProps) => {
  return (
    <Image className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-30 p-4 rounded-lg shadow-lg w-11/12 max-w-[554px] max-h-[80dvh]">
      {closeModal ? <CloseButton onClickHandler={closeModal} /> : <div />}
      {children}
    </Image>
  );
};

export default ModalImage;

const Image = styled.div`
  ${scrollBar}
  overflow-y: auto;
`;
