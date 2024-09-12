import MessageRender from "../../../entities/message";
import { useSubMessageStore } from "../model/store";

export const TeamBubbles = () => {
  const messageList = useSubMessageStore((state) => state.messages);
  return (
    <>
      {messageList.map((message) => {
        return <MessageRender message={message} />;
      })}
    </>
  );
};
