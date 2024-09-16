import styled from "styled-components";
import RoomHeader from "../../widgets/roomHeader";
import { CardList } from "./ui/CardList";
import { colflex } from "../../shared/style/commonStyle";

const RoomPage = () => {
  return (
    <PageLayout>
      <RoomHeader text="토론 목록" imgSrc="/Icon/playing.png" />
      <CardList />
    </PageLayout>
  );
};

export default RoomPage;

const PageLayout = styled.div`
  ${colflex}
  width: 100%;
`;
