import styled from "styled-components";
import { colflex, scrollBar } from "../../../shared/style/commonStyle";
import { useDescriptionStore } from "../model/store";

const DescriptionHeader = () => {
  const resetValue = useDescriptionStore((state) => state.action.resetValue);

  return (
    <div className="flex flex-row justify-between mb-1">
      <h3>설명</h3>
      <Reset onClick={() => resetValue()}>
        <img src="/Icon/reset.png" alt="reset" />
      </Reset>
    </div>
  );
};

export const Description = () => {
  const { value, action } = useDescriptionStore((state) => state);

  return (
    <Container>
      <DescriptionHeader />
      <Multiline onChange={action.onChangeValue} value={value} />
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
