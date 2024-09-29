import styled from "styled-components";
import { colflex, mediaQuery, rowflex } from "../../shared/style/commonStyle";
import MenuTab from "./ui/MenuTab";
import ScreenContainer from "./ui/ScreenContainer";
import { useFetchandUpdateData, useUpdateMessageList } from "./hook/useUpdateInfo";
import { useWebScoketTimeout, useWebSocketConnection, useWebSocketError } from "./hook";
import { PageLoadingSpinner } from "../../shared/components/spinner";
import { ScreenContainerSkeleton } from "./ui/ScreenConatiner.skeleton";

const DebatePage = () => {
  const isfetchingLoading = useFetchandUpdateData();
  const isMessageLoading = useUpdateMessageList();
  useWebSocketConnection();
  useWebSocketError();
  useWebScoketTimeout();

  return (
    <PageLayout>
      {isMessageLoading || isfetchingLoading ? (
        <>
          <PageLoadingSpinner />
          <MenuTab />
          <ScreenContainerSkeleton />
        </>
      ) : (
        <>
          <MenuTab />
          <ScreenContainer />
        </>
      )}
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
