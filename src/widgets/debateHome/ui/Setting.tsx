import { useDebateInfoStore } from "../../../entities/debateInfo";
import { useRoomSettingStore } from "../../../entities/debateSetting/model/store";
import { SettingButton } from "../../../features/changeSetting";
import { useisOwnerStore } from "../../../features/createDebate/model/store";

const SettingHeader = () => {
  const isOwner = useisOwnerStore((state) => state.isOwner);
  return (
    <div className="flex flex-row justify-between mb-1">
      <h3>토론방 설정</h3>
      {isOwner && <SettingButton />}
    </div>
  );
};

const SettingBody = () => {
  const { chatDuration, debateSettings, maxParticipants } = useRoomSettingStore((state) => state);
  const chatMode = useDebateInfoStore((state) => state.chatMode);

  return (
    <div className="flex flex-col gap-2 mb-1">
      <div className="flex flex-row gap-2">
        <div className={`${BaseStyle}  bg-midgray text-white`}>
          <span>최대 인원</span>
          <span>{maxParticipants}명</span>
        </div>
        <div className={`${BaseStyle}  bg-midgray text-white`}>
          <span>진행 시간</span>
          <span>
            {chatMode === "찬반"
              ? Object.values(debateSettings).reduce((acc, value) => acc + value, 0)
              : chatDuration}
            분
          </span>
        </div>
      </div>
      {chatMode === "찬반" && (
        <div className="flex flex-row gap-2">
          <div className={`${ProsTimeStyle}`}>
            <span>찬성 발언</span>
            <span className="">{debateSettings.positiveEntry}분</span>
          </div>
          <div className={`${ConsTimeStyle}`}>
            <span>반대 발언</span>
            <span>{debateSettings.negativeEntry}분</span>
          </div>
          <div className={`${ProsTimeStyle}`}>
            <span>찬성 질문</span>
            <span>{debateSettings.positiveQuestioning}분</span>
          </div>
          <div className={`${ConsTimeStyle}`}>
            <span>반대 질문</span>
            <span>{debateSettings.negativeQuestioning}분</span>
          </div>
          <div className={`${ProsTimeStyle}`}>
            <span>찬성 반론</span>
            <span>{debateSettings.positiveRebuttal}분</span>
          </div>
          <div className={`${ConsTimeStyle}`}>
            <span>반대 반론</span>
            <span>{debateSettings.negativeRebuttal}분</span>
          </div>
        </div>
      )}
    </div>
  );
};

export const Setting = () => {
  return (
    <div>
      <SettingHeader />
      <SettingBody />
    </div>
  );
};

const BaseStyle = "flex flex-row items-center gap-2 rounded-xl px-2 py-0.5 w-fit";
const ProsTimeStyle = `${BaseStyle} bg-yellow`;
const ConsTimeStyle = `${BaseStyle} bg-sky`;
