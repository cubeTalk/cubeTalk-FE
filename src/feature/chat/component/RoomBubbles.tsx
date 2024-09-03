import styled from "styled-components";
import { mediaQuery } from "../../../routes/layout/Responsive";

interface EnterBubbleProps {
  userName: string;
  isEnter: boolean;
}

type TeamType = "찬성팀" | "반대팀" | "관전";

interface ChangeTeamBubbleProps {
  userName: string;
  team: TeamType;
}

export const EnterBubble = ({ userName, isEnter } : EnterBubbleProps) => {
  if (isEnter) {
    return (
      <div className="flex justify-center">
        <RoomBubble>{userName}님이 입장하였습니다.</RoomBubble>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <RoomBubble>{userName}님이 퇴장하였습니다.</RoomBubble>
    </div>
  );
};

export const ChangeTeamBubble = ({ userName, team }: ChangeTeamBubbleProps) => {
  return (
    <div className="flex justify-center">
      <RoomBubble>
        {userName}님이 {team}으로 변경하였습니다.
      </RoomBubble>
    </div>  
  );
};

const RoomBubble = styled.h4`
  text-align: center;
  width: fit-content;
  background-color: var(--color-primary);
  color: var(--white);
  line-height: 1.4;
  padding: 5px 10px;
  border-radius: 5px;
  word-wrap: break-word;
  max-width: 60%;
  margin-top: 5px;

  @media ${mediaQuery.mobile} {
    max-width: 80%;
  }
`;