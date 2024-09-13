import { HTMLAttributes } from "react";
import DropdownLabel, { Label } from "./ui/DropdownLabel";
import { RoomSettingActions, RoomSettingType } from "./model/store";

const maxParticipantNumbers = [2, 4, 6];

type TimeSettingProps<T, P> = HTMLAttributes<HTMLDivElement> & {
  state: T;
  actions: T & P;
};

export type SettingEntry<T> = {
  label: string;
  state: T;
  setState: (value: T) => void;
  key: string;
  list: T[];
};

export const MaxParticipants = ({
  state,
  actions,
  ...rest
}: TimeSettingProps<RoomSettingType, RoomSettingActions>) => {
  const MaxParticipantsSettingEntries: SettingEntry<number>[] = [
    {
      label: "사용자수",
      state: state.maxParticipants,
      setState: actions.setParticipants,
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
const ProsConsTimeSetting = ({
  state,
  actions,
}: TimeSettingProps<RoomSettingType, RoomSettingActions>) => {
  const ProsConsSettingEntries: SettingEntry<number>[] = [
    {
      label: "찬성 발언",
      state: state.positiveEntry,
      setState: actions.setPositiveEntry,
      key: "positiveEntry",
      list: SubTimeList,
    },
    {
      label: "반대 발언",
      state: state.negativeEntry,
      setState: actions.setNegativeEntry,
      key: "negativeEntry",
      list: SubTimeList,
    },
    {
      label: "찬성 질문",
      state: state.positiveQuestioning,
      setState: actions.setPositiveQuestioning,
      key: "positiveQuestioning",
      list: SubTimeList,
    },
    {
      label: "반대 질문",
      state: state.negativeQuestioning,
      setState: actions.setNegativeQuestioning,
      key: "negativeQuestioning",
      list: SubTimeList,
    },
    {
      label: "찬성 반론",
      state: state.positiveRebuttal,
      setState: actions.setPositiveRebuttal,
      key: "positiveRebuttal",
      list: SubTimeList,
    },
    {
      label: "반대 반론",
      state: state.negativeRebuttal,
      setState: actions.setNegativeRebuttal,
      key: "negativeRebuttal",
      list: SubTimeList,
    },
  ];
  return (
    <div className="flex flex-wrap ">
      <DropdownLabel
        settingEntries={ProsConsSettingEntries}
        className="flex items-center space-x-4 mx-auto my-1"
      />
    </div>
  );
};

const TotalTimeList = Array.from({ length: 20 }, (_, i) => i + 10);
const FreeTimeSetting = ({
  state,
  actions,
}: TimeSettingProps<RoomSettingType, RoomSettingActions>) => {
  const FreeTimeSettingEntries: SettingEntry<number>[] = [
    {
      label: "전체 시간",
      state: state.chatDuration,
      setState: actions.setChatDuration,
      key: "chatDuration",
      list: TotalTimeList,
    },
  ];
  return (
    <DropdownLabel
      settingEntries={FreeTimeSettingEntries}
      className="flex items-center justify-center space-x-4 my-1"
    />
  );
};

const RoomSetting = ({
  chatMode,
  state,
  actions,
}: { chatMode: string } & TimeSettingProps<RoomSettingType, RoomSettingActions>) => {
  return (
    <div className="relative border rounded-md p-2 my-4 py-4">
      <Label className="absolute top-0 bg-white transform -translate-y-1/2 px-1">시간설정</Label>
      {chatMode === "찬반" ? (
        <ProsConsTimeSetting state={state} actions={actions} />
      ) : (
        <FreeTimeSetting state={state} actions={actions} />
      )}
    </div>
  );
};

export default RoomSetting;
