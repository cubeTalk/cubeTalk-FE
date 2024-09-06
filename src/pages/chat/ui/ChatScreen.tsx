import styled from "styled-components";
import Chat from "../../../widgets/chatScreen/Chat";
import ChatScreenHeader from "./ChatScreenHeader";
import { colflex } from "../../../shared/style/commonStyle";

const ChatScrren = () => {
  return (
    <ChatContainer className="bg-darkgray">
      <ChatScreenHeader />
      <ContentWrapper>
        <Chat />
      </ContentWrapper>
    </ChatContainer>
  );
};

export default ChatScrren;

const ChatContainer = styled.div`
  ${colflex}
  gap: 10px;
  width: 100%;
  border-radius: 8px;
  padding: 10px;
  overflow: auto;
  height: 100%;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  overflow: auto;
`;
