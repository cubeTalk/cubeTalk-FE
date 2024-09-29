import styled from "styled-components";
import { colflex } from "../../../shared/style/commonStyle";

const ScreenHeaderSkeleton = () => {
  return (
    <div className="flex flex-row">
      <p> </p>
    </div>
  );
};

export const ScreenContainerSkeleton = () => {
  return (
    <ScreenConatiner className="bg-darkgray">
      <ScreenHeaderSkeleton />
      <ScreenWarpper>
        <ScreenLayout />
      </ScreenWarpper>
    </ScreenConatiner>
  );
};

const ScreenConatiner = styled.div`
  ${colflex}
  gap: 10px;
  width: 100%;
  border-radius: 8px;
  padding: 10px;
  overflow: auto;
  height: 100%;
`;

const ScreenWarpper = styled.div`
  display: flex;
  overflow: auto;
  height: 100%;
  flex: 1;
`;

const ScreenLayout = styled.div`
  ${colflex}
  padding: 5px;
  border-radius: 8px;
  background-color: var(--color-light);
  height: 100%;
  width: 100%;
  display: "flex";
`;
