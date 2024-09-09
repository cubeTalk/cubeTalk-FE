import styled from "styled-components";
import VoteBubble from "./VoteBubble";
import { mediaQuery, shadow } from "../../../shared/style/commonStyle";

interface ModeratorProps {
  topic?: string;
  order: number;
}

const ModeratorBubble: React.FC<ModeratorProps> = ({ topic, order }) => {
  const statements = [
    ["찬성팀의 입장이 종료되었습니다.", "반대팀의 질의가 진행됩니다."],
    ["반대팀의 질의가 종료되었습니다.", "반대팀의 입론이 진행됩니다."],
    ["반대팀의 입장이 종료되었습니다.", "찬성팀의 질의가 진행됩니다."],
    ["찬성팀의 질의가 종료되었습니다.", "찬성팀의 반박이 진행됩니다."],
    ["찬성팀의 반박이 종료되었습니다.", "반대팀의 반박이 진행됩니다."],
    ["토론이 종료되었습니다. 결과를 선택해주세요."],
    ["투표 결과를 공개하겠습니다!"],
  ];
  if (order === 0) {
    return (
      <div className="flex justify-center">
        <Moderator className="bg-yellow">
          <h3>
            <Strong>[ {topic} ]</Strong>라는 주제로 토론이 시작됩니다.
          </h3>
          <h3>
            찬성팀의 <Strong>입론</Strong> 먼저 시작하겠습니다.
          </h3>
        </Moderator>
      </div>
    );
  }
  if (order === 6) {
    return (
      <div className="flex justify-center">
        <Moderator className="bg-white">
          <h3>{statements[order - 1]}</h3>
          <VoteBubble />
        </Moderator>
      </div>
    );
  }

  if (order === 7) {
    return (
      <div className="flex justify-center">
        <Moderator className="bg-white">
          <h3>{statements[order - 1]}</h3>
          <h3>
            오늘의 <Strong>MVP는 ... {"user0222"}</Strong>님 축하드립니다🎉
          </h3>
          <h3>
            최종 찬성팀<Strong>{4}표</Strong> 반대팀<Strong>{2}표</Strong>로{" "}
            <Strong>{"찬성팀"}</Strong>이 승리하였습니다
          </h3>
        </Moderator>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <Moderator className={order % 2 === 1 ? "bg-sky" : "bg-yellow"}>
        <h3>{statements[order - 1][0]}</h3>
        <Strong>{statements[order - 1][1]}</Strong>
      </Moderator>
    </div>
  );
};

export default ModeratorBubble;

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
