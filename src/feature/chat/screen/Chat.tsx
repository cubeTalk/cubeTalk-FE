import styled from "styled-components";
import MessageInput from "../component/MessageInput";
import { colflex } from "../../../styles/shared";

const Chat = () => {
  return (
    <ScreenLayout>
      <h2>전체 채팅</h2>
      <MessageInput />
    </ScreenLayout>
  );
}

export default Chat;

const ScreenLayout = styled.div`
  ${colflex}
  height: 100%;
`;