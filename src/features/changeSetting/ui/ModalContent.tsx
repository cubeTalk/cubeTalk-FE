import styled from "styled-components";
import RoomSetting, { MaxParticipants } from "../../../entities/debateSetting";
import { useChangeSettingStore } from "../model/store";
import { useEffect } from "react";
import { useRoomSettingStore } from "../../../entities/debateSetting/model/store";
import { useDebateInfoStore } from "../../../entities/debateInfo";
import { SubmitButton } from "../../../shared/components/button";
import { FreeSetting, ProsConsSetting } from "../../../shared/type";
import { useChangeSettingQuery } from "../api/query";

const Header = () => {
  const resetSettings = useChangeSettingStore((state) => state.resetSettings);
  const maxParticipants = useRoomSettingStore((state) => state.maxParticipants);
  const getChatDuration = useRoomSettingStore((state) => state.getChatDuration);
  const getDebateSettings = useRoomSettingStore((state) => state.getDebateSettings);
  return (
    <div className="flex flex-row justify-center">
      <h2>설정 변경</h2>
      <Reset
        onClick={() =>
          resetSettings({
            maxParticipants: maxParticipants,
            chatDuration: getChatDuration(),
            debateSettings: getDebateSettings(),
          })
        }
      >
        <img src="/Icon/reset.png" alt="reset" />
      </Reset>
    </div>
  );
};

const SetParticipants = () => {
  return (
    <MaxParticipants
      className="flex flex-row gap-3 items-center"
      useStore={useChangeSettingStore}
    />
  );
};

const Setting = () => {
  return <RoomSetting chatMode={chatMode} useStore={useChangeSettingStore} />;
};

const ChangeSetting = () => {
  const { mutate, isPending } = useChangeSettingQuery();
  const chatMode = useDebateInfoStore((state) => state.chatMode);
  const maxParticipants = useRoomSettingStore((state) => state.maxParticipants);
  const getChatDuration = useRoomSettingStore((state) => state.getChatDuration);
  const getDebateSettings = useRoomSettingStore((state) => state.getDebateSettings);

  const onClickHandler = () => {
    const submitData =
      chatMode === "자유"
        ? ({
            maxParticipants,
            chatDuration: getChatDuration(),
          } as FreeSetting)
        : ({
            maxParticipants,
            debateSettings: getDebateSettings(),
          } as ProsConsSetting);
    mutate(submitData);
  };

  return <SubmitButton text="변경하기" isPending={isPending} onClickHandler={onClickHandler} />;
};

export const ModalContent = () => {
  const reset = useChangeSettingStore((state) => state.reset);
  const getState = useRoomSettingStore((state) => state.getState);

  useEffect(() => {
    reset(getState());
  }, []);

  return (
    <>
      <Header />
      <SetParticipants />
      <Setting />
      <ChangeSetting />
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
