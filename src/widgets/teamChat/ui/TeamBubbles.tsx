import React from "react";
import MessageRender from "../../../entities/message";
import { isChatMessage } from "../../../shared/type";
import { useSubMessageStore } from "../model/store";

export const TeamBubbles = React.memo(() => {
  const messageList = useSubMessageStore((state) => state.messages);
  return (
    <>
      {messageList.map((message) => {
        if (isChatMessage(message)) {
          return <MessageRender message={message} key={message.messageId} />;
        }
        return <></>;
      })}
    </>
  );
});
