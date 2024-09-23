import { useUserInfoStore } from "../../../entities/debateInfo";
import { TeamButtons } from "../../../entities/TeamButtons";
import { useTeamChoseStore } from "../../../entities/TeamButtons/model/store";
import { SubmitButton } from "../../../shared/components/button";
import { useChangeTeamQuery } from "../api/query";

const ChangeTeam = () => {
  const { mutate, isPending } = useChangeTeamQuery();
  const team = useTeamChoseStore((state) => state.team);
  const subChannelId = useUserInfoStore((state) => state.subChannelId);
  const onClickHandler = () => mutate({ role: team, subChannelId });
  return <SubmitButton text="팀변경" onClickHandler={onClickHandler} isPending={isPending} />;
};

export const ModalContent = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <h1>팀 변경</h1>
      <TeamButtons />
      <ChangeTeam />
    </div>
  );
};