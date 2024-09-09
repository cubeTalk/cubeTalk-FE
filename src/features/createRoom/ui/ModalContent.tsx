import styled from "styled-components";
import { InlineTextInput, MultilineTextInput } from "../../../shared/components/textinput";
import { colflexCenter } from "../../../shared/style/commonStyle";
import { maxParticipants, chatMode, useRoomStore } from "../model/store";
import useInputChangeHandler from "../../../shared/hook/useInputChangeHandler";
import Dropdown from "../../../shared/components/dropdown";
import { useState } from "react";

const ModalContent = () => {
  const [title, onChangeTitle] = useInputChangeHandler(useRoomStore, "title");
  const [description, onChangeDescription] = useInputChangeHandler(useRoomStore, "description");
  const { inputs, setValue } = useRoomStore((state) => state);
  const [opendDropdown, setOpendDropdown] = useState("");

  const createSetIsOpen = (label: string) => 
    (isOpen:boolean) => {
      if (isOpen) {
        setOpendDropdown(label);
      } else {
        setOpendDropdown("");
      }
    }

  return (
    <Layout>
      <h1>토론방 생성</h1>
      <InlineTextInput
        id="title"
        label="주제"
        value={title}
        onChange={onChangeTitle}
        placeholder="주제를 입력해 주세요"
        warning={title === "" ? "내용을 채워 주세요" : ""}
      />
      <MultilineTextInput
        id="description"
        label="설명"
        value={description}
        onChange={onChangeDescription}
        placeholder="주제에 관한 설명을 입력해 주세요"
        rows={3}
        warning={description === "" ? "내용을 채워 주세요" : ""}
      />
      <div className="flex flex-wrap">
        <div className="flex-1 pl-1">
          <Label>모드</Label>
          <Dropdown
            list={chatMode}
            selected={inputs["chatMode"]}
            setSelected={(item: string | number) => setValue("chatMode", item)}
            isOpen={opendDropdown === "chatMode"}
            setIsOpen={createSetIsOpen("chatMode")}
          />
        </div>
        <div className="flex-1 pl-1">
          <Label>사용자수</Label>
          <Dropdown
            list={maxParticipants}
            selected={inputs["maxParticipants"]}
            setSelected={(item: string | number) => setValue("maxParticipants", item)}
            isOpen={opendDropdown === "maxParticipants"}
            setIsOpen={createSetIsOpen("maxParticipants")}
          />
        </div>
      </div>
      {/* <div className="relative border rounded-md p-2 my-4 py-4">
        <Label className="absolute top-0 bg-white transform -translate-y-1/2 px-1">시간설정</Label>
        <div className="flex">
          <div className={itmeStyle}>
            <Label>시간1</Label>
            <Dropdown list={["목록1", "목록2", "목록3"]} selected="목록1"/>
            </div>
          <div className={itmeStyle}>
            <Label>시간2</Label>
            <Dropdown list={["목록1", "목록2", "목록3"]} selected="목록1"/>
            </div>
        </div>
        <div className="flex">
          <div className={itmeStyle}>
            <Label>시간1</Label>
            <Dropdown list={["목록1", "목록2", "목록3"]} selected="목록1"/>
            </div>
          <div className={itmeStyle}>
            <Label>시간2</Label>
            <Dropdown list={["목록1", "목록2", "목록3"]} selected="목록1"/>
            </div>
        </div>
        <div className="flex">
          <div className={itmeStyle}>
            <Label>시간1</Label>
            <Dropdown list={["목록1", "목록2", "목록3"]} selected="목록1"/>
            </div>
          <div className={itmeStyle}>
            <Label>시간2</Label>
            <Dropdown list={["목록1", "목록2", "목록3"]} selected="목록1"/>
            </div>
        </div>
      </div> */}
    </Layout>
  );
};

export default ModalContent;

const itmeStyle = "flex-1 flex flex-wrap items-center space-x-4";

const Layout = styled.div`
  ${colflexCenter}
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
