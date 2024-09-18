import styled from "styled-components";
import MainChat from "../../../widgets/mainChat";
import ScreenHeader from "./ScreenHeader";
import { colflex } from "../../../shared/style/commonStyle";
import { Desktop, NonDesktop } from "../../../shared/style/Responsive";
import { MenuType, useMenuStore } from "../model/store";
import TeamChat from "../../../widgets/teamChat";
import Home from "../../../widgets/debateHome";
import Memo from "../../../widgets/debateMemo";

const DeskTopScreen = ({ menu }: { menu: MenuType }) => {
  return (
    <Desktop>
      {menu !== "MainChat" && (
        <>
          <ScreenLayout>
            <Display $menu={menu} $label={"Home"}>
              <Home />
            </Display>
            <Display $menu={menu} $label={"Memo"}>
              <Memo />
            </Display>
            <Display $menu={menu} $label={"TeamChat"}>
              <TeamChat />
            </Display>
          </ScreenLayout>
          <div className="w-4" />
        </>
      )}
      <ScreenLayout>
        <MainChat />
      </ScreenLayout>
    </Desktop>
  );
};

const NonDeskTopScreen = ({ menu }: { menu: MenuType }) => {
  return (
    <NonDesktop>
      <ScreenLayout>
        <Display $menu={menu} $label={"Home"}>
          <Home />
        </Display>
        <Display $menu={menu} $label={"Memo"}>
          <Memo />
        </Display>
        <Display $menu={menu} $label={"TeamChat"}>
          <TeamChat />
        </Display>
        <Display $menu={menu} $label={"MainChat"}>
          <MainChat />
        </Display>
      </ScreenLayout>
    </NonDesktop>
  );
};

const ScreenContainer = () => {
  const menu = useMenuStore((state) => state.menu);

  return (
    <ScreenConatiner className="bg-darkgray">
      <ScreenHeader />
      <ScreenWarpper>
        <DeskTopScreen menu={menu} />
        <NonDeskTopScreen menu={menu} />
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

const Display = styled.div<{ $menu: MenuType; $label: string }>`
  ${colflex}
  display: ${({ $menu, $label }) => ($menu === $label ? "flex" : "none")};
  height: 100%;
`;