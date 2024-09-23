import { messageColorMap } from "../../../shared/style/commonStyle";
import { isChatMessage, Message, MessageWithType } from "../../../shared/type";

const isSameMinute = (timestamp1: string, timestamp2: string) => {
  const date1 = new Date(timestamp1);
  const date2 = new Date(timestamp2);

  return date1.getHours() === date2.getHours() && date1.getMinutes() === date2.getMinutes();
};

// 같은 유저가 보냈는지, 같은 유저인데 같은 시간대인지, 첫 메세지는 닉네임 존재, 마지막 메세지는 시간존재
export const handleMessages = (
  newMessage: MessageWithType,
  messages: Message[],
  nickName: string
) => {
  const isLeft = newMessage.sender !== nickName;
  const color = messageColorMap.get(newMessage.type) || WatchingBubbleColor;
  const lastMessage = messages[messages.length - 1];
  const isTime = true;
  if (
    lastMessage &&
    isChatMessage(lastMessage) &&
    lastMessage.sender === newMessage.sender &&
    isSameMinute(lastMessage.serverTimeStamp, newMessage.serverTimeStamp)
  ) {
    return [
      ...messages.slice(0, -1),
      { ...lastMessage, isTime: false },
      { ...newMessage, isLeft, color, isName: false, isTime },
    ];
  }
  return [...messages, { ...newMessage, isLeft, color, isName: isLeft, isTime }];
};

// 시간은 다음 메세지가 같은 유저인데 같은 시간대인지, 닉네임은 이전 메세지가 같은 유저인지, 
export const handleMessage = (
  newMessage: MessageWithType,
  nextMessage: Message | null,
  nickName: string,
  beforeSame: boolean,
) => {
  const isLeft = newMessage.sender !== nickName;
  const color = messageColorMap.get(newMessage.type) || WatchingBubbleColor;

  if (
    nextMessage &&
    isChatMessage(nextMessage) &&
    nextMessage.sender === newMessage.sender &&
    isSameMinute(nextMessage.serverTimeStamp, newMessage.serverTimeStamp)
  ) {
    return {
      ...newMessage,
      isLeft,
      color,
      isName: isLeft && !beforeSame,
      isTime: false,
    };
  }
  return {
    ...newMessage,
    isLeft,
    color,
    isName: isLeft && !beforeSame,
    isTime: true,
  };
};

const WatchingBubbleColor = "var(--sub-white)";
