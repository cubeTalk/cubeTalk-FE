import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import { rowCenter } from "../../styles/shared";

const Root = () => {
  return (
    <>
      <Header />
      <BodyLayout>
        <BodyContainer>
          <Outlet />
        </BodyContainer>
      </BodyLayout>
    </>
  );
};

export default Root;

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
