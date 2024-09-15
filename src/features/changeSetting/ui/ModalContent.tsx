import styled from "styled-components";
import RoomSetting, { MaxParticipants } from "../../../entities/debateSetting";
import { useChangeSettingStore } from "../model/store";
import { useEffect } from "react";
import { useRoomSettingStore } from "../../../entities/debateSetting/model/store";
import { useDebateInfoStore, useUserInfoStore } from "../../../entities/debateInfo";
import { SubmitButton } from "../../../shared/components/button";
import { FreeSetting, ProsConsSetting } from "../../../shared/type";
import { useChangeSettingQuery } from "../api/query";

const Header = () => {
  const resetSettings = useChangeSettingStore((state) => state.resetSettings);
  const getState = useRoomSettingStore((state) => state.getState);

  return (
    <div className="flex flex-row justify-center">
      <h2>설정 변경</h2>
      <Reset onClick={() => resetSettings(getState())}>
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
  const chatMode = useDebateInfoStore((state) => state.chatMode);
  return <RoomSetting chatMode={chatMode} useStore={useChangeSettingStore} />;
};

const ChangeSetting = () => {
  const { mutate, isPending } = useChangeSettingQuery();
  const chatMode = useDebateInfoStore((state) => state.chatMode);
  const memberId = useUserInfoStore((state) => state.memberId);
  const maxParticipants = useChangeSettingStore((state) => state.maxParticipants);
  const chatDuration = useChangeSettingStore((state) => state.chatDuration);
  const debateSettings = useChangeSettingStore((state) => state.debateSettings);

  const onClickHandler = () => {
    const submitData =
      chatMode === "자유"
        ? ({
            maxParticipants,
            chatDuration,
          } as FreeSetting)
        : ({
            maxParticipants,
            debateSettings,
          } as ProsConsSetting);
    mutate({ ...submitData, ownerId: memberId });
  };

  return <SubmitButton text="변경하기" isPending={isPending} onClickHandler={onClickHandler} />;
};

export const ModalContent = () => {
  const resetSettings = useChangeSettingStore((state) => state.resetSettings);
  const getState = useRoomSettingStore((state) => state.getState);

  useEffect(() => {
    resetSettings(getState());
  }, [getState, resetSettings]);

  return (
    <>
      <Header />
      <SetParticipants />
      <Setting />
      <div className="flex justify-center">
        <ChangeSetting />
      </div>
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
