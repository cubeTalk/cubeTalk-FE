import styled from "styled-components";
import { rowflexCenter } from "../../styles/shared";

const Dropdown = () => {
  return (
    <DropdownButton>
      <p>드롭다운</p>
      <DownIcon alt="down" src="/Icon/down.svg" />
    </DropdownButton>
  );
}

export default Dropdown;


const DropdownButton = styled.button`
  ${rowflexCenter}
  border-width: 1px;
  border-radius: 15px;
  margin: 4px;
  padding: 0px 15px;
`

const DownIcon = styled.img`
  width: 15px;
  height: 15px;
  margin-left: 5px;
  color: var(--color-mid);
`;