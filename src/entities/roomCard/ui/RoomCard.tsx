import styled from "styled-components";
import Divider from "../../../shared/components/divider";
import { RoomCardType } from "../../../shared/type";
import { useEnterModalStore } from "../../../features/enterDebate/model/store";
import { useDebateInfoStore } from "../../debateInfo";
import { calculateRemainingTime } from "../lib";

const RoomCard = ({
  title,
  description,
  id,
  chatDuration,
  chatMode,
  createdAt,
  maxParticipants,
  currentParticipantsCount,
  started,
}: Partial<RoomCardType> & { started: boolean }) => {
  const openEnterDebateModal = useEnterModalStore((state) => state.openModal);
  const setId = useDebateInfoStore((state) => state.setId);
  const onClickHandler = () => {
    if (id) {
      setId(id);
      openEnterDebateModal(started);
    }
  };
  return (
    <>
      <CardContainer
        onClick={onClickHandler}
        className="hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer"
      >
        <div className="flex flex-row gap-4 items-center flex-wrap justify-between mb-1">
          <Title>{title}</Title>
          <div className="flex items-center gap-4">
            <h3 className={`${chatMode === "찬반" ? "bg-amber-200": "bg-lime-200"} py-1 px-2 rounded-md shrink-0`}>{chatMode}</h3>
            {chatDuration &&
              createdAt &&
              (!started ? (
                <h3 className="text-gray-700 text-sm bg-cyan-200 py-1 px-2 rounded-md">
                  {chatDuration}분
                </h3>
              ) : (
                <h3 className="text-gray-700 text-sm bg-rose-200 py-1 px-2 rounded-md">
                  {calculateRemainingTime(chatDuration, createdAt)}
                </h3>
              ))}

            {!started ? (
              <div className="flex items-center gap-1 bg-emerald-100 py-1 px-2 rounded-md">
                <h3>
                  {currentParticipantsCount}명/{maxParticipants}명
                </h3>
              </div>
            ) : (
              <h3 className="flex items-center gap-1 bg-emerald-100 py-1 px-2 rounded-md">
                {currentParticipantsCount}명 참가
              </h3>
            )}
          </div>
        </div>
        <DescriptionText>{description}</DescriptionText>
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
