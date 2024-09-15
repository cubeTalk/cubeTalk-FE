import styled from "styled-components";
import { Description } from "./ui/Description";
import { colflex, shadow } from "../../shared/style/commonStyle";
import { Setting } from "./ui/Setting";

const Home = () => {
  return (
    <>
      <h2>개요</h2>
      <Layout>
        <Setting />
        <Description />
      </Layout>
    </>
  );
};

export default Home;

const Layout = styled.div`
  ${shadow}
  ${colflex}
  height: 100%;
  width: 100%;
  padding: 10px;
  background-color: var(--white);
  border-radius: 8px;
`;
