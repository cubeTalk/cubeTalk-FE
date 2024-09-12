import {
  ChatMessage,
  Message,
  TimerEndMessage,
  TimerMessage,
  VoteMessage,
} from "../../shared/type";
import { useInfoStore } from "../debateInfo";
import Bubble from "./ui/Bubble";
import { ModeratorBubble, DebateOutComeBubble, DebateStartBubble, VoteBubble } from "./ui/ModeratorBubble";

interface MessageRenderProps {
  message: Message;
  isleft?: boolean;
}

const MessageRender = ({ message, isleft }: MessageRenderProps) => {
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
        return <Bubble message={message} isleft={isleft} />;
      }
      break;
  }
  console.error("잘못된 메세지 type 입니다.");
  console.error({ message });
  return <div />;
};

export default MessageRender;

// type gurads
const isChatMessage = (message: Message): message is ChatMessage => message.type === "CHAT";
const isVoteMessage = (message: Message): message is VoteMessage => message.type === "투표";
const isTimerMessage = (message: Message): message is TimerMessage =>
  message.type === "긍정입장" ||
  message.type === "부정질의" ||
  message.type === "부정입장" ||
  message.type === "긍정질의" ||
  message.type === "긍정반박" ||
  message.type === "부정반박" ||
  message.type === "투표" ||
  message.type === "결과" ||
  message.type === "TIMER_END";
const isTimerEndMessage = (message: Message): message is TimerEndMessage =>
  message.type === "TIMER_END";