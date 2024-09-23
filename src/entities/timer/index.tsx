import { useState, useEffect, useContext } from "react";
import { useDebateTimerStore } from "./model/store";
import { timeToSeconds } from "./lib";
import { useDebateInfoStore } from "../debateInfo";
import { GaugeBar, LeftTime, TypeText } from "./ui";
import { useRoomSettingStore } from "../debateSetting/model/store";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../alertDialog/model/context";

export const DebateTimer = () => {
  const chatStatus = useDebateInfoStore((state) => state.chatStatus);
  const debateSetting = useRoomSettingStore((state) => state.debateSettings);
  const chatDuration = useRoomSettingStore((state) => state.chatDuration);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const time = useDebateTimerStore((state) => state.time);
  const type = useDebateTimerStore((state) => state.type);
  const navigate = useNavigate();
  const { alert } = useContext(AlertContext);
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
    const timeDifference = Math.abs(timeLeft - serverTimeInSeconds);
    // 서버와 1초 이상 차이가 나면 서버 시간으로 보정
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 0.1;
        if (timeDifference >= 1) {
          return serverTimeInSeconds;
        } else {
          return newTime > 0 ? newTime : 0;
        }
      });
    }, 100);
    return () => clearInterval(timer);
  }, [serverTimeInSeconds, timeLeft]);

  useEffect(() => {
    if (type === "result" && timeLeft === 0) {
      alert("토론이 종료되었습니다. 메인화면으로 이동합니다.", "이동", "", () => navigate("/"));
    }
  }, [type, timeLeft, alert, navigate]);

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
