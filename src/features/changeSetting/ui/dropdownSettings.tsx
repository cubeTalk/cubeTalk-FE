import { SettingEntry } from "../../../entities/debateSetting";
import DropdownLabel, { Label } from "../../../entities/debateSetting/ui/DropdownLabel";
import { useChangeSettingStore } from "../model/store";

const maxParticipantNumbers = [2, 4, 6];

export const MaxParticipants = () => {
  const MaxParticipantsSettingEntries: SettingEntry<number>[] = [
    {
      label: "사용자수",
      state: useChangeSettingStore((state) => state.maxParticipants),
      setState: useChangeSettingStore((state) => state.setMaxParticipants),
      key: "maxParticipants",
      list: maxParticipantNumbers,
    },
  ];
  return (
    <DropdownLabel
      settingEntries={MaxParticipantsSettingEntries}
      className="flex-1 pl-1"
    />
  );
};

const SubTimeList = Array.from({ length: 5 }, (_, i) => i + 1);
const ProsConsSetting = () => {
  const ProsConsSettingEntries: SettingEntry<number>[] = [
    {
      label: "찬성 발언",
      state: useChangeSettingStore((state) => state.debateSettings.positiveEntry),
      setState: useChangeSettingStore((state) => state.setPositiveEntry),
      key: "positiveEntry",
      list: SubTimeList,
    },
    {
      label: "반대 발언",
      state: useChangeSettingStore((state) => state.debateSettings.negativeEntry),
      setState: useChangeSettingStore((state) => state.setNegativeEntry),
      key: "negativeEntry",
      list: SubTimeList,
    },
    {
      label: "찬성 질문",
      state: useChangeSettingStore((state) => state.debateSettings.positiveQuestioning),
      setState: useChangeSettingStore((state) => state.setPositiveQuestioning),
      key: "positiveQuestioning",
      list: SubTimeList,
    },
    {
      label: "반대 질문",
      state: useChangeSettingStore((state) => state.debateSettings.negativeQuestioning),
      setState: useChangeSettingStore((state) => state.setNegativeQuestioning),
      key: "negativeQuestioning",
      list: SubTimeList,
    },
    {
      label: "찬성 반론",
      state: useChangeSettingStore((state) => state.debateSettings.positiveRebuttal),
      setState: useChangeSettingStore((state) => state.setPositiveRebuttal),
      key: "positiveRebuttal",
      list: SubTimeList,
    },
    {
      label: "반대 반론",
      state: useChangeSettingStore((state) => state.debateSettings.negativeRebuttal),
      setState: useChangeSettingStore((state) => state.setNegativeRebuttal),
      key: "negativeRebuttal",
      list: SubTimeList,
    },
  ];
  return (
    <div className="flex flex-wrap">
      <DropdownLabel
        settingEntries={ProsConsSettingEntries}
        className="flex items-center space-x-4 mx-auto my-1"
      />
    </div>
  );
};

const TotalTimeList = Array.from({ length: 21 }, (_, i) => i + 10);
const FreeSetting = () => {
  const FreeSettingEntries: SettingEntry<number>[] = [
    {
      label: "전체 시간",
      state: useChangeSettingStore((state) => state.chatDuration),
      setState: useChangeSettingStore((state) => state.setChatDuration),
      key: "chatDuration",
      list: TotalTimeList,
    },
  ];
  return (
    <DropdownLabel
      settingEntries={FreeSettingEntries}
      className="flex items-center justify-center space-x-4 my-1"
    />
  );
};

const RoomSetting = ({ chatMode }: { chatMode: string }) => {
  return (
    <div className="relative border rounded-md p-2 my-4 py-4">
      <Label className="absolute top-0 bg-white transform -translate-y-1/2 px-1">시간설정</Label>
      {chatMode === "찬반" ? <ProsConsSetting /> : <FreeSetting />}
    </div>
  );
};

export default RoomSetting;
