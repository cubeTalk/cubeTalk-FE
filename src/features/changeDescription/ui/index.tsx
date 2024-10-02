import styled from "styled-components";
import { useDebateInfoStore, useUserInfoStore } from "../../../entities/debateInfo";
import { Submit } from "../../../shared/components/button";
import { scrollBar, spinner } from "../../../shared/style/commonStyle";
import { useChangeDescriptionQuery } from "../api/query";
import { useDescriptionStore } from "../model/store";

const ChangDescription = () => {
  const description = useDescriptionStore((state) => state.value);
  const memberId = useUserInfoStore((state) => state.memberId);
  const chatStatus = useDebateInfoStore((state) => state.chatStatus);

  const { mutate, isPending } = useChangeDescriptionQuery();
  const onClickHandler = () => {
    mutate({ description, ownerId: memberId });
  };

  return (
    chatStatus === "CREATED" && (
      <Submit onClick={onClickHandler} disabled={isPending}>
        {isPending ? <Spinner /> : <h5 className="text-white">변경</h5>}
      </Submit>
    )
  );
};

const ResetDescription = () => {
  const chatStatus = useDebateInfoStore((state) => state.chatStatus);
  const resetValue = useDescriptionStore((state) => state.action.resetValue);
  return (
    chatStatus === "CREATED" && (
      <Reset onClick={resetValue}>
        <img src="/Icon/reset.png" alt="reset" />
      </Reset>
    )
  );
};

export const DescriptionHeader = ({ isOwner }: { isOwner: boolean }) => {
  return (
    <div className="flex flex-row items-center justify-between mb-1">
      <h3 className="text-xl">설명</h3>
      {isOwner && (
        <div className="flex flex-row gap-2">
          <ChangDescription />
          <ResetDescription />
        </div>
      )}
    </div>
  );
};

export const DescriptionBody = ({ isOwner }: { isOwner: boolean }) => {
  const { value, action } = useDescriptionStore((state) => state);
  return (
    <>
      {isOwner ? (
        <Multiline onChange={action.onChangeValue} value={value} />
      ) : (
        <MultiLineText>{value}</MultiLineText>
      )}
    </>
  );
};

const Multiline = styled.textarea`
  ${scrollBar}
  height: 100%;
  width: 100%;
  resize: none;
  white-space: pre-wrap;
`;

const MultiLineText = styled.h3`
  ${scrollBar}
  height: 100%;
  width: 100%;
`;

const Reset = styled.button`
  margin-left: 5px;
  border-radius: 10px;
  padding: 1px;
  img {
    width: 20px;
    height: 20px;
  }
`;

const Spinner = styled.div`
  ${spinner}
  width: 20px;
  height: 20px;
`;
