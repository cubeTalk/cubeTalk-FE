import styled from "styled-components";
import { useisOwnerStore } from "../createDebate/model/store";
import { commonButton, spinner } from "../../shared/style/commonStyle";
import { useParticipantsStore } from "../../entities/participants/model/store";
import { useReadyMutate, useStartMutate } from "./api/query";
import { useUserInfoStore } from "../../entities/debateInfo";

const Start = () => {
  const participants = useParticipantsStore((state) => state.participants);
  const currentMaxReady = participants.filter((user) => user.role !== "관전").length;
  const currentReady = participants.filter((user) => user.status === "READY").length;
  const { mutate, isPending } = useStartMutate();
  return (
    <StartButton
      disabled={isPending}
      $ready={currentMaxReady === currentReady}
      onClick={() => mutate()}
    >
      {isPending ? <Spinner /> : <h3>시작하기</h3>}
    </StartButton>
  );
};

const Ready = () => {
  const myStatus = useParticipantsStore((state) => state.myStatus);
  const mutate = useReadyMutate();

  return (
    <ReadyButton $ready={myStatus === "READY"} onClick={() => mutate(myStatus)}>
      <h3>{myStatus === "READY" ? "대기하기" : "준비하기"}</h3>
    </ReadyButton>
  );
};

export const StatusButton = () => {
  const isOwner = useisOwnerStore((state) => state.isOwner);
  const role = useUserInfoStore((state) => state.role);
  return <>{isOwner ? <Start /> : role !== "관전" ? <Ready /> : <></>}</>;
};

const StartButton = styled.button<{ $ready: boolean }>`
  ${commonButton}
  background-color: ${({ $ready }) => ($ready ? "var(--color-red)" : "var(--color-mid)")};
  padding: 0px 8px;
  margin: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ $ready }) => ($ready ? "red" : "var(--color-light)")};
  }
`;

const ReadyButton = styled.button<{ $ready: boolean }>`
  ${commonButton}
  background-color: ${({ $ready }) => ($ready ? "var(--color-green)" : "var(--color-red)")};
  padding: 0px 8px;
  margin: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ $ready }) => ($ready ? "lightgreen" : "red")};
  }
`;

const Spinner = styled.div`
  ${spinner}
  width: 20px;
  height: 20px;
`;
