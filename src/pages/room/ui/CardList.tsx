import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { blackSpinner } from "../../../shared/style/commonStyle";
import styled from "styled-components";
import { useGetDebateRoomsQuery } from "../api/query";
import { RoomCardList } from "../../../entities/roomCard";

const Spinning = () => {
  return (
    <div className="flex justify-center items-center">
      <CardSpinner />
    </div>
  );
};

export const CardList = () => {
  const { rooms, isPending, isError, isFetchingNextPage, fetchNextPage } = useGetDebateRoomsQuery();
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <>
      <RoomCardList
        cardList={rooms}
        isError={isError}
        isPending={isPending}
      />
      {isFetchingNextPage ? <Spinning /> : <div ref={ref} />}
    </>
  );
};

const CardSpinner = styled.div`
  ${blackSpinner}
  width: 60px;
  height: 60px;
`;
