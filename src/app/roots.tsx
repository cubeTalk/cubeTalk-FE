import { Outlet } from "react-router-dom";
import Header from "../widgets/header";
import styled from "styled-components";
import { rowCenter } from "./styles/globalStyle";
import { GlobalStyle } from "./styles/globalStyle";
import Footer from "../widgets/footer";

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
