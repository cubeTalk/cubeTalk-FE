import styled from "styled-components";
import { rowflex, scrollBar } from "../../../styles/shared";
import { useEffect, useRef, useState } from "react";
import { mediaQuery } from "../../../routes/layout/Responsive";
import { useChatStore } from "../store";

interface MessageInputProps {
  scrollToBottom: () => void;
}

const MessageInput = ({ scrollToBottom }:MessageInputProps) => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatAdd = useChatStore(state => state.action.chatAdd);

  useEffect(() => {
    const handleResizeHeight = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
        scrollToBottom(); 
      }
    };
  
    handleResizeHeight();
  }, [text, scrollToBottom]);

  // 컨트롤 엔터 + 알트 엔터 => 줄바꿈
  // 일반 엔터 => 메세지 전송
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      return setText(prev => prev + "\n");
    }

    if (e.key === "Enter" && !(e.shiftKey || e.ctrlKey)) {
      e.preventDefault();
      return handleSendMessage();
    }
  };

  // Todo: 메세지 전송 api 생성필요
  const handleSendMessage = () => {
    if (text.trim().length !== 0) {
      chatAdd({
        userName: "나",
        text,
        time: new Date()
      });
      setText("");
    }
  };

  return (
    <InputContainer>
      <TextInput
        ref={textareaRef}
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <SendButton onClick={handleSendMessage} disabled={!text.trim()}>
        <img src="/chatIcon/Send.png" alt="Send" />
      </SendButton>
    </InputContainer>
  );
};

export default MessageInput;

const InputContainer = styled.div`
  ${rowflex}
  margin-top: auto;
  width: 100%;
`;

const TextInput = styled.textarea`
  ${scrollBar}
  width: 100%;
  padding: 10px;
  max-height: 40vh;
  resize: none;
  white-space: pre-wrap;
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
    opacity: ${({ disabled }) => disabled ? 0.2 : 1};
  }

  @media ${mediaQuery.desktop} {
    &:hover {
      background-color: ${({ disabled }) => disabled ? 'var(--color-primary)' : 'var(--color-mid)'};
    }
  }
`;
