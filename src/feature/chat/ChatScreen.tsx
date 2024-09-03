import styled from "styled-components";
import Chat from "./screen/chat";
import ChatScreenHeader from "./ChatScreenHeader";
import { colflex } from "../../styles/shared";

const ChatScrren = () => {
  return (
    <ChatContainer className="bg-darkgray" >
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
`