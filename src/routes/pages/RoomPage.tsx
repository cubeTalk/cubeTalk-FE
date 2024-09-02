import styled from "styled-components";
import RoomCard from "../../feature/chatRooms/RoomCard";
import RoomHeader from "../../feature/chatRooms/RoomHeader";
import { colflex } from "../../styles/shared";

const RoomPage = () => {
  return (
    <PageLayout>
      <RoomHeader text="토론 목록" imgSrc="/Icon/playing.png" />
      <RoomCard />
    </PageLayout>
  );
};

export default RoomPage;

const PageLayout = styled.div`
  ${colflex}
  width: 100%;
  
`