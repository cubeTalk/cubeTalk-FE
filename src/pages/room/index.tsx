import styled from "styled-components";
import RoomHeader from "../../entities/roomListHeader";
import { CardList } from "./ui/CardList";
import { colflex } from "../../shared/style/commonStyle";

const RoomPage = () => {
  return (
    <PageLayout>
      <RoomHeader text="토론 목록" imgSrc="/Icon/playing.png" isHome={false} isCreateRoom={true} />
      <CardList />
    </PageLayout>
  );
};

export default RoomPage;

const PageLayout = styled.div`
  ${colflex}
  width: 100%;
`;
