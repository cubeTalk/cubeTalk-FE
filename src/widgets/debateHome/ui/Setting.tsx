import { SettingButton } from "../../../features/changeSetting";

const SettingHeader = () => {
  return (
    <div className="flex flex-row justify-between mb-1">
      <h3>토론방 설정</h3>
      <SettingButton />
    </div>
  );
};

export const Setting = () => {
  return (
    <div>
      <SettingHeader />
    </div>
  );
};
