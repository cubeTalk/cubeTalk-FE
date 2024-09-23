import Announcement from "./Announcement";
import { useMainMessageStore } from "../model/store";
import MessageRender from "../../../entities/message";

export const MainBubbles = () => {
  const messageList = useMainMessageStore((state) => state.messages);

  return (
    <>
      <Announcement />
      {messageList.map((message, index) => {
        return <MessageRender message={message} key={`${message.type}${index}`} />;
      })}
    </>
  );
};
