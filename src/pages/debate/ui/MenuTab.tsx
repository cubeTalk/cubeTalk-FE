import styled from "styled-components";
import { center, colflex, mediaQuery, rowflex } from "../../../shared/style/commonStyle";
import { HTMLAttributes } from "react";
import { MenuType, useMenuStore } from "../model/store";

type TabMenuProps = {
  link: string;
  alt: MenuType;
};

const TabMenuButton = ({
  link,
  alt,
  ...rest
}: TabMenuProps & HTMLAttributes<HTMLButtonElement>) => {
  const { menu, action} = useMenuStore((state) => state);
  return (
    <TabMenuWrapper onClick={() => action.changeMenu(alt)} $isClicked={menu === alt} $isChat={alt === "Chat"} {...rest}>
      <img src={link} alt={alt} />
    </TabMenuWrapper>
  );
};
type MenuItem = {
  link: string;
  alt: MenuType;
}

const tabMenuItems: MenuItem[] = [
  { link: "/chatIcon/home.png", alt: "Home" },
  { link: "/chatIcon/chat.png", alt: "Chat" },
  { link: "/chatIcon/teamchat.png", alt: "TeamChat" },
  { link: "/chatIcon/memo.png", alt: "Memo" },
];

const MenuTab = () => {
  return (
    <TabContainer className="bg-darkgray">
      {tabMenuItems.map((item) => (
        <TabMenuButton key={item.link} link={item.link} alt={item.alt} />
      ))}
      <TabMenuWrapper className="mt-auto">
        <img src={"/chatIcon/chatout.png"} alt={"ChatOut"} />
      </TabMenuWrapper>
    </TabContainer>
  );
};
export default MenuTab;

const TabContainer = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 8px;
  padding: 8px;

  @media ${mediaQuery.mobile} {
    ${rowflex}
    justify-content: space-around;
    height: 60px;
    gap: 20px;
    order: 1;
  }
  @media ${mediaQuery.tablet} {
    ${colflex}
    width: 76px;
    padding: 8px;
    gap: 20px;
  }
  @media ${mediaQuery.desktop} {
    ${colflex}
    width: 76px;
    padding: 8px;
    gap: 20px;
  }
`;

const TabMenuWrapper = styled.button<{ $isClicked?: boolean; $isChat?:boolean }>`
  ${center}
  background-color: ${({ $isClicked }) => $isClicked ? "var(--white)" : "var(--color-mid)" };
  border-radius: 5px;
  padding: 2px;
  width: 60px;
  height: 60px;

  @media ${mediaQuery.mobile} {
    width: 50px;
    height: 50px;
  }

  @media (min-width: 1120px) {
    background-color: ${({ $isChat }) => $isChat ? "var(--white)" : undefined};
  }
`;
