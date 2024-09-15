import styled from "styled-components";
import { colflex, mediaQuery, rowflex } from "../../shared/style/commonStyle";
import MenuTab from "./ui/MenuTab";
import ScreenContainer from "./ui/ScreenContainer";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { getDebateInfo } from "./api/query";
import { useNavigate, useParams } from "react-router-dom";
import { useRoomSettingStore } from "../../entities/debateSetting/model/store";
import { hasFreeSetting, hasProsConsSetting } from "../../shared/type";
import { useDebateInfoStore, useUserInfoStore } from "../../entities/debateInfo";
import { useisOwnerStore } from "../../features/createDebate/model/store";
import { AlertContext } from "../../entities/alertDialog/model/context";
import { useParticipantsStore } from "../../entities/participants/model/store";

const DebatePage = () => {
  const { debateRoomId } = useParams();
  const updateDebateInfo = useDebateInfoStore((state) => state.setInfo);
  const resetSettings = useRoomSettingStore((state) => state.resetSettings);
  const setIsOwner = useisOwnerStore((state) => state.actions.setIsOwner);
  const memberId = useUserInfoStore((state) => state.memberId);
  const resetParticipants = useParticipantsStore((state) => state.actions.resetParticipants);
  const navigate = useNavigate();
  const { alert } = useContext(AlertContext);
  const { data, isError } = useQuery({
    queryKey: ["getDebateInfo"],
    queryFn: async () => getDebateInfo(debateRoomId),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 60000,
  });

  useEffect(() => {
    if (isError) {
      alert("토론방 정보를 가져오는데 실패하였습니다. 다시 참가해 주세요", "확인");
      navigate("/");
    }
  }, [isError, alert, navigate]);

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
      resetParticipants(debateInfo.participants);
      if (debateInfo.ownerId === memberId) {
        setIsOwner();
      }
    }
  }, [data, memberId, resetParticipants, resetSettings, setIsOwner, updateDebateInfo]);

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
