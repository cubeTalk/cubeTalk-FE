import styled from "styled-components";
import { mediaQuery } from "../../../shared/style/commonStyle";
import { EventMessage } from "../../../shared/type";

export const EventBubble = ({ message }: { message: EventMessage }) => {
  return (
    <div className="flex justify-center">
      <RoomBubble>{message.message}</RoomBubble>
    </div>
  );
};

// export const ChangeTeamBubble = ({ userName, team }) => {
//   return (
//     <div className="flex justify-center">
//       <RoomBubble>
//         <strong>{userName}</strong>님이 <strong>{team}</strong>으로 변경하였습니다.
//       </RoomBubble>
//     </div>
//   );
// };

const RoomBubble = styled.h4`
  text-align: center;
  width: fit-content;
  background-color: var(--color-primary);
  color: var(--white);
  line-height: 1.4;
  padding: 5px 10px;
  border-radius: 5px;
  word-wrap: break-word;
  max-width: 60%;
  margin: 4px 0px;

  @media ${mediaQuery.mobile} {
    max-width: 80%;
  }
`;
