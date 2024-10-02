import styled from "styled-components";
import Divider from "../../../shared/components/divider";
import { RoomCardType } from "../../../shared/type";
import { useEnterModalStore } from "../../../features/enterDebate/model/store";
import { useUserInfoStore } from "../../debateInfo";
import { calculateRemainingTime } from "../lib";
import { useRoomStore } from "../../../features/createDebate/model/store";

const RoomCard = ({ room }: { room: RoomCardType }) => {
  const openEnterDebateModal = useEnterModalStore((state) => state.openModal);
  const setInfo = useUserInfoStore((state) => state.setInfo);
  const setChatMode = useRoomStore((state) => state.actions.setChatMode);

  const onClickHandler = () => {
    if (room.id) {
      setInfo({ id: room.id });
      if (room.chatMode === "찬반" || room.chatMode === "자유") {
        setChatMode(room.chatMode);
      }
      openEnterDebateModal(room.chatStatus === "CREATED" ? false : true);
    }
  };

  return (
    <>
      <CardContainer
        onClick={onClickHandler}
        className="hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer"
      >
        <div className="flex flex-row items-center flex-wrap mb-1">
          <Title>{room.title}</Title>
          <div className="flex items-center gap-4 ml-auto">
            <h3
              className={`${room.chatMode === "찬반" ? "bg-amber-200" : "bg-emerald"} py-1 px-2 rounded-md shrink-0`}
            >
              {room.chatMode}
            </h3>
            {room.chatStatus === "CREATED" ? (
              <>
                <h3 className="text-gray-700 text-sm bg-cyan-200 py-1 px-2 rounded-md">
                  {room.chatDuration}분
                </h3>
                <div className="flex items-center gap-1 bg-lime-200 py-1 px-2 rounded-md">
                  <h3>
                    {room.currentParticipantsCount}명/{room.maxParticipants}명
                  </h3>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-gray-700 text-sm bg-rose-200 py-1 px-2 rounded-md">
                  {calculateRemainingTime(room.chatDuration, room.createdAt)}
                </h3>
                <h3 className="flex items-center gap-1 bg-lime-200 py-1 px-2 rounded-md">
                  {room.currentParticipantsCount}명 참가
                </h3>
              </>
            )}
          </div>
        </div>
        <DescriptionText>{room.description}</DescriptionText>
      </CardContainer>
      <Divider color="#e0e0e0" margin={15} />
    </>
  );
};

export default RoomCard;

const CardContainer = styled.button`
  padding: 10px 15px;
  width: 100%;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DescriptionText = styled.h4`
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
