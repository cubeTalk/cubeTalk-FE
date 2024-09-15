import {
  isChatMessage,
  isTimerEndMessage,
  isTimerMessage,
  isVoteMessage,
  Message,
} from "../../shared/type";
import { useInfoStore } from "../debateInfo";
import Bubble from "./ui/Bubble";
import { ModeratorBubble, DebateOutComeBubble, DebateStartBubble, VoteBubble } from "./ui/ModeratorBubble";

interface MessageRenderProps {
  message: Message;
}

const MessageRender = ({ message }: MessageRenderProps) => {
  const title = useInfoStore((state) => state.debateInfo.title);
  switch (message.type) {
    case "긍정입장":
    case "부정질의":
    case "부정입장":
    case "긍정질의":
    case "긍정반박":
    case "부정반박":
      if (isTimerMessage(message)) {
        if (message.type === "긍정입장") {
          return <DebateStartBubble title={title} />;
        }

        return <ModeratorBubble message={message} />;
      }
      break;
    case "투표":
      if (isVoteMessage(message)) {
        return <VoteBubble />;
      }
      break;
    case "결과":
    case "TIMER_END":
      if (isTimerEndMessage(message)) {
        return <DebateOutComeBubble message={message}/>;
      }
      break;
    case "CHAT":
    default:
      if (isChatMessage(message)) {
        return <Bubble message={message} isLeft={message.isLeft} />;
      }
      break;
  }
  console.error("잘못된 메세지 type 입니다.");
  console.error({ message });
  return <div />;
};

export default MessageRender;