import styled from "styled-components";
import { center, colflex, mediaQuery, rowflex } from "../../../shared/style/commonStyle";
import { HTMLAttributes } from "react";
type TabMenuProps = {
  link: string;
  alt: string;
  onClick?: () => void;
};

const TabMenuButton = ({
  link,
  alt,
  onClick,
  ...rest
}: TabMenuProps & HTMLAttributes<HTMLButtonElement>) => {
  return (
    <TabMenuWrapper onClick={onClick} {...rest}>
      <img src={link} alt={alt} />
    </TabMenuWrapper>
  );
};

const MenuTab = () => {
  const tabMenuItems = [
    { link: "/chatIcon/home.png", alt: "Home" },
    { link: "/chatIcon/chat.png", alt: "Chat" },
    { link: "/chatIcon/teamchat.png", alt: "TeamChat" },
    { link: "/chatIcon/memo.png", alt: "Memo" },
    { link: "/chatIcon/setting.png", alt: "Setting" },
  ];

  return (
    <TabContainer className="bg-darkgray">
      {tabMenuItems.map((item) => (
        <TabMenuButton
          key={item.link}
          link={item.link}
          alt={item.alt}
          onClick={() => console.log(`${item.alt} clicked!`)}
        />
      ))}
      <TabMenuButton link={"/chatIcon/chatout.png"} alt={"ChatOut"} className="mt-auto" />
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

const TabMenuWrapper = styled.button`
  ${center}
  background-color: var(--color-mid);
  border-radius: 5px;
  padding: 2px;
  width: 60px;
  height: 60px;

  @media ${mediaQuery.mobile} {
    width: 50px;
    height: 50px;
  }
`;
