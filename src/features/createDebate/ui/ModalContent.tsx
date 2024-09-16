import styled from "styled-components";
import { InlineTextInput, MultilineTextInput } from "../../../shared/components/textinput";
import useInputChangeHandler from "../../../shared/hook/useChangeHandler";
import Toggle from "../../../entities/typeToggle";
import RoomSetting, { MaxParticipants } from "../../../entities/debateSetting";
import { useRoomStore } from "../model/store";
import { SubmitButton } from "../../../shared/components/button";
import { colflex } from "../../../shared/style/commonStyle";
import { DebateMode, FreeDebate, ProsConsDebate } from "../../../shared/type";
import { validTitle } from "../lib";
import { useRoomSettingStore } from "../../../entities/debateSetting/model/store";
import { useCreateDebateQuery } from "../api/query";

const Title = () => {
  const title = useRoomStore((state) => state.title);
  const setTittle = useRoomStore((state) => state.actions.setTitle);
  const onChangeTitle = useInputChangeHandler(setTittle);
  return (
    <InlineTextInput
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

const Participants = () => {
  return <MaxParticipants />;
};

const Setting = () => {
  const chatMode = useRoomStore((state) => state.chatMode);
  return <RoomSetting chatMode={chatMode} />;
};

const Submit = () => {
  const { title, description, chatMode } = useRoomStore((state) => state);
  const { mutate, isPending } = useCreateDebateQuery();
  const maxParticipants = useRoomSettingStore(state => state.maxParticipants);
  const chatDuration = useRoomSettingStore(state => state.chatDuration);
  const debateSettings = useRoomSettingStore(state => state.debateSettings);
  const onClickHandler = () => {
    const submitData = chatMode === "자유" ? {
      title,
      description,
      chatMode: chatMode as DebateMode,
      maxParticipants,
      chatDuration,
    } as FreeDebate : {
      title,
      description,
      chatMode: chatMode as DebateMode,
      maxParticipants,
      debateSettings,
    } as ProsConsDebate
    mutate(submitData);
  }

  return (
    <SubmitButton
      text="생성"
      isPending={isPending}
      disabled={validTitle(title) || description.length === 0}
      onClickHandler={onClickHandler}
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
        <Participants />
      </div>
      <Setting />
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
