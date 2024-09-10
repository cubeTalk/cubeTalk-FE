import styled from "styled-components";
import { InlineTextInput, MultilineTextInput } from "../../../shared/components/textinput";
import useInputChangeHandler from "../../../shared/hook/useChangeHandler";
import Toggle from "../../../entities/typeToggle";
import RoomSetting, { MaxParticipants } from "../../../entities/roomSetting";
import { useRoomStore } from "../model/store";
import { SubmitButton } from "../../../shared/components/button";
import { colflex } from "../../../shared/style/commonStyle";
import { useCreateRoomQuery } from "../api/query";
import { useRoomSettingStore } from "../../../entities/roomSetting/model/store";
import { useMemo } from "react";
import { DebateMode } from "../../../shared/type";
import { validTitle } from "../lib";

const Title = () => {
  const title = useRoomStore((state) => state.title);
  const setTittle = useRoomStore((state) => state.actions.setTitle);
  const onChangeTitle = useInputChangeHandler(setTittle);
  return (
    <InlineTextInput
      id="title"
      label="주제"
      value={title}
      onChange={onChangeTitle}
      placeholder="주제를 입력해 주세요"
      warning={
        title.length < 3
          ? "주제를 3글자 이상 적어주세요"
          : title.length > 50
            ? "주제를 50글자 이하로 적어주세요"
            : ""
      }
      autoFocus
    />
  );
};

const Discription = () => {
  const description = useRoomStore((state) => state.description);
  const setDescription = useRoomStore((state) => state.actions.setDescription);
  const onChangeDescription = useInputChangeHandler(setDescription);
  return (
    <MultilineTextInput
      id="description"
      label="설명"
      value={description}
      onChange={onChangeDescription}
      placeholder="주제에 관한 설명을 입력해 주세요"
      rows={3}
      warning={description === "" ? "내용을 채워 주세요" : ""}
    />
  );
};

const ChatMode = () => {
  const chatMode = useRoomStore((state) => state.chatMode);
  const setChatMode = useRoomStore((state) => state.actions.setChatMode);
  return (
    <div className="flex-1 pl-1">
      <Label className="flex">모드</Label>
      <Toggle chatMode={chatMode} setChatMode={setChatMode} />
    </div>
  );
};

const Submit = () => {
  const { title, description, chatMode } = useRoomStore((state) => state);
  const {
    chatDuration,
    maxParticipants,
    negativeEntry,
    negativeQuestioning,
    negativeRebuttal,
    positiveEntry,
    positiveQuestioning,
    positiveRebuttal,
  } = useRoomSettingStore((state) => state);
  const { mutate, isPending } = useCreateRoomQuery();
  const totalTime = useMemo(() => {
    return chatMode === "찬반"
      ? maxParticipants +
          negativeEntry +
          negativeQuestioning +
          negativeRebuttal +
          positiveEntry +
          positiveQuestioning +
          positiveRebuttal
      : chatDuration;
  }, [
    chatMode,
    maxParticipants,
    negativeEntry,
    negativeQuestioning,
    negativeRebuttal,
    positiveEntry,
    positiveQuestioning,
    positiveRebuttal,
    chatDuration,
  ]);
  return (
    <SubmitButton
      text="생성"
      isPending={isPending}
      disabled={validTitle(title) || description.length === 0}
      onClickHandler={() => {
        mutate({
          title,
          description,
          chatDuration: totalTime,
          chatMode: chatMode as DebateMode,
          maxParticipants: maxParticipants,
        });
      }}
    />
  );
};

const ModalContent = () => {
  return (
    <Layout>
      <h1>토론방 생성</h1>
      <Title />
      <Discription />
      <div className="flex flex-wrap">
        <ChatMode />
        <MaxParticipants />
      </div>
      <RoomSetting />
      <div className="flex justify-center">
        <Submit />
      </div>
    </Layout>
  );
};

export default ModalContent;

const Layout = styled.div`
  ${colflex}
  gap: 0.5rem;
  max-width: 544px;
  padding: 10px 0px;
  h1 {
    text-align: center;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  margin: 0 0 0 0.5rem;
`;
