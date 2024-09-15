import styled from "styled-components";
import { colflex, mediaQuery, rowflex } from "../../shared/style/commonStyle";
import MenuTab from "./ui/MenuTab";
import ScreenContainer from "./ui/ScreenContainer";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { getDebateInfo } from "./api/query";
import { useNavigate, useParams } from "react-router-dom";
import { AlertContext } from "../../entities/alertDialog/model/context";
import { useRoomSettingStore } from "../../entities/debateSetting/model/store";
import { hasFreeSetting, hasProsConsSetting } from "../../shared/type";
import { useDebateInfoStore } from "../../entities/debateInfo";

const DebatePage = () => {
  const { debateRoomId } = useParams();
  const { alert } = useContext(AlertContext);
  const navigate = useNavigate();
  const updateDebateInfo = useDebateInfoStore((state) => state.setInfo);
  const resetSettings = useRoomSettingStore((state) => state.resetSettings);

  if (debateRoomId === undefined) {
    alert("유효하지 않은 접근입니다.", "돌아가기", "", () => navigate("/"));
  }

  const { data, error } = useQuery({
    queryKey: ["getDebateInfo"],
    queryFn: async () => getDebateInfo(debateRoomId),
  });
  if (error) {
    alert("토론방 정보를 가져오는데 실패하였습니다", "확인");
  }
  useEffect(() => {
    if (data && data.data) {
      const debateInfo = data.data;
      updateDebateInfo({
        id: debateInfo.id,
        chatMode: debateInfo.chatMode,
        chatStatus: debateInfo.chatStatus,
        description: debateInfo.description,
        title: debateInfo.title,
      });
      resetSettings({
        maxParticipants: debateInfo.maxParticipants,
        chatDuration: hasFreeSetting(debateInfo),
        debateSettings: hasProsConsSetting(debateInfo),
      });
    }
  }, [data, resetSettings, updateDebateInfo]);

  return (
    <PageLayout>
      <MenuTab />
      <ScreenContainer />
    </PageLayout>
  );
};

export default DebatePage;

const PageLayout = styled.div`
  display: flex;
  height: calc(100vh - 20px);
  width: 100%;
  @media ${mediaQuery.mobile} {
    ${colflex}
    gap: 5px;
  }

  @media ${mediaQuery.tablet} {
    ${rowflex}
    gap: 20px;
  }

  @media ${mediaQuery.desktop} {
    ${rowflex}
    gap: 20px;
  }
`;
