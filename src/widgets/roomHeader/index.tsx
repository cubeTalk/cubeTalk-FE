import styled from "styled-components";
import { colflex, rowflex } from "../../shared/style/commonStyle";
import Divider from "../../shared/components/divider";
import Dropdown from "../../shared/components/dropdown";
import { CreateDebateButton } from "../../features/createDebate";
import { Link } from "react-router-dom";
import { useDebateDropdownStore, useDebateSearchParamsStore } from "./model/store";

interface RoomHeaderProps {
  text: string;
  imgSrc: string;
  isHome?: boolean;
}

const SortDropdowns = () => {
  const { order, setOrder, setSort, setStatus, sort, status } = useDebateSearchParamsStore(
    (state) => state
  );
  return (
    <>
      <Dropdown
        label="정렬"
        useStore={useDebateDropdownStore}
        list={["participants", "createdAt"]}
        selected={sort}
        setSelected={setSort}
      />
      <Dropdown
        label="순서"
        useStore={useDebateDropdownStore}
        list={["asc", "desc"]}
        selected={order}
        setSelected={setOrder}
      />
      <Dropdown
        label="상태"
        useStore={useDebateDropdownStore}
        list={["STARTED", "CREATED"]}
        selected={status}
        setSelected={setStatus}
      />
    </>
  );
};

const RoomHeader = ({ text, imgSrc, isHome = false }: RoomHeaderProps) => {
  return (
    <HeaderContainer>
      {isHome ? (
        <Link to="/room">
          <Title>
            <img src={imgSrc} alt="titleIcon" />
            <h2>{text}</h2>
          </Title>
        </Link>
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

const Title = styled.div`
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
