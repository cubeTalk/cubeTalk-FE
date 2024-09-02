import styled from "styled-components";
import Chat from "./content/chat";
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
  height: 100%;
  width: 100%;
  border-radius: 8px;
  padding: 10px;
`;

const ContentWrapper = styled.div`
  border-radius: 8px;
  background-color: var(--color-light);
  height: 100%;
  padding: 5px;
`