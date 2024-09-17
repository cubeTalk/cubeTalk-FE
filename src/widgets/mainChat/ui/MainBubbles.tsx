import Announcement from "./Announcement";
import { useMainMessageStore } from "../model/store";
import MessageRender from "../../../entities/message";
import React, { useEffect } from "react";
import { isChatMessage } from "../../../shared/type";

export const MainBubbles = React.memo(() => {
  const messageList = useMainMessageStore((state) => state.messages);
  useEffect(() => {
    console.log(messageList);
  },[messageList]);
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
});
