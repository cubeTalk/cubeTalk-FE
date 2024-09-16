import styled from "styled-components";
import RoomCard from "../../../entities/roomCard";
import { CreateDebateButton } from "../../../features/createDebate";
import { blackSpinner } from "../../../shared/style/commonStyle";
import { RoomCardType } from "../../../shared/type";
import { useGetCreatedDebateQuery, useGetStartedDebateQuery } from "../api/query";

const NoDebateRooms = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-60 gap-4">
      <h2 className="text-2xl">{text} 토론이 존재하지 않습니다.</h2>
      <CreateDebateButton />
    </div>
  );
};

const ErrorText = () => {
  return (
    <div className="flex justify-center items-center min-h-60 ">
      <h2>데이터를 로딩 오류입니다. </h2>
    </div>
  );
};

const Spinning = () => {
  return (
    <div className="flex justify-center items-center">
      <CardSpinner />
    </div>
  );
};

export const StartedRoomsCardList = () => {
  const { data, isPending, isError } = useGetStartedDebateQuery();
  if (isError || !(data && data.data)) {
    return <ErrorText />;
  }

  return (
    <div>
      {isPending ? (
        <Spinning />
      ) : data.data.length === 0 ? (
        <NoDebateRooms text={"진행중인"} />
      ) : (
        data.data.map((room: RoomCardType) => (
          <RoomCard
            key={room.id}
            title={room.title}
            description={room.description}
            id={room.id}
            chatDuration={room.chatDuration}
            chatMode={room.chatMode}
            createdAt={room.createdAt}
            maxParticipants={room.maxParticipants}
            currentParticipantsCount={room.currentParticipantsCount}
            started={true}
          />
        ))
      )}
    </div>
  );
};

export const CreatedRoomsCardList = () => {
  const { data, isPending, isError } = useGetCreatedDebateQuery();

  if (isError || !(data && data.data)) {
    return <ErrorText />;
  }
  return (
    <div>
      {isPending ? (
        <Spinning />
      ) : data.data.length === 0 ? (
        <NoDebateRooms text={"참가 가능한"} />
      ) : (
        data.data.map((room: RoomCardType) => (
          <RoomCard
            key={room.id}
            title={room.title}
            description={room.description}
            id={room.id}
            chatDuration={room.chatDuration}
            chatMode={room.chatMode}
            createdAt={room.createdAt}
            maxParticipants={room.maxParticipants}
            currentParticipantsCount={room.currentParticipantsCount}
            started={false}
          />
        ))
      )}
    </div>
  );
};

const CardSpinner = styled.div`
  ${blackSpinner}
  width: 60px;
  height: 60px;
`;
