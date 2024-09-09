import Dropdown from "../../../shared/components/dropdown";
import { useModalDropdownStore, useRoomSettingStore } from "../model/store";
import { Label } from "./ProsConsTimeSetting";

const TotalTimeList = Array.from({ length: 23 }, (_, i) => i + 10);

const FreeTimeSetting = () => {
  const chatDuration = useRoomSettingStore((state) => state.chatDuration);
  const setChatDuration = useRoomSettingStore((state) => state.actions.setChatDuration);
  return (
    <div className="flex items-center justify-center space-x-4 my-1">
      <Label>전체 시간</Label>
      <Dropdown
        list={TotalTimeList}
        selected={chatDuration}
        setSelected={(item: string | number) => {
          if (typeof item === "number") {
            setChatDuration(item);
          }
        }}
        label={"chatDuration"}
        useStore={useModalDropdownStore}
      />
    </div>
  );
};

export default FreeTimeSetting;
