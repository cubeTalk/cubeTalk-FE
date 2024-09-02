import styled from "styled-components";
import { mediaQuery } from "../layout/Responsive";
import { colflex, rowflex } from "../../styles/shared";
import ChatTab from "../../feature/chat/ChatTab";
import ChatScrren from "../../feature/chat/ChatScreen";

const ChatPage = () => {
  return (
    <ChatLayout>
      <ChatTab />
      <ChatScrren />
    </ChatLayout>
  );
};

export default ChatPage;

const ChatLayout = styled.div`
  display: flex;
  height: calc(100vh - 20px);
  width: 100%;
  @media ${mediaQuery.mobile} {
    ${colflex}
    gap: 10px;
  }

  @media ${mediaQuery.tablet} {
    ${rowflex}
    gap: 20px;
  }

  @media ${mediaQuery.desktop} {
    ${rowflex}
    gap: 20px;
  }
`;
