import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface ButtonProps {
  onClickHandler: React.MouseEventHandler<HTMLButtonElement>;
  text?: string;
}

export const SubmitButton = ({
  onClickHandler,
  text,
  ...rest
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Submit onClick={onClickHandler} {...rest}>
      <h3 className="text-white">{text}</h3>
    </Submit>
  );
};

export const CloseButton = ({
  onClickHandler,
  ...rest
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Close onClick={onClickHandler} {...rest}>
      <img src="/Icon/close.png" alt="close" />
    </Close>
  );
};

const Submit = styled.button`
  background-color: var(--color-green);
  padding: 4px 16px;
  border-radius: 5px;
  font-weight: 700px;
  width: fit-content;
`;

const Close = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  img {
    width: 20px;
  }
`;
