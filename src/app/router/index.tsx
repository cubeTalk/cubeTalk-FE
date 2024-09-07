import { Outlet } from "react-router-dom";
import Header from "./ui/Header";
import styled from "styled-components";
import { rowCenter } from "../../shared/style/commonStyle";
import Footer from "./ui/Footer";
import { GlobalStyle } from "./ui/globalstyle";

export const Root = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <BodyLayout>
        <BodyContainer>
          <Outlet />
        </BodyContainer>
      </BodyLayout>
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
