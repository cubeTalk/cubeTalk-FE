import { useGetCreatedDebateQuery, useGetStartedDebateQuery } from "../api/query";
import { RoomCardList } from "../../../entities/roomCard";

export const StartedRoomsCardList = () => {
  const { data, isPending, isError } = useGetStartedDebateQuery();
  return (
    <RoomCardList cardList={data} isError={isError} isPending={isPending} />
  );
};

export const CreatedRoomsCardList = () => {
  const { data, isPending, isError } = useGetCreatedDebateQuery();
  return (
    <RoomCardList cardList={data} isError={isError} isPending={isPending} />
  );
};
