import styled from "styled-components";
import RoomCard from "../../feature/chatRooms/RoomCard";
import RoomHeader from "../../feature/chatRooms/RoomHeader";
import { colflex } from "../../styles/shared";

const HomePage = () => {
  return (
    <PageLayout>
      <RoomSection>
        <RoomHeader text="진행중인 토론목록" imgSrc="/Icon/playing.png" />
        <CardList>
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
        </CardList>
      </RoomSection>

      <RoomSection>
        <RoomHeader text="참가가능 토론목록" imgSrc="/Icon/joinable.png" />
        <CardList>
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
        </CardList>
      </RoomSection>
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

const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill);
  margin: 0 auto;
`;
