import { useGetCreatedDebateQuery, useGetStartedDebateQuery } from "../api/query";
import { PagedRoomCardList } from "../../../entities/roomCard";

export const StartedRoomsCardList = () => {
  const { data, isPending, isError } = useGetStartedDebateQuery();
  return (
    <PagedRoomCardList cardList={data} isError={isError} isPending={isPending} />
  );
};

export const CreatedRoomsCardList = () => {
  const { data, isPending, isError } = useGetCreatedDebateQuery();
  return (
    <PagedRoomCardList cardList={data} isError={isError} isPending={isPending} />
  );
};
