import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { rowCenter } from "../../shared/style/commonStyle";
import { GlobalStyle } from "./ui/globalstyle";
import Header from "./ui/header";
import Footer from "./ui/footer";
import EnterDebateModal from "../../features/enterDebate";
import { useResetDebateInfo } from "../../pages/home/hook/useResetDebateInfo";

export const Root = () => {
  useResetDebateInfo();
  return (
    <>
      <GlobalStyle />
      <Header />
      <BodyLayout>
        <BodyContainer>
          <Outlet />
        </BodyContainer>
      </BodyLayout>
      <EnterDebateModal />
      <Footer />
    </>
  );
};

export const DebateRoot = () => {
  return (
    <>
      <GlobalStyle />
      <BodyLayout>
        <BodyContainer>
          <Outlet />
        </BodyContainer>
      </BodyLayout>
    </>
  );
};

const BodyLayout = styled.div`
  ${rowCenter}
  width: 100%;
  padding: 10px;
`;

const BodyContainer = styled.div`
  ${rowCenter}
  max-width: 1120px;
  width: 100%;
`;
