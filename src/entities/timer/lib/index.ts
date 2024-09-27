import { ProgressMessageType } from "../../../shared/type";

export const WARNING_TIME = 30;

const TYPEE2K = new Map([
  ["chatDuration", { text: "토론시간", color: "white" }],
  ["positiveEntry", { text: "긍정입장", color: "yellow" }],
  ["negativeQuestioning", { text: "부정질의", color: "sky" }],
  ["negativeEntry", { text: "부정입장", color: "sky" }],
  ["positiveQuestioning", { text: "긍정질의", color: "yellow" }],
  ["positiveRebuttal", { text: "긍정반박", color: "yellow" }],
  ["negativeRebuttal", { text: "부정반박", color: "sky" }],
  ["votingTime", { text: "토론투표", color: "white" }],
  ["result", { text: "토론결과", color: "white" }]
]);

export const getTypeInfo = (type: string) => {
  const typeInfo = TYPEE2K.get(type);
  if (typeInfo) {
    return typeInfo;
  }
  return { text: "토론종료", color: "red" };
};

// 서버 시간을 파싱하는함수
export const timeToSeconds = (time: string) => {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};


const COLOR_MAP = {
  chatDuration: { start: [59, 130, 246], end: [252, 165, 165] },
  positiveEntry: { start: [255, 255, 0], end: [252, 165, 165] },
  negativeQuestioning: { start: [135, 206, 250], end: [252, 165, 165] },
  negativeEntry: { start: [135, 206, 250], end: [252, 165, 165] },
  positiveQuestioning: { start: [255, 255, 0], end: [252, 165, 165] },
  positiveRebuttal: { start: [255, 255, 0], end: [252, 165, 165] },
  negativeRebuttal: { start: [135, 206, 250], end: [252, 165, 165] },
  votingTime: { start: [255, 255, 255], end: [252, 165, 165] },
  result: { start: [255, 255, 255], end: [252, 165, 165] },
};


// 시작 컬러 Blue: rgb(59, 130, 246) 끝 컬러 Light Red: rgb(252, 165, 165)
export const interpolateColor = (percent: number, type: ProgressMessageType) => {
  const { start, end } = COLOR_MAP[type] || COLOR_MAP["chatDuration"];
  const r = Math.round(start[0] + (end[0] - start[0]) * (1 - percent));
  const g = Math.round(start[1] + (end[1] - start[1]) * (1 - percent));
  const b = Math.round(start[2] + (end[2] - start[2]) * (1 - percent));
  return `rgb(${r}, ${g}, ${b})`;
};

export const formatTime = (time: number) => {
  const roundedTime = Math.ceil(time);
  if (roundedTime >= WARNING_TIME) {
    return `${Math.ceil(roundedTime / 60)}분`;
  } else {
    return `${roundedTime}초`;
  }
};