import styled from "styled-components";
import { CloseButton } from "../../../shared/components/button";
import { colflex, scrollBar } from "../../../shared/style/commonStyle";
import { useParticipantsStore } from "../model/store";
import { ParticipantStatus } from "../../../shared/type";
import { useDebateInfoStore, useUserInfoStore } from "../../debateInfo";
import { useisOwnerStore } from "../../../features/createDebate/model/store";

interface ModalImageProps {
  closeModal: () => void;
}

const StatusE2K = new Map([
  ["PENDING", "대기"],
  ["READY", "준비"],
  ["OWNER", "방장"],
  ["DISCONNECTED", "이탈"],
]);

const MyProfile = () => {
  const { memberId, role, nickName } = useUserInfoStore((state) => state);
  const isOwner = useisOwnerStore((state) => state.isOwner);
  const myStatus = useParticipantsStore((state) => state.myStatus);
  const chatStatus = useDebateInfoStore((state) => state.chatStatus);

  return (
    <div key={memberId} className={`${profileStyle}`}>
      <div className="flex flex-row">
        <UserNickName $role={role}>{nickName}</UserNickName>
        <h5 className=" bg-white text-black mx-2 px-1 self-center rounded-xl font-bold">나</h5>
      </div>
      {chatStatus === "CREATED" &&
        (isOwner ? (
          <h5 className={statusStyle("OWNER")}>방장</h5>
        ) : role !== "관전" ? (
          <h5 className={statusStyle(myStatus)}>
            {myStatus === "DISCONNECTED" ? "대기" : StatusE2K.get(myStatus)}
          </h5>
        ) : (
          <></>
        ))}
    </div>
  );
};

const OtherProfiles = () => {
  const participants = useParticipantsStore((state) => state.participants);
  const chatStatus = useDebateInfoStore((state) => state.chatStatus);
  return (
    <>
      {participants.map((user) => {
        return (
          <div key={user.nickName} className={disconnectedStyle(user.status)}>
            <UserNickName $role={user.role}>{user.nickName}</UserNickName>
            {chatStatus === "CREATED" && (user.status === "OWNER" || user.role !== "관전") && (
              <h5 className={statusStyle(user.status)}>{StatusE2K.get(user.status)}</h5>
            )}
          </div>
        );
      })}
    </>
  );
};

export const ModalImage = ({ closeModal }: ModalImageProps) => {
  return (
    <Layout>
      <CloseButton onClickHandler={closeModal} />
      <h2 className="mb-2">참가자</h2>
      <ParticipantsConatiner>
        <MyProfile />
        <OtherProfiles />
      </ParticipantsConatiner>
    </Layout>
  );
};

const statusStyle = (status: ParticipantStatus) =>
  `px-1 self-center rounded-xl font-semibold flex-shrink-0 ${
    status === "READY" ? "bg-green" : status === "OWNER" ? "bg-emerald" : status === "PENDING" ? "bg-lightgray" : "bg-red"
  } ${status === "READY" && "text-white"}`;

const profileStyle = "flex flex-row justify-between flex-wrap p-1"

const disconnectedStyle = (status: ParticipantStatus) =>
  `${profileStyle} ${status === "DISCONNECTED" && "bg-darkgray"}`;
  

const Layout = styled.div`
  position: absolute;
  background-color: var(--color-dark);
  width: 277px;
  padding: 10px;
  border-radius: 8px;
  top: 40px;
  right: 0px;
  z-index: 30;
  h2 {
    color: var(--white);
  }
`;

const UserNickName = styled.h4<{ $role: string }>`
  font-weight: 600;
  color: ${({ $role }) =>
    $role === "찬성"
      ? "var(--color-pro)"
      : $role === "반대"
        ? "var(--color-con)"
        : $role === "자유"
          ? "var(--color-free)"
          : "var(--color-light)"};
`;

const ParticipantsConatiner = styled.div`
  ${colflex}
  ${scrollBar}
  background-color: var(--color-mid);
  border-radius: 8px;
  max-height: 190px;
  overflow-y: auto;
`;
