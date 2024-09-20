import styled from "styled-components";
import MainChat from "../../../widgets/mainChat";
import ScreenHeader from "./ScreenHeader";
import { colflex } from "../../../shared/style/commonStyle";
import { Desktop, NonDesktop } from "../../../shared/style/Responsive";
import { MenuType, useMenuStore } from "../model/store";
import TeamChat from "../../../widgets/teamChat";
import Home from "../../../widgets/debateHome";
import Memo from "../../../widgets/debateMemo";

const DeskTopScreen = () => {
  const menu = useMenuStore((state) => state.menu);
  return (
    <Desktop>
      <NewScreenLayout $menu={menu} $label={"Home"}>
        <Home />
      </NewScreenLayout>
      <NewScreenLayout $menu={menu} $label={"Memo"}>
        <Memo />
      </NewScreenLayout>
      <NewScreenLayout $menu={menu} $label={"TeamChat"}>
        <TeamChat />
      </NewScreenLayout>
      {menu !== "MainChat" && <div className="w-4" />}
      <ScreenLayout>
        <MainChat />
      </ScreenLayout>
    </Desktop>
  );
};

const NonDeskTopScreen = () => {
  const menu = useMenuStore((state) => state.menu);
  return (
    <NonDesktop>
      <NewScreenLayout $menu={menu} $label={"Home"}>
        <Home />
      </NewScreenLayout>
      <NewScreenLayout $menu={menu} $label={"Memo"}>
        <Memo />
      </NewScreenLayout>
      <NewScreenLayout $menu={menu} $label={"MainChat"}>
        <TeamChat />
      </NewScreenLayout>
      <NewScreenLayout $menu={menu} $label={"TeamChat"}>
        <MainChat />
      </NewScreenLayout>
    </NonDesktop>
  );
};

const ScreenContainer = () => {
  return (
    <ScreenConatiner className="bg-darkgray">
      <ScreenHeader />
      <ScreenWarpper>
        <DeskTopScreen />
        <NonDeskTopScreen />
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

const NewScreenLayout = styled.div<{ $menu: MenuType; $label: string }>`
  ${colflex}
  padding: 5px;
  border-radius: 8px;
  background-color: var(--color-light);
  height: 100%;
  width: 100%;
  display: ${({ $menu, $label }) => ($menu === $label ? "flex" : "none")};
`;
