import styled from "styled-components";
import { colflex, mediaQuery, rowflex } from "../../shared/style/commonStyle";
import ChatTab from "./ui/ChatTab";
import ChatScrren from "./ui/ChatScreen";

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
    gap: 5px;
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
