import styled from "styled-components";
import { colflex } from "../../../shared/style/commonStyle";
import { InlineTextInput } from "../../../shared/components/textinput";
import { useEnterDebateStore } from "../model/store";
import useInputChangeHandler from "../../../shared/hook/useChangeHandler";
import { SubmitButton } from "../../../shared/components/button";
import { useEnterDebateQuery } from "../api/query";
import { TeamButtons } from "../../../entities/TeamButtons";
import { useTeamChoseStore } from "../../../entities/TeamButtons/model/store";
import { DebateRole } from "../../../shared/type";
import { useisOwnerStore } from "../../createDebate/model/store";
import { useUserInfoStore } from "../../../entities/debateInfo";

const NickName = () => {
  const nickName = useEnterDebateStore((state) => state.nickName);
  const setNickName = useEnterDebateStore((state) => state.actions.setNickName);
  const checkName = useEnterDebateStore((state) => state.checkName);

  const onChangeNickName = useInputChangeHandler(setNickName);
  return (
    <InlineTextInput
      value={nickName}
      onChange={onChangeNickName}
      label="닉네임"
      warning={
        nickName.length === 0
          ? "닉네임을 입력해주세요"
          : checkName === nickName
            ? "중복된 닉네임이 있습니다"
            : ""
      }
      autoFocus
    />
  );
};

const Submit = () => {
  const { mutate, isPending } = useEnterDebateQuery();
  const nickName = useEnterDebateStore((state) => state.nickName);
  const team = useTeamChoseStore((state) => state.team);
  const isOwner = useisOwnerStore((state) => state.isOwner);
  const checkName = useEnterDebateStore((state) => state.checkName);
  const memberId = useUserInfoStore((state) => state.memberId);

  const isDebateRole = (team: string): team is DebateRole => {
    return team === "찬성" || team === "반대" || team === "관전";
  };
  const role: DebateRole = isDebateRole(team) ? team : "관전";
  const isDisabled = nickName.length === 0 || nickName === checkName || team === "";
  const onClickHandler = () => mutate({ nickName, role, ownerId: isOwner ? memberId : undefined });

  return (
    <SubmitButton
      onClickHandler={onClickHandler}
      disabled={isDisabled}
      isPending={isPending}
      text="참가"
    />
  );
};

export const ModalContent = () => {
  return (
    <Layout>
      <h1>팀 선택</h1>
      <NickName />
      <Label>팀선택</Label>
      <TeamButtons />
      <div className="flex justify-center">
        <Submit />
      </div>
    </Layout>
  );
};

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
