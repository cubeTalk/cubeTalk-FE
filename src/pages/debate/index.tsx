import styled from "styled-components";
import { colflex, mediaQuery, rowflex } from "../../shared/style/commonStyle";
import MenuTab from "./ui/MenuTab";
import ScreenContainer from "./ui/ScreenContainer";
import { useFetchandUpdateData, useUpdateMessageList } from "./hook/useUpdateInfo";
import { useWebSocketConnection } from "./hook";
import { PageLoadingSpinner } from "../../shared/components/spinner";

const DebatePage = () => {
  const isfetchingLoading = useFetchandUpdateData();
  const isMessageLoading = useUpdateMessageList();
  useWebSocketConnection();
  return (
    <PageLayout>
      {(isMessageLoading || isfetchingLoading) && <PageLoadingSpinner />}
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
