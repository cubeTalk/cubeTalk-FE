import styled from "styled-components";
import { rowflex } from "../../shared/style/commonStyle";
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
  isCreateRoom: boolean;
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

const RoomHeader = ({
  text,
  imgSrc,
  status = "모두",
  isHome = true,
  isCreateRoom = false,
}: RoomHeaderProps) => {
  const navigate = useNavigate();
  const setStatus = useDebateSearchParamsStore((state) => state.setStatus);
  return (
    <HeaderContainer>
      <HeaderTopRow>
        <Title
          onClick={() => {
            if (isHome) {
              setStatus(status);
              navigate("/room");
            }
          }}
          $isButton={isHome}
        >
          <img src={imgSrc} alt="titleIcon" />
          <h2>{text}</h2>
        </Title>
        {isHome && isCreateRoom && <CreateDebateButton className="break-keep ml-auto" />}
      </HeaderTopRow>
      {(!isHome || isCreateRoom) && (
        <HeaderBottomRow>
          {!isHome && (
            <DropdownContainer>
              <SortDropdowns />
            </DropdownContainer>
          )}
          {!isHome && isCreateRoom && <CreateDebateButton className="break-keep" />}
        </HeaderBottomRow>
      )}
      <Divider />
    </HeaderContainer>
  );
};

export default RoomHeader;

const HeaderContainer = styled.div`
  width: 100%;
`;

const HeaderTopRow = styled.div`
  ${rowflex}
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  margin-bottom: 5px;
`;

const HeaderBottomRow = styled.div`
  ${rowflex}
  align-items: center;
  flex-wrap: wrap;
  padding: 0 10px;
  margin-bottom: 5px;
  gap: 10px;
`;

const Title = styled.div<{ $isButton: boolean }>`
  ${rowflex}
  cursor: ${(props) => (props.$isButton ? "pointer" : "default")};
  img {
    margin-right: 8px;
  }
`;

const DropdownContainer = styled.div`
  ${rowflex}
  flex-wrap: wrap;
  gap: 10px;
`;
