import { useUserInfoStore } from "../../debateInfo";
import { useTeamChoseStore } from "../model/store";
import { useDebateParticipantsQuery } from "../api/query";
import { spinner } from "../../../shared/style/commonStyle";
import styled from "styled-components";
import { useEnterModalStore } from "../../../features/enterDebate/model/store";

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
  isdisable: boolean;
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
  isdisable,
}: TeamButtonProps) => {
  return (
    <button
      className={`min-h-20 ${TeamStyle} ${isdisable ? "bg-lightgray" : bgColor} ${chooseBorder(chosenTeam, label)}`}
      onClick={() => setTeam(label)}
      disabled={isdisable}
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
  const { data, isPending } = useDebateParticipantsQuery();
  const originTeam = useUserInfoStore((state) => state.role);
  const { team, setTeam } = useTeamChoseStore();
  const isStarted = useEnterModalStore(state => state.isStarted);

  if (!data) {
    return (
      <div className="flex justify-center items-center my-4">
        <h3>팀선택 오류 입니다. 다시 시도해 주세요</h3>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-0.5">
        <TeamButton
          label="찬성"
          count={data.supportCount}
          maxCount={data.maxCapacityCount / 2}
          originTeam={originTeam}
          chosenTeam={team}
          setTeam={setTeam}
          bgColor={"bg-yellow"}
          isPending={isPending}
          isdisable={isStarted || data.maxCapacityCount / 2 === data.supportCount}
        />
        <TeamButton
          label="반대"
          count={data.oppositeCount}
          maxCount={data.maxCapacityCount / 2}
          originTeam={originTeam}
          chosenTeam={team}
          setTeam={setTeam}
          bgColor={"bg-sky"}
          isPending={isPending}
          isdisable={isStarted || data.maxCapacityCount / 2 === data.oppositeCount}
        />
      </div>
      <button
        className={`min-h-11 flex flex-row justify-center gap-3 rounded-md py-3 bg-gray ${chooseBorder(team, "관전")}`}
        onClick={() => setTeam("관전")}
        disabled={data.spectatorCount === 4}
      >
        {isPending ? (
          <Spinner />
        ) : (
          <>
            <h3>관전</h3>
            <h3>{`( ${data.spectatorCount} / 4 )`}</h3>
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
