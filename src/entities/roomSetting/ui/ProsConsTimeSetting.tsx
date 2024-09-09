import styled from "styled-components";
import { useModalDropdownStore, useRoomSettingStore } from "../model/store";
import Dropdown from "../../../shared/components/dropdown";

export const SubTimeList = Array.from({ length: 5 }, (_, i) => i + 1);

const ProsConsTimeSetting = () => {
  const roomStoreEntries = [
    {
      label: "찬성 발언",
      state: useRoomSettingStore((state) => state.positiveEntry),
      setState: useRoomSettingStore((state) => state.actions.setPositiveEntry),
      key: "positiveEntry",
    },
    {
      label: "반대 발언",
      state: useRoomSettingStore((state) => state.negativeEntry),
      setState: useRoomSettingStore((state) => state.actions.setNegativeEntry),
      key: "negativeEntry",
    },
    {
      label: "찬성 질문",
      state: useRoomSettingStore((state) => state.positiveQuestioning),
      setState: useRoomSettingStore((state) => state.actions.setPositiveQuestioning),
      key: "positiveQuestioning",
    },
    {
      label: "반대 질문",
      state: useRoomSettingStore((state) => state.negativeQuestioning),
      setState: useRoomSettingStore((state) => state.actions.setNegativeQuestioning),
      key: "negativeQuestioning",
    },
    {
      label: "찬성 반론",
      state: useRoomSettingStore((state) => state.positiveRebuttal),
      setState: useRoomSettingStore((state) => state.actions.setPositiveRebuttal),
      key: "positiveRebuttal",
    },
    {
      label: "반대 반론",
      state: useRoomSettingStore((state) => state.negativeRebuttal),
      setState: useRoomSettingStore((state) => state.actions.setNegativeRebuttal),
      key: "negativeRebuttal",
    },
  ];

  return (
    <div className="flex flex-wrap ">
      {roomStoreEntries.map(({ label, state, setState, key }) => (
        <div key={key} className="flex items-center space-x-4 mx-auto my-1">
          <Label>{label}</Label>
          <Dropdown
            list={SubTimeList}
            selected={state}
            setSelected={(item: string | number) => {
              if (typeof item === "number") {
                setState(item);
              }
            }}
            label={key}
            useStore={useModalDropdownStore}
          />
        </div>
      ))}
    </div>
  );
};

export default ProsConsTimeSetting;

export const Label = styled.label`
  font-size: 1rem;
  margin: 0 0 0 0.5rem;
`;
