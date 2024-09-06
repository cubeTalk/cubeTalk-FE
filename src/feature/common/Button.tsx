import styled from "styled-components";

interface ButtonProps {
  onclickHandler: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
}

export const SubmitButton = ({ onclickHandler, text }: ButtonProps) => {
  return (
    <CustomButton onClick={onclickHandler}>
      <h3 className="text-white">{text}</h3>
    </CustomButton>
  );
};

const CustomButton = styled.button`
  background-color: var(--color-green);
  padding: 4px 8px;
  border-radius: 5px;
  font-weight: 700px;
`;
