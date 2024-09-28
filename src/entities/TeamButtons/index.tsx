import { useDebateParticipantsQuery } from "./api/query";
import { ProsConsFreeTeam, SpectatorTeam } from "./ui/TeamButtons";

export const TeamButtons = ({ chatMode = "찬반" }: { chatMode?: string }) => {
  const { data, isPending, isError } = useDebateParticipantsQuery();

  if (isError || !data) {
    return (
      <div className="flex justify-center items-center my-4">
        <h3>팀선택 오류 입니다. 다시 시도해 주세요</h3>
      </div>
    );
  }

  return (
    <>
      <ProsConsFreeTeam data={data} chatMode={chatMode} isPending={isPending} />
      {chatMode === "찬반" && <SpectatorTeam count={data.spectatorCount} isPending={isPending} />}
    </>
  );
};
