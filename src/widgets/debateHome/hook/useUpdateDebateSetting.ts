import { useContext, useEffect } from "react";
import { useGetDebateSettingQuery } from "../api/query";
import { useDebateInfoStore } from "../../../entities/debateInfo";
import { useRoomSettingStore } from "../../../entities/debateSetting/model/store";
import { FreeSetting, ProsConsSetting } from "../../../shared/type";
import { AlertContext } from "../../../entities/alertDialog/model/context";

export const useUpdateDebateSetting = () => {
  const { data, isPending, isError } = useGetDebateSettingQuery();
  const setDescription = useDebateInfoStore((state) => state.actions.setDescription);
  const resetSettings = useRoomSettingStore((state) => state.actions.resetSettings);
  const chatMode = useDebateInfoStore((state) => state.chatMode);
  const { alert } = useContext(AlertContext);
  // Todo api 변경시 resetdata 수정필요
  useEffect(() => {
    if (data) {
      setDescription(data.description);
      const resetData =
        chatMode === "찬반"
          ? ({
              debateSettings: data.debateSettings,
            } as ProsConsSetting)
          : ({} as FreeSetting);
      resetSettings(resetData);
    }
  }, [chatMode, data, resetSettings, setDescription]);

  if (isError) {
    alert("토론 설정을 가져오는데 실패하였습니다, 다시 홈버튼을 다시 눌러주세요,", "확인");
  }

  return isPending;
};
