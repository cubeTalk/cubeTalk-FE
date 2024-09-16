import styled from "styled-components";
import VoteContent from "./VoteContent";
import { mediaQuery, shadow } from "../../../shared/style/commonStyle";
import { TimerEndMessage, TimerMessage } from "../../../shared/type";
import { useDebateInfoStore } from "../../debateInfo";

export const DebateStartBubble = () => {
  const title = useDebateInfoStore((state) => state.title);
  return (
    <div className="flex justify-center">
      <Moderator className="bg-yellow">
        <h3>
          <Strong>[ {title} ]</Strong>라는 주제로 토론이 시작됩니다.
        </h3>
        <h3>
          찬성팀의 <Strong>입론</Strong> 먼저 시작하겠습니다.
        </h3>
      </Moderator>
    </div>
  );
};

export const VoteBubble = () => {
  return (
    <div className="flex justify-center">
      <Moderator className="bg-white">
        <h3>토론이 종료되었습니다. 결과를 선택해주세요.</h3>
        <VoteContent />
      </Moderator>
    </div>
  );
};

export const DebateOutComeBubble = ({ message }: { message: TimerEndMessage }) => {
  const support = message.result.support;
  const opposite = message.result.opposite;
  return (
    <div className="flex justify-center">
      <Moderator className="bg-white">
        <h3>투표 결과를 공개하겠습니다!</h3>
        <h3>
          오늘의 <Strong>MVP는 ... {message.MVP}</Strong>님 축하드립니다🎉
        </h3>
        <h3>
          최종 찬성팀 <Strong>{support}표</Strong> 반대팀 <Strong>{opposite}표</Strong>로{" "}
          {support > opposite ? (
            <>
              <Strong>찬성팀</Strong>이 승리하였습니다.
            </>
          ) : support < opposite ? (
            <>
              <Strong>반대팀</Strong>이 승리하였습니다.
            </>
          ) : (
            "무승부입니다."
          )}
        </h3>
      </Moderator>
    </div>
  );
};

interface Statement {
  message: string[];
  color: string;
}

const statements: Map<TimerMessage["type"], Statement> = new Map([
  [
    "부정질의",
    {
      message: ["찬성팀의 입장이 종료되었습니다.", "반대팀의 질의가 진행됩니다."],
      color: "bg-sky",
    },
  ],
  [
    "부정입장",
    {
      message: ["반대팀의 질의가 종료되었습니다.", "반대팀의 입론이 진행됩니다."],
      color: "bg-sky",
    },
  ],
  [
    "긍정질의",
    {
      message: ["반대팀의 입장이 종료되었습니다.", "찬성팀의 질의가 진행됩니다."],
      color: "bg-yellow",
    },
  ],
  [
    "긍정반박",
    {
      message: ["찬성팀의 질의가 종료되었습니다.", "찬성팀의 반박이 진행됩니다."],
      color: "bg-yellow",
    },
  ],
  [
    "부정반박",
    {
      message: ["찬성팀의 반박이 종료되었습니다.", "반대팀의 반박이 진행됩니다."],
      color: "bg-sky",
    },
  ],
]);

export const ModeratorBubble = ({ message }: { message: TimerMessage }) => {
  const statement = statements.get(message.type);

  if (!statement) {
    return <></>;
  }

  return (
    <div className="flex justify-center">
      <Moderator className={statement.color}>
        <h3>{statement.message[0]}</h3>
        <Strong>{statement.message[1]}</Strong>
      </Moderator>
    </div>
  );
};

const Strong = styled.strong`
  font-weight: 700;
`;

const Moderator = styled.div`
  ${shadow}
  text-align: center;
  width: fit-content;
  line-height: 1.6;
  border-radius: 5px;
  padding: 10px 40px;
  max-width: 60%;
  margin-top: 5px;
  @media ${mediaQuery.mobile} {
    max-width: 80%;
    padding: 10px 20px;
  }

  h3 {
    font-weight: 400;
  }
`;
