import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import { rowCenter } from "../../styles/shared";
import GlobalStyle from "../../styles/GlobalStyle";
import Footer from "./Footer";

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

export const ChatRoot = () => {
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
