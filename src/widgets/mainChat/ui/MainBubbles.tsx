import Announcement from "./Announcement";
import { useMainMessageStore } from "../model/store";
import MessageRender from "../../../entities/message";
import React, { useEffect } from "react";
import { useUpdateMessageList } from "../hook";
import { isChatMessage } from "../../../shared/type";

export const MainBubbles = React.memo(() => {
  const messageList = useMainMessageStore((state) => state.messages);
  useUpdateMessageList();
  useEffect(() => {
    console.log(messageList);
  });
  return (
    <>
      <Announcement />
      {messageList.map((message) => {
        if (isChatMessage(message)) {
          return <MessageRender message={message} key={message.messageId} />;
        }
        return <></>;
      })}
    </>
  );
});
