import styled from "styled-components";
import { rowflex } from "../../../styles/shared";
import { useState } from "react";

const regulations = [
  "모든 참여 인원이 준비버튼을 눌러야 토론을 시작할 수 있습니다.",
  "긍정은 노랑, 부정은 파랑으로 표시됩니다.",
  "상대방의 동의 없이 불쾌감을 줄 수 있는 텍스트나 이미지를 전송하는 행위는 법적 처벌의 대상이 될 수 있습니다.",
  "건전하고 매너 있는 대화 문화를 준수해 주시기 바랍니다.",
]

const Announcement = () => {
  const [visible, setVisible] = useState(true);
  return (
    visible && 
     <AnnocuementBubble >
     <CloseButton onClick={() => setVisible(false)}>
       <img src="/Icon/close.png" alt="close" />
     </CloseButton>
     <AnnounceHeader>
       <img src="/chatIcon/announce.png" alt="annouce" />
       <h2>시작 전 확인해주세요!</h2>
     </AnnounceHeader>
     {regulations.map((sentence) => {
       return (  
         <li>{sentence}</li>
       );
     })}
   </AnnocuementBubble>
  );
};

export default Announcement;

const AnnocuementBubble = styled.div`
  background-color: var(--white);
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 5px;
  border-radius: 5px;

  li {
    margin-left: 10px;
  }
`

const AnnounceHeader = styled.div`
  ${rowflex}
  align-items: flex-start;
  margin-left: 10px;

`

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  img {
    width: 20px;
  }
`