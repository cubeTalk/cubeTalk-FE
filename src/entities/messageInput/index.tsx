import styled from "styled-components";
import { mediaQuery, rowflex, scrollBar } from "../../shared/style/commonStyle";
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";

interface MessageInputProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const MessageInput = ({ containerRef }: MessageInputProps) => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 스크롤이 바닥에 있었으면 계속 유지하도록함
  const scrollToBottom = useCallback((checkingBottom: boolean) => {
    if (!containerRef.current) {
      return;
    }
    const bubbleContainer = containerRef.current;

    if (!checkingBottom) {
      bubbleContainer.scrollTop = bubbleContainer.scrollHeight;
      return;
    }
    const isBottom =
      bubbleContainer.scrollTop + bubbleContainer.clientHeight - bubbleContainer.scrollHeight;
    // -24는 textarea의 한줄 높이
    if (-24 <= isBottom && isBottom <= 0) {
      bubbleContainer.scrollTop = bubbleContainer.scrollHeight - bubbleContainer.clientHeight;
    }
  }, [containerRef]);

  useEffect(() => {
    const handleResizeHeight = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    handleResizeHeight();
    scrollToBottom(true);
  }, [text, scrollToBottom]);

  // 컨트롤 엔터 + 알트 엔터 => 줄바꿈
  // 일반 엔터 => 메세지 전송
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      return setText((prev) => prev + "\n");
    }

    if (e.key === "Enter" && !(e.shiftKey || e.ctrlKey)) {
      e.preventDefault();
      return handleSendMessage();
    }
  };

  // Todo: 메세지 전송 api 생성필요
  const handleSendMessage = () => {
    if (text.trim().length !== 0) {
      setText("");
      scrollToBottom(false);
    }
  };

  return (
    <InputContainer>
      <TextInput
        ref={textareaRef}
        rows={1}
        value={text}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
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
  outline: none;
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
    opacity: ${({ disabled }) => (disabled ? 0.2 : 1)};
  }

  @media ${mediaQuery.desktop} {
    &:hover {
      background-color: ${({ disabled }) =>
        disabled ? "var(--color-primary)" : "var(--color-mid)"};
    }
  }
`;
