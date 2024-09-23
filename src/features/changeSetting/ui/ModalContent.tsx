import styled from "styled-components";
import RoomSetting, { MaxParticipants } from "../../../entities/debateSetting";
import { useChangeSettingStore } from "../model/store";
import { useCallback, useEffect } from "react";
import { useRoomSettingStore } from "../../../entities/debateSetting/model/store";
import { useDebateInfoStore, useUserInfoStore } from "../../../entities/debateInfo";
import { SubmitButton } from "../../../shared/components/button";
import { FreeSetting, ProsConsSetting } from "../../../shared/type";
import { useChangeSettingQuery } from "../api/query";

const Header = () => {
  const resetSettings = useChangeSettingStore((state) => state.actions.resetSettings);
  const initvalue = useRoomSettingStore.getState();
  const resetSetiingToinitValue = useCallback(() =>
    resetSettings({
      chatDuration: initvalue.chatDuration,
      debateSettings: initvalue.debateSettings,
      maxParticipants: initvalue.maxParticipants,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), []);

  useEffect(resetSetiingToinitValue);
  return (
    <div className="flex flex-row justify-center">
      <h2>설정 변경</h2>
      <Reset onClick={resetSetiingToinitValue}>
        <img src="/Icon/reset.png" alt="reset" />
      </Reset>
    </div>
  );
};

const SetParticipants = () => {
  return <MaxParticipants useStore={useChangeSettingStore} />;
};

const Setting = () => {
  const chatMode = useDebateInfoStore((state) => state.chatMode);
  return <RoomSetting chatMode={chatMode} useStore={useChangeSettingStore} />;
};

const ChangeSetting = () => {
  const { mutate, isPending } = useChangeSettingQuery();
  const chatMode = useDebateInfoStore((state) => state.chatMode);
  const memberId = useUserInfoStore((state) => state.memberId);
  const { chatDuration, debateSettings, maxParticipants } = useChangeSettingStore((state) => state);

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

  return (
    <div className="flex justify-center">
      <SubmitButton text="변경하기" isPending={isPending} onClickHandler={onClickHandler} />
    </div>
  );
};

export const ModalContent = () => {
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
