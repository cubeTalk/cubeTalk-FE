import styled from "styled-components";
import RoomHeader from "../../entities/roomListHeader";
import { colflex } from "../../shared/style/commonStyle";
import { CreatedRoomsCardList, StartedRoomsCardList } from "./ui/CardList";

const StartedRooms = () => {
  return (
    <RoomSection>
      <RoomHeader
        text="진행중인 토론목록"
        imgSrc="/Icon/playing.png"
        isCreateRoom={false}
        status="진행중"
      />
      <StartedRoomsCardList />
    </RoomSection>
  );
};

const CreatedRooms = () => {
  return (
    <RoomSection>
      <RoomHeader
        text="참가 가능 토론목록"
        imgSrc="/Icon/playing.png"
        isCreateRoom={true}
        status="시작전"
      />
      <CreatedRoomsCardList />
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
