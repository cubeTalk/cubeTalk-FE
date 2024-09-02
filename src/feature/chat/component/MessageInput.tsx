import styled from "styled-components";
import { rowflex } from "../../../styles/shared";
import { useRef } from "react";
import { mediaQuery } from "../../../routes/layout/Responsive";

const MessageInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleResizeHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <InputContainer>
      <TextInput
        ref={textareaRef}
        rows={1}
        onChange={handleResizeHeight}
      />
      <SendButton>
        <img src="/chatIcon/Send.png" alt="Send" />
      </SendButton>
    </InputContainer>
  );
}

export default MessageInput;

const InputContainer = styled.div`
  ${rowflex}
  margin-top: auto;
  width: 100%;
`;

const TextInput = styled.textarea`
  width: 100%;
  padding: 10px;
  max-height: 150px;
  resize: none;
  font-family: inherit;
  border-radius: 8px 0px 0px 8px;
`;

const SendButton = styled.button`
  height: 100%;
  padding: 10px;
  cursor: pointer;
  background-color: var(--color-primary);
  border-radius: 0px 8px 8px 0px;

  img {
    width: 22px;
  }

  @media ${mediaQuery.desktop} {
      &:hover {
      background-color: var(--color-mid);
    }
  }
`;