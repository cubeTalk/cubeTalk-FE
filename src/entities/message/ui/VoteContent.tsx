import styled, { keyframes } from "styled-components";
import { center, colflex } from "../../../shared/style/commonStyle";
import { useParticipantsStore } from "../../participants/model/store";
import { Participant } from "../../../shared/type";
import { useVoteDebateStore } from "../model/store";
import { voteMessageWebSocket } from "../../../app/worker";
import { useState } from "react";

const TeamButtons = () => {
  const team = useVoteDebateStore((state) => state.team);
  const setTeam = useVoteDebateStore((state) => state.actions.setTeam);
  return (
    <ButtonContainer>
      <CircleButton
        $isselected={team === "SUPPORT"}
        onClick={() => setTeam("SUPPORT")}
        className="bg-yellow"
      >
        <h2>찬성</h2>
      </CircleButton>
      <CircleButton
        $isselected={team === "OPPOSITE"}
        onClick={() => setTeam("OPPOSITE")}
        className="bg-sky"
      >
        <h2>반대</h2>
      </CircleButton>
    </ButtonContainer>
  );
};

const User = ({ user }: { user: Participant }) => {
  const name = user.nickName;
  const MVP = useVoteDebateStore((state) => state.MVP);
  const setMVP = useVoteDebateStore((state) => state.actions.setMVP);
  return (
    <div className="flex justify-between items-center" key={name}>
      <h3 className={user.role === "찬성" ? "text-yellow" : "text-sky"}>{name}</h3>
      <label>
        <input
          className="hidden"
          type="checkbox"
          checked={MVP === name}
          onChange={() => setMVP(name)}
        />
        <CustomCheckbox $isselected={MVP === name} />
      </label>
    </div>
  );
};

const Submit = () => {
  const [isSend, setIsSend] = useState(false);
  const MVP = useVoteDebateStore((state) => state.MVP);
  const team = useVoteDebateStore((state) => state.team);
  const onClickHandler = () => {
    if (team === "SUPPORT" || team === "OPPOSITE") {
      voteMessageWebSocket({
        type: "VOTE",
        team,
        mvp: MVP,
      });
      setIsSend(true);
    }
  };
  return (
    <>
      {isSend ? (
        <CheckMark>투표완료 ✔</CheckMark>
      ) : (
        <SubmitButton onClick={onClickHandler}>투표하기</SubmitButton>
      )}
    </>
  );
};

const VoteContent = () => {
  const users = useParticipantsStore((state) => state.participants);
  return (
    <>
      <TeamButtons />
      <UserContainer>
        {users.map((user) => (
          <User user={user} key={user.nickName} />
        ))}
      </UserContainer>
      <Submit />
    </>
  );
};

export default VoteContent;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 10px 0px;
`;

const CircleButton = styled.button<{ $isselected: boolean }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: ${({ $isselected }) => ($isselected ? "2px solid green" : "2px solid transparent")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border 0.3s ease;

  h2 {
    margin: 0;
  }
`;

const UserContainer = styled.div`
  ${colflex}
  margin: 10px 0px;
  padding: 10px 20px;
  background-color: var(--black);
  border-radius: 15px;
  gap: 5px;

  h3 {
    text-align: left;
  }
`;

const CustomCheckbox = styled.span<{ $isselected: boolean }>`
  ${center}
  width: 20px;
  height: 20px;
  border: ${({ $isselected }) =>
    $isselected ? `2px solid var(--white)` : "2px solid var(--color-mid)"};
  transition: all 0.3s ease;
  margin-left: 10px;
  &:after {
    content: "✓";
    color: var(--white);
    font-weight: 700;
    opacity: ${({ $isselected }) => ($isselected ? 1 : 0)};
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const SubmitButton = styled.button`
  background-color: var(--color-green);
  padding: 4px 8px;
  border-radius: 5px;
  font-weight: 700px;
  width: fit-content;

  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #255e28;
  }
  &.fade-out {
    animation: ${fadeOut} 0.5s forwards;
  }
`;

const CheckMark = styled.div`
  background-color: var(--color-green);
  border-radius: 5px;
  padding: 4px 8px;
  font-weight: 700px;
  width: fit-content;
  color: white;
  animation: ${fadeIn} 0.5s forwards;
`;
