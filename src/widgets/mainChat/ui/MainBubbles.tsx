import Announcement from "./Announcement";
import { useMainMessageStore } from "../model/store";
import MessageRender from "../../../entities/message";

export const MainBubbles = () => {
  const messageList = useMainMessageStore((state) => state.messages);

  return (
    <>
      <Announcement />
      {messageList.map((message) => {
        return <MessageRender message={message} />;
      })}
    </>
  );
};
