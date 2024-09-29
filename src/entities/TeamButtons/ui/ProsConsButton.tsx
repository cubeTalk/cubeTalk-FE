import { DebateRole } from "../../../shared/type";

// 타입 정의
interface ProsConsButtonProps {
  label: DebateRole;
  count: number;
  maxCount: number;
  originTeam: string;
  chosenTeam: string;
  setTeam: (team: DebateRole) => void;
  bgColor: string;
  isdisable: boolean;
}

export const ProsConsButton = ({
  label,
  count,
  maxCount,
  originTeam,
  chosenTeam,
  setTeam,
  bgColor,
  isdisable,
}: ProsConsButtonProps) => {
  return (
    <button
      className={`min-h-20  ${TeamStyle} ${isdisable ? "bg-lightgray" : bgColor} ${chooseBorder(chosenTeam, label)}`}
      onClick={() => setTeam(label)}
      disabled={isdisable}
    >
      <h3>{label}</h3>
      <h3>{`${count} / ${maxCount}`}</h3>
      {label === originTeam && <h3 className={chosenStyle}>선택중</h3>}
    </button>
  );
};

const TeamStyle = "flex flex-1 flex-col justify-center items-center rounded-md border-2";
const chosenStyle = "bg-red rounded-xl px-2";
const chooseBorder = (team: string, condition: string) =>
  team === condition ? "border-2 border-green" : "border-2 border-transparent";