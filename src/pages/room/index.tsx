import styled from "styled-components";
import RoomCard from "../../entities/chatRoom";
import RoomHeader from "../../widgets/roomHeader";
import { colflex } from "../../shared/style/commonStyle";

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
`;
