import { messageColorMap } from "../../../shared/style/commonStyle";
import { isChatMessage, Message, MessageWithType, Participant } from "../../../shared/type";

const isSameMinute = (timestamp1: string, timestamp2: string) => {
  const date1 = new Date(timestamp1);
  const date2 = new Date(timestamp2);

  return date1.getHours() === date2.getHours() && date1.getMinutes() === date2.getMinutes();
};

// 버블 색상, 메세지 시간, 닉네임 표시 유무 판단
export const handleMessages = (
  newMessage: MessageWithType,
  messages: Message[],
  nickName: string,
  participants?: Participant[]
) => {
  const isLeft = newMessage.sender !== nickName;
  let color = WatchingBubbleColor;
  if (participants) {
    const user = participants.find((user) => user.nickName === newMessage.sender);
    color = messageColorMap.get(user?.role || "관전") || WatchingBubbleColor;
  } else {
    color = messageColorMap.get(newMessage.type) || WatchingBubbleColor;
  }
  const lastMessage = messages[messages.length - 1];
  const isTime = true;
  const isName = true;
  if (
    isChatMessage(lastMessage) &&
    isSameMinute(lastMessage.serverTimeStamp, newMessage.serverTimeStamp)
  ) {
    return [
      ...messages.slice(0, -1),
      { ...lastMessage, isTime: false },
      { ...newMessage, isLeft, color, isName: false, isTime },
    ];
  }
  return [...messages, { ...newMessage, isLeft, color, isName: isLeft && isName, isTime }];
};

// 버블 색상, 메세지 시간, 닉네임 표시 유무 판단
export const handleMessage = (
  newMessage: MessageWithType,
  nextSeverTimeStamp: string,
  nickName: string,
  participants: Participant[],
  isName = true
) => {
  const isLeft = newMessage.sender !== nickName;
  const user = participants.find((user) => user.nickName === newMessage.sender);
  const color = messageColorMap.get(user?.role || "관전") || WatchingBubbleColor;
  
  if (nextSeverTimeStamp && isSameMinute(nextSeverTimeStamp, newMessage.serverTimeStamp)) {
    return {
      ...newMessage,
      isLeft,
      color,
      isName: isLeft && isName,
      isTime: false,
    };
  }
  return {
    ...newMessage,
    isLeft,
    color,
    isName: isLeft && isName,
    isTime: true,
  };
};

const WatchingBubbleColor = "var(--sub-white)";