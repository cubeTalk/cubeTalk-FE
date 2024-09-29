import styled from "styled-components";
import { useDebateParticipantsQuery } from "./api/query";
import { ProsConsFreeTeam, SpectatorTeam } from "./ui/TeamButtons";
import { spinner } from "../../shared/style/commonStyle";

export const TeamButtons = ({ chatMode = "찬반" }: { chatMode?: string }) => {
  const { data, isError } = useDebateParticipantsQuery();

  if (isError) {
    return (
      <div className="flex justify-center items-center my-4">
        <h3>팀선택 오류 입니다. 다시 시도해 주세요</h3>
      </div>
    );
  }

  if (!data) {
    return <Spinner />;
  }

  return (
    <>
      <ProsConsFreeTeam data={data} chatMode={chatMode} />
      {chatMode === "찬반" && <SpectatorTeam count={data.spectatorCount} />}
    </>
  );
};

const Spinner = styled.div`
  ${spinner}
  width: 40px;
  height: 40px;
`;
