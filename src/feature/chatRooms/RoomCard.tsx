import styled from "styled-components";
import Divider from "../common/Divider";

const RoomCard = () => {
  return (
    <>
      <CardContainer>
        <TitleText>
          제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.
        </TitleText>
        <DescriptionText>
          설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.설명입니다.
        </DescriptionText>
      </CardContainer>
      <Divider color="#909090" margin={15} />
    </>
  );
};

export default RoomCard;

const CardContainer = styled.div`
  padding: 10px 15px;
  width: 100%;
`;

const TitleText = styled.h3`
  margin-bottom: 5px;
`;

const DescriptionText = styled.h5`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
