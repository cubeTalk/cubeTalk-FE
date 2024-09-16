import { useQuery } from "@tanstack/react-query";
import { useDebateInfoStore, useUserInfoStore } from "../../debateInfo";
import { useTeamChoseStore } from "../model/store";
import { getDebateParticipants } from "../api/query";
import { spinner } from "../../../shared/style/commonStyle";
import styled from "styled-components";
import { useContext, useEffect } from "react";
import { AlertContext } from "../../alertDialog/model/context";

// 타입 정의
interface TeamButtonProps {
  label: string;
  count: number;
  maxCount: number;
  originTeam: string;
  chosenTeam: string;
  setTeam: (team: string) => void;
  bgColor: string;
  isPending: boolean;
}

const TeamButton = ({
  label,
  count,
  maxCount,
  originTeam,
  chosenTeam,
  setTeam,
  bgColor,
  isPending,
}: TeamButtonProps) => {
  return (
    <button
      className={`min-h-20 ${TeamStyle} ${bgColor} ${chooseBorder(chosenTeam, label)}`}
      onClick={() => setTeam(label)}
    >
      {isPending ? (
        <Spinner />
      ) : (
        <>
          <h3>{label}</h3>
          <h3>{`${count} / ${maxCount}`}</h3>
          {label === originTeam && <h3 className={chosenStyle}>선택중</h3>}
        </>
      )}
    </button>
  );
};

export const TeamButtons = () => {
  const id = useDebateInfoStore((state) => state.id);
  const { data, isPending } = useQuery({
    queryKey: ["getDebateParticipants"],
    queryFn: async () => getDebateParticipants(id),
    refetchInterval: 5000,
  });

  const { alert } = useContext(AlertContext);
  const originTeam = useUserInfoStore((state) => state.role);
  const { team, setTeam } = useTeamChoseStore();

  useEffect(() => {}, [alert, data]);
  if (!(data && data.data)) {
    return (
      <div className="flex justify-center items-center">
        <h2>팀선택 불가능</h2>
      </div>
    );
  }

  const response = data.data;
  return (
    <>
      <div className="flex flex-wrap">
        <TeamButton
          label="찬성"
          count={response.supportCount}
          maxCount={response.maxCapacityCount / 2}
          originTeam={originTeam}
          chosenTeam={team}
          setTeam={setTeam}
          bgColor={"bg-yellow"}
          isPending={isPending}
        />
        <TeamButton
          label="반대"
          count={response.oppositeCount}
          maxCount={response.maxCapacityCount / 2}
          originTeam={originTeam}
          chosenTeam={team}
          setTeam={setTeam}
          bgColor={"bg-sky"}
          isPending={isPending}
        />
      </div>
      <button
        className={`min-h-11 flex flex-row justify-center gap-3 rounded-md py-3 bg-gray ${chooseBorder(team, "관전")}`}
        onClick={() => setTeam("관전")}
      >
        {isPending ? (
          <Spinner />
        ) : (
          <>
            <h3>관전</h3>
            <h3>{`( ${response.spectatorCount} / 4 )`}</h3>
            {originTeam === "관전" && <h3 className={chosenStyle}>선택중</h3>}
          </>
        )}
      </button>
    </>
  );
};

const TeamStyle = "flex flex-1 flex-col justify-center items-center py-1 rounded-md border-2"; // 기본 border 적용
const chosenStyle = "bg-red rounded-xl px-2";
const chooseBorder = (team: string, condition: string) =>
  team === condition ? "border-2 border-green" : "border-2 border-transparent";

const Spinner = styled.div`
  ${spinner}
  width: 30px;
  height: 30px;
`;
