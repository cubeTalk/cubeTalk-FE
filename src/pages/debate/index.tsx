import styled from "styled-components";
import { blackSpinner, colflex, mediaQuery, rowflex } from "../../shared/style/commonStyle";
import MenuTab from "./ui/MenuTab";
import ScreenContainer from "./ui/ScreenContainer";
import { useFetchandUpdateData, useUpdateMessageList } from "./hook/useUpdateInfo";
import { useWebSocketConnection } from "./hook";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center absolute bg-black/[.30] inset-0 z-50">
      <Spinner />
    </div>
  );
};

const DebatePage = () => {
  useFetchandUpdateData();
  const isLoading = useUpdateMessageList();
  useWebSocketConnection();
  return (
    <PageLayout>
      {isLoading && <LoadingSpinner />}
      <MenuTab />
      <ScreenContainer />
    </PageLayout>
  );
};

export default DebatePage;

const PageLayout = styled.div`
  display: flex;
  height: calc(100vh - 20px);
  width: 100%;
  @media ${mediaQuery.mobile} {
    ${colflex}
    gap: 5px;
  }

  @media ${mediaQuery.tablet} {
    ${rowflex}
    gap: 20px;
  }

  @media ${mediaQuery.desktop} {
    ${rowflex}
    gap: 20px;
  }
`;

const Spinner = styled.div`
  ${blackSpinner}
  width: 60px;
  height: 60px;
`;
