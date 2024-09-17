import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { RoomCardType } from "../../../shared/type";
import { blackSpinner } from "../../../shared/style/commonStyle";
import styled from "styled-components";
import { useGetDebateRoomsQuery } from "../api/query";
import { RoomCardList } from "../../../entities/roomCard";
import { useDebateSearchParamsStore } from "../../../widgets/roomHeader/model/store";
import RoomCard from "../../../entities/roomCard/ui/RoomCard";

const NoDebateRooms = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-60 gap-4">
      <h2 className="text-2xl">참가 가능한 토론이 존재하지 않습니다.</h2>
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

export const CardList = () => {
  const { data, isLoading, isError, isFetchingNextPage, fetchNextPage } = useGetDebateRoomsQuery();
  const mode = useDebateSearchParamsStore((state) => state.mode);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isError || !data || !data.pages) {
    return <ErrorText />;
  }

  if (isLoading) {
    return <Spinning />;
  }
  
  return (
    <>
      <div>
        {data.pages.map((rooms: RoomCardType[], index) =>
          rooms.length !== 0 ? (
            rooms.map((room: RoomCardType) => (
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
                started={mode === "STARTED"}
              />
            ))
          ) : index === 0 ? (
            <NoDebateRooms />
          ) : (
            <></>
          )
        )}
      </div>
      {isFetchingNextPage ? <Spinning /> : <div ref={ref} />}
    </>
  );
};

const CardSpinner = styled.div`
  ${blackSpinner}
  width: 60px;
  height: 60px;
`;
