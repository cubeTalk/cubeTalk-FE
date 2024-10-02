import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const PagedCardListIndex = ({
  pageCount,
  currentPage,
  setCurrentPage,
}: {
  pageCount: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) => {
  const navigate = useNavigate();
  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const nextPage = () => {
    if (currentPage + 1 === pageCount) {
      navigate("/room");
      return;
    }
    changePage((currentPage + 1) % pageCount);
  };
  const prevPage = () => changePage((currentPage - 1 + pageCount) % pageCount);

  return (
    <div className="flex justify-center items-center mt-4 space-x-2">
      <PageControlButton onClick={prevPage}>
        <img alt="left" src="/Icon/down.svg" className="rotate-90 w-4 h-4" />
      </PageControlButton>
      {[...Array(pageCount)].map((_, index) => (
        <button
          key={index}
          onClick={() => changePage(index)}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            index === currentPage ? "bg-slate-600 scale-125" : "bg-slate-300"
          }`}
        />
      ))}
      <PageControlButton onClick={nextPage}>
        <img alt="right" src="/Icon/down.svg" className="-rotate-90 w-4 h-4" />
      </PageControlButton>
    </div>
  );
};

const PageControlButton = styled.button`
  background-color: rgba(200, 200, 200, 0.7);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(150, 150, 150, 0.9);
  }
`;
