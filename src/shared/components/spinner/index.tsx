import styled from "styled-components";
import { blackSpinner } from "../../style/commonStyle";

export const PageLoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center absolute bg-black/[.30] inset-0 z-50">
      <Spinner />
    </div>
  );
};

const Spinner = styled.div`
  ${blackSpinner}
  width: 60px;
  height: 60px;
`;
