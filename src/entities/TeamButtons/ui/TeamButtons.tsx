import { useUserInfoStore } from "../../debateInfo";
import { useTeamChoseStore } from "../model/store";
import { GetDebateParticipantsResponse } from "../api/query";
import { spinner } from "../../../shared/style/commonStyle";
import styled from "styled-components";
import { useEnterModalStore } from "../../../features/enterDebate/model/store";
import { useEffect } from "react";
import { ProsConsButton } from "./ProsConsButton";

export const ProsConsFreeTeam = ({
  data,
  chatMode,
  isPending,
}: {
  data: GetDebateParticipantsResponse;
  isPending: boolean;
  chatMode: string;
}) => {
  const isStarted = useEnterModalStore((state) => state.isStarted);
  const { team, setTeam } = useTeamChoseStore();
  const originTeam = useUserInfoStore((state) => state.role);
  useEffect(() => {
    setTeam("");
  }, [setTeam]);

  return (
    <div className="flex flex-wrap gap-1 flex-grow w-full">
      {chatMode === "찬반" ? (
        <>
          <ProsConsButton
            label="찬성"
            count={data.supportCount}
            maxCount={data.maxCapacityCount / 2}
            originTeam={originTeam}
            chosenTeam={team}
            setTeam={setTeam}
            bgColor={"bg-yellow"}
            isPending={isPending}
            isdisable={
              isStarted || originTeam === "찬성" || data.maxCapacityCount / 2 === data.supportCount
            }
          />
          <ProsConsButton
            label="반대"
            count={data.oppositeCount}
            maxCount={data.maxCapacityCount / 2}
            originTeam={originTeam}
            chosenTeam={team}
            setTeam={setTeam}
            bgColor={"bg-sky"}
            isPending={isPending}
            isdisable={
              isStarted || originTeam === "반대" || data.maxCapacityCount / 2 === data.oppositeCount
            }
          />
        </>
      ) : (
        <ProsConsButton
          label="자유"
          count={data.supportCount + data.oppositeCount}
          maxCount={data.maxCapacityCount}
          originTeam={originTeam}
          chosenTeam={team}
          setTeam={setTeam}
          bgColor={"bg-emerald"}
          isPending={isPending}
          isdisable={
            isStarted ||
            originTeam === "자유" ||
            data.supportCount + data.oppositeCount === data.maxCapacityCount
          }
        />
      )}
    </div>
  );
};

export const SpectatorTeam = ({ count, isPending }: { count: number; isPending: boolean }) => {
  const originTeam = useUserInfoStore((state) => state.role);
  const { team, setTeam } = useTeamChoseStore();
  return (
    <button
      className={`w-full mt-1 min-h-11 flex flex-row justify-center gap-3 rounded-md py-3 bg-gray ${chooseBorder(team, "관전")}`}
      onClick={() => setTeam("관전")}
      disabled={count === 4 || originTeam === "관전"}
    >
      {isPending ? (
        <Spinner />
      ) : (
        <>
          <h3>관전</h3>
          <h3>{`( ${count} / 4 )`}</h3>
          {originTeam === "관전" && <h3 className={chosenStyle}>선택중</h3>}
        </>
      )}
    </button>
  );
};

const chosenStyle = "bg-red rounded-xl px-2";
const chooseBorder = (team: string, condition: string) =>
  team === condition ? "border-2 border-green" : "border-2 border-transparent";

const Spinner = styled.div`
  ${spinner}
  width: 30px;
  height: 30px;
`;
