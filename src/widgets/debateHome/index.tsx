import styled from "styled-components";
import { Description } from "./ui/Description";
import { shadow } from "../../shared/style/commonStyle";

const Home = () => {
  return (
    <>
      <h2>개요</h2>
      <Layout>
        <Description />
      </Layout>
    </>
  );
};

export default Home;

const Layout = styled.div`
  ${shadow}
  height: 100%;
  width: 100%;
  padding: 10px;
  background-color: var(--white);
  border-radius: 8px;
`;
