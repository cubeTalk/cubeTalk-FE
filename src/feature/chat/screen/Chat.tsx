import styled from "styled-components";
import MessageInput from "../component/MessageInput";
import { colflex, scrollBar } from "../../../styles/shared";
import { Bubble } from "../component/Bubbles";
import { ChangeTeamBubble, EnterBubble } from "../component/RoomBubbles";

const Chat = () => {
  return (
    <ScreenLayout>
      <h2>전체 채팅</h2>
      <BubbleContainer>
        {Array.from({length: 20}, () => <Bubble />)}
        <EnterBubble userName="배배고고파파" isEnter={true} />
        <ChangeTeamBubble userName="배배고고파파" team="찬성팀" />
        <Bubble isleft={false} />
      </BubbleContainer>
      <MessageInput />
    </ScreenLayout>
  );
};

export default Chat;

const ScreenLayout = styled.div`
  ${colflex}
  padding: 5px;
  border-radius: 8px;
  background-color: var(--color-light);
  height: 100%;
`;

const BubbleContainer = styled.div`
  ${colflex}
  ${scrollBar}
  gap: 10px;
  padding: 5px 10px 20px 0px;
  overflow-y: auto;
`