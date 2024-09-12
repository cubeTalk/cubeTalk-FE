import styled from "styled-components";
import MainChat from "../../../widgets/mainChat";
import ScreenHeader from "./ScreenHeader";
import { colflex } from "../../../shared/style/commonStyle";
import { Desktop, NonDesktop } from "../../../shared/style/Responsive";
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
              <ScreenLayout>
                <Screen menu={menu} />
              </ScreenLayout>
              <div className="w-4" />
            </>
          )}
          <ScreenLayout>
            <MainChat />
          </ScreenLayout>
        </Desktop>
        <NonDesktop>
          <ScreenLayout>
            <Screen menu={menu} />
          </ScreenLayout>
        </NonDesktop>
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
  display: flex;
  overflow: auto;
  height: 100%;
  flex: 1;
`;

const ScreenLayout = styled.div`
  ${colflex}
  padding: 5px;
  border-radius: 8px;
  background-color: var(--color-light);
  height: 100%;
  width: 100%;
`;
