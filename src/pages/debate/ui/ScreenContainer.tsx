import styled from "styled-components";
import MainChat from "../../../widgets/mainChat";
import ScreenHeader from "./ScreenHeader";
import { colflex } from "../../../shared/style/commonStyle";
import { Desktop, Mobile, Pad } from "../../../shared/style/Responsive";
import { MenuType, useMenuStore } from "../model/store";
import TeamChat from "../../../widgets/teamChat";
import Home from "../../../widgets/debateHome";
import Memo from "../../../widgets/debateMemo";

const Screen = ({ menu }: { menu: MenuType }) => {
  switch (menu) {
    case "Home":
      return <Home />;
    case "Memo":
      return <Memo />;
    case "TeamChat":
      return <TeamChat />;
    case "Chat":
    default:
      return <MainChat />;
  }
};

const ScreenContainer = () => {
  const menu = useMenuStore((state) => state.menu);

  return (
    <ScreenConatiner className="bg-darkgray">
      <ScreenHeader />
      <ScreenWarpper>
        <Desktop>
          {menu !== "Chat" && (
            <>
              <Screen menu={menu} />
              <div className="w-4" />
            </>
          )}
          <MainChat />
        </Desktop>
        <Pad>
          <Screen menu={menu} />
        </Pad>
        <Mobile>
          <Screen menu={menu} />
        </Mobile>
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
