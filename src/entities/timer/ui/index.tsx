import { ProgressMessageType } from "../../../shared/type";
import { formatTime, getTypeInfo, interpolateColor, WARNING_TIME } from "../lib";
import { useDebateTimerStore } from "../model/store";

export const TypeText = () => {
  const type = useDebateTimerStore((state) => state.type);
  return (
    <div className={`break-keep text-${getTypeInfo(type).color} font-bold`}>
      {getTypeInfo(type).text}
    </div>
  );
};

export const LeftTime = ({ timeLeft }: { timeLeft: number }) => {
  return (
    <div
      className={`break-keep text-white font-bold ${timeLeft <= WARNING_TIME ? "animate-pulse" : ""}`}
    >
      {formatTime(timeLeft)}
    </div>
  );
};

export const GaugeBar = ({ timeLeft, totalTime }: { timeLeft: number; totalTime: number }) => {
  const type = useDebateTimerStore((state) => state.type);
  return (
    <div className="mx-2 flex-grow h-full w-full">
      <div
        className="rounded-lg h-full transition-all duration-100 ease-linear"
        style={{
          width: `${100 - (timeLeft / totalTime) * 100}%`,
          backgroundColor: interpolateColor(timeLeft / totalTime, type as ProgressMessageType),
        }}
      />
    </div>
  );
};
