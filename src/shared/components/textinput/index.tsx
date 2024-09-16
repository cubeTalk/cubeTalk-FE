import styled from "styled-components";
import { scrollBar } from "../../style/commonStyle";
import { forwardRef, InputHTMLAttributes, useState } from "react";

interface TextInputProps {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  label?: string;
  warning?: string;
}

export const InlineTextInput = ({
  label,
  value,
  onChange,
  warning,
  ...rest
}: TextInputProps & InputHTMLAttributes<HTMLInputElement>) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <InputContainer>
      {label && <Label htmlFor={label}>{label}</Label>}
      <Inline
        id={label}
        type="text"
        value={value}
        onFocus={() => setIsFocused(true)}
        onChange={onChange}
        $hasWarning={isFocused && !!warning}
        {...rest}
      />
      {isFocused && warning && <WarningMessage>{warning}</WarningMessage>}
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
> = ({ label, value, onChange, warning, ...rest }, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <InputContainer>
      {label && <Label htmlFor={label}>{label}</Label>}
      <Multiline
        ref={ref}
        id={label}
        value={value}
        onFocus={() => setIsFocused(true)}
        onChange={onChange}
        $hasWarning={isFocused && !!warning}
        {...rest}
      />
      {isFocused && warning && <WarningMessage>{warning}</WarningMessage>}
    </InputContainer>
  );
};

export const MultilineTextInput = forwardRef(TextInput);

const Multiline = styled.textarea<{ $hasWarning: boolean }>`
  ${scrollBar}
  width: 100%;
  height: 100%;
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
