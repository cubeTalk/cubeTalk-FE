import styled from "styled-components";

const Divider = () => {
  return (
    <HorizontalLine />
  );
}

export default Divider;

const HorizontalLine = styled.div`
  max-width: 1120px;
  border-top-width: 1px;
  height: 0px;
  margin: 5px 0px;
  margin-inline: 10px;
`