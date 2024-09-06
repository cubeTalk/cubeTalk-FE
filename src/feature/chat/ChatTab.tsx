import styled from "styled-components";
import { mediaQuery } from "../../routes/layout/Responsive";
import { center, colflex, rowflex } from "../../styles/shared";

const ChatTab = () => {
  return (
    <TabContainer className="bg-darkgray">
      <TabMenuWrapper>
        <img src="/chatIcon/home.png" alt="Home" />
      </TabMenuWrapper>
      <TabMenuWrapper>
        <img src="/chatIcon/chat.png" alt="Chat" />
      </TabMenuWrapper>
      <TabMenuWrapper>
        <img src="/chatIcon/teamchat.png" alt="TeamChat" />
      </TabMenuWrapper>
      <TabMenuWrapper>
        <img src="/chatIcon/memo.png" alt="Memo" />
      </TabMenuWrapper>
      <TabMenuWrapper>
        <img src="/chatIcon/setting.png" alt="Setting" />
      </TabMenuWrapper>
      <OutMenuWrapper>
        <img src="/chatIcon/chatout.png" alt="ChatOut" />
      </OutMenuWrapper>
    </TabContainer>
  );
};

export default ChatTab;

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

const OutMenuWrapper = styled.button`
  ${center}
  background-color: var(--color-mid);
  border-radius: 5px;
  padding: 2px;
  width: 60px;
  height: 60px;
  margin-top: auto;

  @media ${mediaQuery.mobile} {
    width: 50px;
    height: 50px;
  }
`;
