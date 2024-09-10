import styled from "styled-components";
import MainChat from "../../../widgets/mainChat";
import ScreenHeader from "./ScreenHeader";
import { colflex } from "../../../shared/style/commonStyle";

const ScreenContainer = () => {
  return (
    <ScreenConatiner className="bg-darkgray">
      <ScreenHeader />
      <ScreenWarpper>
        <MainChat />
      </ScreenWarpper>
    </ScreenConatiner>
  );
};

export default ScreenContainer;

const ScreenConatiner = styled.div`
  ${colflex}
  gap: 10px;
  width: 100%;
  border-radius: 8px;
  padding: 10px;
  overflow: auto;
  height: 100%;
`;

const ScreenWarpper = styled.div`
  flex-grow: 1;
  display: flex;
  overflow: auto;
`;
