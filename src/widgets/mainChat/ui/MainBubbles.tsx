import Announcement from "./Announcement";
import { useMainMessageStore } from "../model/store";
import MessageRender from "../../../entities/message";
import { useParticipantsStore } from "../../../entities/participants/model/store";

export const MainBubbles  = () => {
  const participants = useParticipantsStore(state => state.list);
  const messageList = useMainMessageStore((state) => state.messages);

  return (
    <>
      <Announcement />
      {messageList.map((message) => {
        if (message.type === "CHAT") {
          const userTeam = participants.find((user) => user.nickName === message.sender)?.role;
          return (
            <MessageRender message={message} isleft={userTeam === "찬성"}/>
          );
        }
        return (
          <MessageRender message={message} />
        );
      })}
    </>
  );
}
