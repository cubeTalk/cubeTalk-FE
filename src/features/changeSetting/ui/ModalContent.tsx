import styled from "styled-components";
import RoomSetting, { MaxParticipants } from "../../../entities/debateSetting";
import { useInfoStore } from "../../../entities/debateInfo";
import { useChangeSettingStore } from "../model/store";

const Header = () => {
  const reset = useChangeSettingStore((state) => state.reset);
  return (
    <div className="flex flex-row justify-center">
      <h2>설정 변경</h2>
      <Reset onClick={() => reset()}>
        <img src="/Icon/reset.png" alt="reset" />
      </Reset>
    </div>
  );
};

const Participants = () => {
  return (
    <MaxParticipants
      className="flex flex-row gap-3 items-center"
      useStore={useChangeSettingStore}
    />
  );
};

const Setting = () => {
  const chatMode = useInfoStore((state) => state.debateInfo.chatMode);
  return <RoomSetting chatMode={chatMode} useStore={useChangeSettingStore} />;
};

export const ModalContent = () => {
  return (
    <>
      <Header />
      <Participants />
      <Setting />
    </>
  );
};

const Reset = styled.button`
  margin-left: 5px;
  border-radius: 10px;
  padding: 1px;
  img {
    width: 20px;
    height: 20px;
  }
`;
