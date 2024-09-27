import { useState, useEffect } from "react";
import { useDebateTimerStore } from "./model/store";
import { timeToSeconds } from "./lib";
import { useDebateInfoStore } from "../debateInfo";
import { GaugeBar, LeftTime, TypeText } from "./ui";
import { useRoomSettingStore } from "../debateSetting/model/store";

export const DebateTimer = () => {
  const chatStatus = useDebateInfoStore((state) => state.chatStatus);
  const debateSetting = useRoomSettingStore((state) => state.debateSettings);
  const chatDuration = useRoomSettingStore((state) => state.chatDuration);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const time = useDebateTimerStore((state) => state.time);
  const type = useDebateTimerStore((state) => state.type);
  const serverTimeInSeconds = timeToSeconds(time);

  useEffect(() => {
    if (type === "chatDuration") {
      setTimeLeft(chatDuration);
      setTotalTime(chatDuration);
    } else if (type === "votingTime" || type === "result") {
      setTimeLeft(30);
      setTotalTime(30);
    } else {
      const startTotalTime = debateSetting[type as keyof typeof debateSetting] ?? 0;
      setTimeLeft(60 * startTotalTime);
      setTotalTime(60 * startTotalTime);
    }
  }, [chatDuration, debateSetting, type]);

  useEffect(() => {
    // 서버와 1초 이상 차이가 나면 서버 시간으로 보정
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 0.1;
        if (Math.abs(timeLeft - serverTimeInSeconds) >= 1) {
          return serverTimeInSeconds;
        } else {
          return newTime > 0 ? newTime : 0;
        }
      });
    }, 100);
    return () => clearInterval(timer);
  }, [serverTimeInSeconds, timeLeft]);

  return chatStatus === "STARTED" ? (
    <div className="flex flex-row w-full h-2 items-center justify-between">
      <TypeText />
      <GaugeBar timeLeft={timeLeft} totalTime={totalTime} />
      <LeftTime timeLeft={timeLeft} />
    </div>
  ) : (
    <></>
  );
};
