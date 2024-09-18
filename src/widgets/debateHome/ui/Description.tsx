import styled from "styled-components";
import { colflex, scrollBar, spinner } from "../../../shared/style/commonStyle";
import { useDescriptionStore } from "../model/store";
import { useisOwnerStore } from "../../../features/createDebate/model/store";
import { Submit } from "../../../shared/components/button";
import { useChangeDescriptionQuery } from "../api/query";
import { useUserInfoStore } from "../../../entities/debateInfo";

const ChangDescription = () => {
  const description = useDescriptionStore((state) => state.value);
  const memberId = useUserInfoStore((state) => state.memberId);

  const { mutate, isPending } = useChangeDescriptionQuery();
  const onClickHandler = () => {
    mutate({ description, ownerId: memberId });
  };

  return (
    <Submit onClick={onClickHandler} disabled={isPending}>
      {isPending ? <Spinner /> : <h5 className="text-white">변경</h5>}
    </Submit>
  );
};

const DescriptionHeader = ({ isOwner }: { isOwner: boolean }) => {
  const resetValue = useDescriptionStore((state) => state.action.resetValue);
  return (
    <div className="flex flex-row items-center justify-between mb-1">
      <h3 className="text-xl">설명</h3>
      {isOwner && (
        <div className="flex flex-row gap-2">
          <ChangDescription />{" "}
          <Reset onClick={() => resetValue()}>
            <img src="/Icon/reset.png" alt="reset" />
          </Reset>
        </div>
      )}
    </div>
  );
};

export const Description = () => {
  const { value, action } = useDescriptionStore((state) => state);
  const isOwner = useisOwnerStore((state) => state.isOwner);
  return (
    <Container>
      <DescriptionHeader isOwner={isOwner} />
      {isOwner ? <Multiline onChange={action.onChangeValue} value={value} /> : <h3>{value}</h3>}
    </Container>
  );
};

const Multiline = styled.textarea`
  ${scrollBar}
  height: 100%;
  width: 100%;
  resize: none;
  white-space: pre-wrap;
  outline: none;
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

const Container = styled.div`
  ${colflex}
  width: 100%;
  height: 100%;
`;

const Spinner = styled.div`
  ${spinner}
  width: 20px;
  height: 20px;
`;
