import { useRoomStore } from "../../features/createRoom/model/store";
import Dropdown from "../../shared/components/dropdown";
import { useModalDropdownStore, useRoomSettingStore } from "./model/store";
import FreeTimeSetting from "./ui/FreeTimeSetting";
import ProsConsTimeSetting, { Label } from "./ui/ProsConsTimeSetting";

const maxParticipantNumbers = [2, 4, 6];

export const MaxParticipants = () => {
  const maxParticipants = useRoomSettingStore((state) => state.maxParticipants);
  const setParticipants = useRoomSettingStore((state) => state.actions.setParticipants);
  return (
    <div className="flex-1 pl-1">
      <Label>사용자수</Label>
      <Dropdown
        list={maxParticipantNumbers}
        selected={maxParticipants}
        setSelected={(item: string | number) => {
          if (typeof item === "number") {
            setParticipants(item);
          }
        }}
        label={"maxParticipants"}
        useStore={useModalDropdownStore}
      />
    </div>
  );
};

const RoomSetting = () => {
  const chatMode = useRoomStore((state) => state.chatMode);
  return (
    <>
      <div className="relative border rounded-md p-2 my-4 py-4">
        <Label className="absolute top-0 bg-white transform -translate-y-1/2 px-1">시간설정</Label>
        {chatMode === "찬반" ? <ProsConsTimeSetting /> : <FreeTimeSetting />}
      </div>
    </>
  );
};

export default RoomSetting;
