import styled from "styled-components";
import RoomCard from "../../entities/roomCard";
import RoomHeader from "../../widgets/roomHeader";
import { colflex, blackSpinner } from "../../shared/style/commonStyle";
import { useQuery } from "@tanstack/react-query";
import { getCreatedDebateQuery, getStartedDebateQuery } from "./api/query";
import { useContext, useEffect } from "react";
import { AlertContext } from "../../entities/alertDialog/model/context";
import { RoomCardType } from "../../shared/type";
import { CreateDebateButton } from "../../features/createDebate";

const NoDebateRooms = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-60 gap-4">
      <h2 className="text-2xl">{text} 토론이 존재하지 않습니다.</h2>
      <CreateDebateButton />
    </div>
  );
};

const StartedRooms = () => {
  const { alert } = useContext(AlertContext);
  const { data, isPending, isError } = useQuery({
    queryKey: ["getStartedDebate"],
    queryFn: async () => getStartedDebateQuery("찬반"),
    refetchInterval: 10000,
    retry: 1,
  });

  useEffect(() => {
    if (isError) {
      alert("토론방 목록을 가져오는데 실패하였습니다.", "확인");
    }
  }, [isError, alert]);

  return (
    <RoomSection>
      <RoomHeader text="진행중인 토론목록" imgSrc="/Icon/playing.png" isHome={true} />
      <CardList>
        {isPending ? (
          <div className="flex justify-center items-center min-h-60">
            <CardSpinner />
          </div>
        ) : data?.data?.length === 0 ? (
          <NoDebateRooms text={"진행중인"} />
        ) : (
          data?.data?.map((room: RoomCardType) => (
            <RoomCard
              key={room.id} // key prop 추가
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
      </CardList>
    </RoomSection>
  );
};

const CreatedRooms = () => {
  const { alert } = useContext(AlertContext);
  const { data, isPending, isError } = useQuery({
    queryKey: ["getCreatedDebate"],
    queryFn: async () => getCreatedDebateQuery("찬반"),
  });

  useEffect(() => {
    if (isError) {
      alert("토론방 목록을 가져오는데 실패하였습니다.", "확인");
    }
  }, [isError, alert]);

  return (
    <RoomSection>
      <RoomHeader text="참가 가능 토론목록" imgSrc="/Icon/playing.png" isHome={true} />
      <CardList>
        {isPending ? (
          <div className="flex justify-center items-center">
            <CardSpinner />
          </div>
        ) : data?.data?.length === 0 ? (
          <NoDebateRooms text={"참가 가능한"} />
        ) : (
          data?.data?.map((room: RoomCardType) => (
            <RoomCard
              key={room.id} // key prop 추가
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
      </CardList>
    </RoomSection>
  );
};

const HomePage = () => {
  return (
    <PageLayout>
      <StartedRooms />
      <CreatedRooms />
    </PageLayout>
  );
};

export default HomePage;

const PageLayout = styled.div`
  ${colflex}
  width: 100%;
  gap: 20px;
`;

const RoomSection = styled.div`
  ${colflex}
`;

const CardList = styled.div``;

const CardSpinner = styled.div`
  ${blackSpinner}
  width: 60px;
  height: 60px;
`;
