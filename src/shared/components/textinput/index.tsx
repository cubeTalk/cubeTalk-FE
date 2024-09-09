import styled from "styled-components";
import { scrollBar } from "../../style/commonStyle";
import { forwardRef, InputHTMLAttributes } from "react";

interface TextInputProps {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  id?: string;
  label?: string;
  warning?: string;
}

export const InlineTextInput = ({
  id,
  label,
  value,
  onChange,
  warning,
  ...rest
}: TextInputProps & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <InputContainer>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Inline
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        $hasWarning={!!warning}
        {...rest}
      />
      {warning && <WarningMessage>{warning}</WarningMessage>}
    </InputContainer>
  );
};

const Inline = styled.input<{ $hasWarning: boolean }>`
  width: 100%;
  padding: 10px;
  white-space: pre-wrap;
  outline: none;
  box-shadow: ${({ $hasWarning }) =>
    $hasWarning ? "1px 1px 5px var(--color-red);" : "1px 1px 5px var(--color-mid);"};
`;

const TextInput: React.ForwardRefRenderFunction<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & TextInputProps
> = ({ id, label, value, onChange, warning, ...rest }, ref) => {
  return (
    <InputContainer>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Multiline
        ref={ref}
        id={id}
        value={value}
        onChange={onChange}
        $hasWarning={!!warning}
        {...rest}
      />
      {warning && <WarningMessage>{warning}</WarningMessage>}
    </InputContainer>
  );
};

export const MultilineTextInput = forwardRef(TextInput);

const Multiline = styled.textarea<{ $hasWarning: boolean }>`
  ${scrollBar}
  width: 100%;
  padding: 10px;
  resize: none;
  white-space: pre-wrap;
  outline: none;
  box-shadow: ${({ $hasWarning }) =>
    $hasWarning ? "1px 1px 5px var(--color-red);" : "1px 1px 5px var(--color-mid);"};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1rem;
  margin: 0 0 0.25rem 0.5rem;
`;

const WarningMessage = styled.span`
  font-size: 0.875rem;
  color: var(--color-red);
  margin: 0.25rem 0 0 0.5rem;
`;
