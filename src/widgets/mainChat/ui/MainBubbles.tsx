import Announcement from "./Announcement";
import { useMainMessageStore } from "../model/store";
import MessageRender from "../../../entities/message";
import { isChatMessage } from "../../../shared/type";

export const MainBubbles = () => {
  const messageList = useMainMessageStore((state) => state.messages);

  return (
    <>
      <Announcement />
      {messageList.map((message) => {
        if (isChatMessage(message)) {
          return <MessageRender message={message} key={message.messageId} />;
        }
      })}
    </>
  );
};
