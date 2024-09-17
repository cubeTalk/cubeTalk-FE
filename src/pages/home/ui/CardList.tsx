import { useGetCreatedDebateQuery, useGetStartedDebateQuery } from "../api/query";
import { RoomCardList } from "../../../entities/roomCard";

export const StartedRoomsCardList = () => {
  const { data, isLoading, isError } = useGetStartedDebateQuery();
  return (
    <RoomCardList cardList={data} isError={isError} isLoading={isLoading} started={true} />
  );
};

export const CreatedRoomsCardList = () => {
  const { data, isLoading, isError } = useGetCreatedDebateQuery();
  return (
    <RoomCardList cardList={data} isError={isError} isLoading={isLoading} started={false} />
  );
};
