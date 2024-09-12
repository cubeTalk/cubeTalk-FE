import styled from "styled-components";
import useInputChangeHandler from "../../shared/hook/useChangeHandler";
import { useDebateMemoStore } from "./model/store";
import { scrollBar } from "../../shared/style/commonStyle";

const Memo = () => {
  const { memo, setMemo } = useDebateMemoStore((state) => state);
  const onChangeMemo = useInputChangeHandler(setMemo);
  return (
    <>
      <h2>메모장</h2>
      <Multiline
        onChange={onChangeMemo}
        value={memo}
        className="rounded-lg"
        autoFocus
      />
    </>
  );
};

export default Memo;

const Multiline = styled.textarea`
  ${scrollBar}
  width: 100%;
  height: 100%;
  padding: 10px;
  resize: none;
  white-space: pre-wrap;
  outline: none;
  box-shadow: 1px 1px 5px var(--color-mid)
`;