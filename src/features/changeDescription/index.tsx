import styled from "styled-components";
import { DescriptionBody, DescriptionHeader } from "./ui";
import { colflex } from "../../shared/style/commonStyle";
import { useisOwnerStore } from "../createDebate/model/store";

export const Description = () => {
  const isOwner = useisOwnerStore((state) => state.isOwner);
  return (
    <Container>
      <DescriptionHeader isOwner={isOwner} />
      <DescriptionBody isOwner={isOwner} />
    </Container>
  );
}

const Container = styled.div`
  ${colflex}
  width: 100%;
  height: 100%;
`;
