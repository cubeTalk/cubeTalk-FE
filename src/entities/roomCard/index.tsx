import styled from "styled-components";
import { blackSpinner } from "../../shared/style/commonStyle";
import { RoomCardType } from "../../shared/type";
import { CreateDebateButton } from "../../features/createDebate";
import RoomCard from "./ui/RoomCard";

const NoDebateRooms = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-60 gap-4">
      <h2 className="text-2xl">참가가능한 토론이 존재하지 않습니다.</h2>
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

interface RoomCardListProp {
  cardList: RoomCardType[] | undefined;
  isError: boolean;
  isLoading: boolean;
  started: boolean;
}

export const RoomCardList = ({ cardList, isError, isLoading, started }: RoomCardListProp) => {
  if (isError || !cardList) {
    return <ErrorText />;
  }

  if (isLoading) {
    return <Spinning />;
  }

  return (
    <div>
      {cardList.length === 0 ? (
        <NoDebateRooms />
      ) : (
        cardList.map((room: RoomCardType) => (
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
            started={started}
          />
        )))}
    </div>
  );
};

const CardSpinner = styled.div`
  ${blackSpinner}
  width: 60px;
  height: 60px;
`;
