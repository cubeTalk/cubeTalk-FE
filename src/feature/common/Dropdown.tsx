import styled from "styled-components";
import { rowflexCenter } from "../../styles/shared";

const Dropdown = () => {
  return (
    <DropdownButton>
      <SelectedText>드롭다운</SelectedText>
      <DownIcon alt="down" src="/Icon/down.svg" />
    </DropdownButton>
  );
};

export default Dropdown;

const DropdownButton = styled.button`
  ${rowflexCenter}
  border-width: 1px;
  border-radius: 15px;
  margin: 4px;
  padding: 0px 10px;
`;

const SelectedText = styled.h3``;

const DownIcon = styled.img`
  width: 15px;
  height: 15px;
  margin-left: 5px;
  color: var(--color-mid);
`;
