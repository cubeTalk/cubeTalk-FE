import styled from "styled-components";
import { colflex, shadow } from "../../shared/style/commonStyle";
import { Setting } from "./ui/Setting";
import { Description } from "../../features/changeDescription";
import { useUpdateDebateSetting } from "./hook/useUpdateDebateSetting";

const Home = () => {
  useUpdateDebateSetting();
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
