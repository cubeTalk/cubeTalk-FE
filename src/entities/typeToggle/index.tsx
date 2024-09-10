import styled from "styled-components";
import { shadow } from "../../shared/style/commonStyle";
import { DebateMode } from "../../shared/type";

interface ToggleProps {
  chatMode: string;
  setChatMode: (chamMode: DebateMode) => void;
}

const Toggle = ({ chatMode, setChatMode }: ToggleProps) => {
  const handleToggle = () => {
    if (chatMode === "자유") {
      setChatMode("찬반");
    } else {
      setChatMode("자유");
    }
  };

  return (
    <ToggleLabel $isChecked={chatMode === "찬반"}>
      <ToggleCheckbox type="checkbox" checked={chatMode === "찬반"} onChange={handleToggle} />
      <ToggleSwitch $isChecked={chatMode === "찬반"} />
      <h4>찬반토론</h4>
    </ToggleLabel>
  );
};

export default Toggle;

const ToggleLabel = styled.label<{ $isChecked: boolean }>`
  position: relative;
  display: inline-block;
  width: 130px;
  height: 30px;
  h4 {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 8px;
    font-size: 14px;
  }
`;

const ToggleCheckbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  position: absolute;
  width: 100%;
  height: 100%;

  &:checked + span::before {
    transform: translateX(65px);
  }
`;

const ToggleSwitch = styled.span<{ $isChecked: boolean }>`
  ${shadow}
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  border-width: 1px;
  background-color: var(--white);
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    width: 65px;
    height: 30px;
    border-radius: 30px;
    background-color: black;
    transition: 500ms;
  }

  &::after {
    content: "자유토론";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 8px;
    font-size: 14px;
  }
`;
