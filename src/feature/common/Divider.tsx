import styled from "styled-components";

// Divider 컴포넌트 정의
const Divider = ({ color = "#000", margin = 5 }: { color?: string; margin?: number }) => {
  return <HorizontalLine color={color} margin={margin} />;
};

export default Divider;

const HorizontalLine = styled.div<{ color: string; margin: number }>`
  max-width: 1120px;
  border-top-width: 1px;
  border-top-color: ${({ color }) => color};
  height: 0;
  margin: 5px 0;
  margin-inline: ${({ margin }) => `${margin}px`};
`;
