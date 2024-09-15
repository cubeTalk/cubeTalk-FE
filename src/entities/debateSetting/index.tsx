import { HTMLAttributes } from "react";
import DropdownLabel, { Label } from "./ui/DropdownLabel";
import { DebateSettingActions } from "./model/store";
import { StoreApi, UseBoundStore } from "zustand";
import type { ProsConsSetting, FreeSetting } from "../../shared/type";

const maxParticipantNumbers = [2, 4, 6];

type TimeSettingProps<T> = HTMLAttributes<HTMLDivElement> & {
  useStore: UseBoundStore<StoreApi<T>>;
};

export type SettingEntry<T> = {
  label: string;
  state: T;
  setState: (value: T) => void;
  key: string;
  list: T[];
};

export const MaxParticipants = ({
  useStore,
  ...rest
}: TimeSettingProps<FreeSetting & ProsConsSetting & DebateSettingActions>) => {
  const MaxParticipantsSettingEntries: SettingEntry<number>[] = [
    {
      label: "사용자수",
      state: useStore((state) => state.maxParticipants),
      setState: useStore((state) => state.setMaxParticipants),
      key: "maxParticipants",
      list: maxParticipantNumbers,
    },
  ];
  return (
    <DropdownLabel
      settingEntries={MaxParticipantsSettingEntries}
      className="flex-1 pl-1"
      {...rest}
    />
  );
};

const SubTimeList = Array.from({ length: 5 }, (_, i) => i + 1);
const ProsConsSetting = ({
  useStore,
}: TimeSettingProps<FreeSetting & ProsConsSetting & DebateSettingActions>) => {
  const ProsConsSettingEntries: SettingEntry<number>[] = [
    {
      label: "찬성 발언",
      state: useStore((state) => state.debateSettings.positiveEntry),
      setState: useStore((state) => state.setPositiveEntry),
      key: "positiveEntry",
      list: SubTimeList,
    },
    {
      label: "반대 발언",
      state: useStore((state) => state.debateSettings.negativeEntry),
      setState: useStore((state) => state.setNegativeEntry),
      key: "negativeEntry",
      list: SubTimeList,
    },
    {
      label: "찬성 질문",
      state: useStore((state) => state.debateSettings.positiveQuestioning),
      setState: useStore((state) => state.setPositiveQuestioning),
      key: "positiveQuestioning",
      list: SubTimeList,
    },
    {
      label: "반대 질문",
      state: useStore((state) => state.debateSettings.negativeQuestioning),
      setState: useStore((state) => state.setNegativeQuestioning),
      key: "negativeQuestioning",
      list: SubTimeList,
    },
    {
      label: "찬성 반론",
      state: useStore((state) => state.debateSettings.positiveRebuttal),
      setState: useStore((state) => state.setPositiveRebuttal),
      key: "positiveRebuttal",
      list: SubTimeList,
    },
    {
      label: "반대 반론",
      state: useStore((state) => state.debateSettings.negativeRebuttal),
      setState: useStore((state) => state.setNegativeRebuttal),
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
const FreeSetting = ({ useStore }: TimeSettingProps<FreeSetting & ProsConsSetting & DebateSettingActions>) => {
  const FreeSettingEntries: SettingEntry<number>[] = [
    {
      label: "전체 시간",
      state: useStore((state) => state.chatDuration),
      setState: useStore((state) => state.setChatDuration),
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

const RoomSetting = ({
  chatMode,
  useStore,
}: { chatMode: string } & TimeSettingProps<FreeSetting & ProsConsSetting & DebateSettingActions>) => {
  return (
    <div className="relative border rounded-md p-2 my-4 py-4">
      <Label className="absolute top-0 bg-white transform -translate-y-1/2 px-1">시간설정</Label>
      {chatMode === "찬반" ? (
        <ProsConsSetting useStore={useStore} />
      ) : (
        <FreeSetting useStore={useStore} />
      )}
    </div>
  );
};

export default RoomSetting;
