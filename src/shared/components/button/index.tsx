import styled from "styled-components";

interface ButtonProps {
  onClickHandler: React.MouseEventHandler<HTMLButtonElement>;
  text?: string;
}

export const SubmitButton = ({ onClickHandler, text }: ButtonProps) => {
  return (
    <Submit onClick={onClickHandler}>
      <h3 className="text-white">{text}</h3>
    </Submit>
  );
};

export const CloseButton = ({ onClickHandler }: ButtonProps) => {
  return (
    <Close onClick={onClickHandler}>
      <img src="/Icon/close.png" alt="close" />
    </Close>
  );
}

const Submit = styled.button`
  background-color: var(--color-green);
  padding: 4px 8px;
  border-radius: 5px;
  font-weight: 700px;
`;

const Close = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  img {
    width: 20px;
  }
`;
