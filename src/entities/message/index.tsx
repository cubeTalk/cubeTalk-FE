import {
  isChatMessage,
  isEnterMessage,
  isTimerEndMessage,
  isTimerMessage,
  isVoteMessage,
  Message,
} from "../../shared/type";
import Bubble from "./ui/Bubble";
import {
  ModeratorBubble,
  DebateOutComeBubble,
  DebateStartBubble,
  VoteBubble,
} from "./ui/ModeratorBubble";
import { EnterBubble } from "./ui/RoomBubbles";

interface MessageRenderProps {
  message: Message;
}

const MessageRender = ({ message }: MessageRenderProps) => {
  switch (message.type) {
    case "ENTER":
      if (isEnterMessage(message)) {
        return <EnterBubble message={message} /> 
      }
      break;
    case "positiveEntry":
    case "negativeQuestioning":
    case "negativeEntry":
    case "positiveQuestioning":
    case "positiveRebuttal":
    case "negativeRebuttal":
      if (isTimerMessage(message)) {
        if (message.type === "positiveEntry") {
          return <DebateStartBubble />;
        }
        return <ModeratorBubble message={message} />;
      }
      break;
    case "votingTime":
      if (isVoteMessage(message)) {
        return <VoteBubble />;
      }
      break;
    case "result":
      if (isTimerEndMessage(message)) {
        return <DebateOutComeBubble message={message} />;
      }
      break;
    case "찬성": 
    case "반대": 
    case "관전":
    default:
      if (isChatMessage(message)) {
        return <Bubble message={message} />;
      }
      break;
  }
  // console.log("잘못된 메세지 type 입니다.");
  // console.log({ message });
  return <div />;
};

export default MessageRender;
