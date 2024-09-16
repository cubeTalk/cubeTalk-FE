import { Link } from "react-router-dom";
import Header from "../../app/router/ui/header";
import Footer from "../../app/router/ui/footer";
import styled from "styled-components";
import { rowflex } from "../../shared/style/commonStyle";

export const HomeErrorPage = () => {
  return (
    <div className="w-full">
      <Header />
      <div className="flex flex-col justify-center items-center h-[40vh] text-xl">
        <h3>에러가 발생했습니다. 새로고침을 눌러 다시 접속해 주세요</h3>
      </div>
      <Footer />
    </div>
  );
};

export const DebateErrorPage = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col justify-center items-center h-[100vh] text-xl">
        <h3>에러가 발생했습니다 메인화면으로 돌아가 주세요</h3>
        <Link to={"/"}>
          <LogoContainer>
            <img alt="logo" src="/Icon/logo.png" />
            <h1>CubeTalk</h1>
          </LogoContainer>
        </Link>{" "}
      </div>
    </div>
  );
};

const LogoContainer = styled.div`
  ${rowflex}
  img {
    width: 40px;
    height: 40px;
    margin-right: 8px;
  }
`;
