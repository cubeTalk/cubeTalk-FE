import { useUserInfoStore } from "../../debateInfo";
import { useTeamChoseStore } from "../model/store";

// 타입 정의
interface TeamButtonProps {
  label: string;
  count: number;
  maxCount: number;
  originTeam: string;
  chosenTeam: string;
  setTeam: (team: string) => void;
  bgColor: string;
}

const TeamButton = ({
  label,
  count,
  maxCount,
  originTeam,
  chosenTeam,
  setTeam,
  bgColor,
}: TeamButtonProps) => (
  <button
    className={`${TeamStyle} ${bgColor} ${chooseBorder(chosenTeam, label)}`}
    onClick={() => setTeam(label)}
  >
    <h3>{label}</h3>
    <h3>{`${count} / ${maxCount}`}</h3>
    {label === originTeam && <h3 className={chosenStyle}>선택중</h3>}
  </button>
);

export const TeamButtons = () => {
  const originTeam = useUserInfoStore((state) => state.role);
  const { team, setTeam } = useTeamChoseStore();
  return (
    <>
      <div className="flex flex-wrap">
        <TeamButton
          label="찬성"
          count={1}
          maxCount={3}
          originTeam={originTeam}
          chosenTeam={team}
          setTeam={setTeam}
          bgColor={"bg-yellow"}
        />
        <TeamButton
          label="반대"
          count={2}
          maxCount={3}
          originTeam={originTeam}
          chosenTeam={team}
          setTeam={setTeam}
          bgColor={"bg-sky"}
        />
      </div>
      <button
        className={`flex flex-row justify-center gap-3 rounded-md py-3 bg-gray ${chooseBorder(team, "관전")}`}
        onClick={() => setTeam("관전")}
      >
        <h3>관전</h3>
        <h3>{`( 0 / 4 )`}</h3>
        {originTeam === "관전" && <h3 className={chosenStyle}>선택중</h3>}
      </button>
    </>
  );
};

const TeamStyle = "flex flex-1 flex-col justify-center items-center py-1 rounded-md border-2"; // 기본 border 적용
const chosenStyle = "bg-red rounded-xl px-2";
const chooseBorder = (team: string, condition: string) =>
  team === condition ? "border-2 border-green" : "border-2 border-transparent";
