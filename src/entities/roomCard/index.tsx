import styled from "styled-components";
import { blackSpinner } from "../../shared/style/commonStyle";
import { RoomCardType } from "../../shared/type";
import RoomCard from "./ui/RoomCard";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { PagedCardListIndex } from "./ui/PagedCardListIndex";

const NoDebateRooms = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-60 gap-4">
      <h2 className="text-2xl">참가가능한 토론이 존재하지 않습니다.</h2>
    </div>
  );
};

const ErrorText = () => {
  return (
    <div className="flex justify-center items-center min-h-60 ">
      <h2>데이터를 로딩 오류입니다. </h2>
    </div>
  );
};

const Spinning = () => {
  return (
    <div className="flex justify-center items-center">
      <CardSpinner />
    </div>
  );
};

interface RoomCardListProp {
  cardList: RoomCardType[] | undefined;
  isError: boolean;
  isPending: boolean;
}

export const RoomCardList = ({ cardList, isError, isPending }: RoomCardListProp) => {
  if (isPending) {
    return <Spinning />;
  }

  if (isError || !cardList) {
    return <ErrorText />;
  }

  return (
    <div className="grid grid-cols-1 gap-1">
      {cardList.length === 0 ? (
        <NoDebateRooms />
      ) : (
        cardList.map((room: RoomCardType) => <RoomCard room={room} key={room.id} />)
      )}
    </div>
  );
};

export const PagedRoomCardList = ({ cardList, isError, isPending }: RoomCardListProp) => {
  const [currentPage, setCurrentPage] = useState(0);
  const minFourHeight = useMediaQuery({
    query: "(max-width: 500px)",
  });
  const cardsPerPage = minFourHeight ? 3 : 4;

  if (isPending) return <Spinning />;
  if (isError || !cardList) return <ErrorText />;
  if (cardList.length === 0) return <NoDebateRooms />;

  const pageCount = Math.ceil(cardList.length / cardsPerPage);
  return (
    <div className="relative overflow-hidden">
      <CardContainer style={{ transform: `translateX(-${currentPage * 100}%)` }}>
        {[...Array(pageCount)].map((_, pageIndex) => (
          <CardWrapper key={pageIndex}>
            <div className="grid grid-cols-1 gap-1">
              {cardList
                .slice(pageIndex * cardsPerPage, (pageIndex + 1) * cardsPerPage)
                .map((room: RoomCardType) => (
                  <RoomCard room={room} key={room.id} />
                ))}
            </div>
          </CardWrapper>
        ))}
      </CardContainer>
      {pageCount > 1 && (
        <PagedCardListIndex
          currentPage={currentPage}
          pageCount={pageCount}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

const CardContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease;
`;

const CardWrapper = styled.div`
  flex: 0 0 100%;
`;

const CardSpinner = styled.div`
  ${blackSpinner}
  width: 60px;
  height: 60px;
`;
