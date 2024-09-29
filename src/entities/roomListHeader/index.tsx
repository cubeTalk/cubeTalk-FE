import styled from "styled-components";
import { colflex, rowflex } from "../../shared/style/commonStyle";
import Divider from "../../shared/components/divider";
import Dropdown from "../../shared/components/dropdown";
import { CreateDebateButton } from "../../features/createDebate";
import { useNavigate } from "react-router-dom";
import { useDebateDropdownStore, useDebateSearchParamsStore } from "./model/store";
import { useRefreshGetDebateRooms } from "./hook";

interface RoomHeaderProps {
  text: string;
  imgSrc: string;
  status?: string;
  isHome?: boolean;
}

const SortDropdowns = () => {
  const { mode, setMode, setSort, setStatus, sort, status } = useDebateSearchParamsStore(
    (state) => state
  );
  useRefreshGetDebateRooms();
  return (
    <>
      <Dropdown
        label="정렬"
        useStore={useDebateDropdownStore}
        list={["사람순", "생성순"]}
        selected={sort}
        setSelected={setSort}
      />
      <Dropdown
        label="모드"
        useStore={useDebateDropdownStore}
        list={["자유", "찬반", "모두"]}
        selected={mode}
        setSelected={setMode}
      />
      <Dropdown
        label="상태"
        useStore={useDebateDropdownStore}
        list={["진행중", "시작전", "모두"]}
        selected={status}
        setSelected={setStatus}
      />
    </>
  );
};

const RoomHeader = ({ text, imgSrc, status = "모두", isHome = false }: RoomHeaderProps) => {
  const navigate = useNavigate();
  const setStatus = useDebateSearchParamsStore((state) => state.setStatus);
  return (
    <HeaderContainer>
      {isHome ? (
        <Title
          onClick={() => {
            setStatus(status);
            navigate("/room");
          }}
        >
          <img src={imgSrc} alt="titleIcon" />
          <h2>{text}</h2>
        </Title>
      ) : (
        <Title>
          <img src={imgSrc} alt="titleIcon" />
          <h2>{text}</h2>
        </Title>
      )}
      {!isHome && (
        <div className="flex flex-row justify-between flex-wrap mb-1 mx-1">
          <DorpdownContainer>
            <SortDropdowns />
          </DorpdownContainer>
          <div className="flex flex-1 justify-end">
            <CreateDebateButton className="break-keep" />
          </div>
        </div>
      )}
      <Divider />
    </HeaderContainer>
  );
};

export default RoomHeader;

const HeaderContainer = styled.div`
  ${colflex}
  width: 100%;
`;

const Title = styled.button`
  ${rowflex}
  padding-left: 15px;
  margin-bottom: 5px;
  img {
    margin-right: 8px;
  }
`;

const DorpdownContainer = styled.div`
  ${rowflex}
  flex-wrap: wrap;
  gap: 10px;
`;
