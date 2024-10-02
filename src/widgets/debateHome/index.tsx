import styled from "styled-components";
import { colflex, shadow } from "../../shared/style/commonStyle";
import { Setting } from "./ui/Setting";
import { Description } from "../../features/changeDescription";
import { useUpdateDebateSetting } from "./hook/useUpdateDebateSetting";
import { PageLoadingSpinner } from "../../shared/components/spinner";

const Home = () => {
  const isPending = useUpdateDebateSetting();
  return (
    <>
      <h2>개요</h2>
      {isPending && <PageLoadingSpinner />}
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
  overflow: auto;
`;
