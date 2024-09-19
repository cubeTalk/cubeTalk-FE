import { useEffect } from "react";
import { useGetDebateSettingQuery } from "../api/query";
import { useDebateInfoStore } from "../../../entities/debateInfo";
import { useRoomSettingStore } from "../../../entities/debateSetting/model/store";
import { FreeSetting, ProsConsSetting } from "../../../shared/type";

export const useUpdateDebateSetting = () => {
  const { data } = useGetDebateSettingQuery();
  const setDescription = useDebateInfoStore((state) => state.actions.setDescription);
  const resetSettings = useRoomSettingStore((state) => state.actions.resetSettings);
  const chatMode = useDebateInfoStore((state) => state.chatMode);

  useEffect(() => {
    if (data) {
      setDescription(data.description);
      const resetData =
        chatMode === "찬반"
          ? ({
              debateSettings: data.debateSettings,
            } as ProsConsSetting)
          : ({

            } as FreeSetting);
      resetSettings(resetData);
    }
  }, [chatMode, data, resetSettings, setDescription]);
};
