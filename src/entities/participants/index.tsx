import styled from "styled-components";
import { center, commonButton } from "../../shared/style/commonStyle";
import { useParticipantsModalStore, useParticipantsStore } from "./model/store";
import { ModalImage } from "./ui/ModalImage";
import { useRoomSettingStore } from "../debateSetting/model/store";
import { useUserInfoStore } from "../debateInfo";
import { useQueryClient } from "@tanstack/react-query";
import { GetDebateInfoKey } from "../../pages/debate/api/query";

const CurrentMaxUsers = () => {
  const maxParitipants = useRoomSettingStore((state) => state.maxParticipants);
  const role = useUserInfoStore((state) => state.role);
  const participants = useParticipantsStore((state) => state.participants);
  const currentNumber = participants.filter((item) => item.role !== "관전").length;
  const currentNumberWithMe = role !== "관전" ? currentNumber + 1 : currentNumber;
  return <h3>{`${currentNumberWithMe}/${maxParitipants}`}</h3>;
};

export const ParticipantsButton = () => {
  const clickModal = useParticipantsModalStore((state) => state.clickModal);
  const client = useQueryClient();
  const onClickHandler = () => {
    client.refetchQueries({ queryKey: [GetDebateInfoKey], exact: true });
    clickModal();
  };
  return (
    <ShowParticipants onClick={onClickHandler}>
      <CurrentMaxUsers />
      <Profile>
        <img alt="profile" src="/Icon/profile.png" />
      </Profile>
    </ShowParticipants>
  );
};

export const ParticipantsModal = () => {
  const modalVisible = useParticipantsModalStore((state) => state.modalVisible);
  const closeModal = useParticipantsModalStore((state) => state.clickModal);
  return <>{modalVisible && <ModalImage closeModal={closeModal} />}</>;
};

const ShowParticipants = styled.button`
  ${commonButton}
  position: relative;
  background-color: var(--color-light);
  margin: 5px;
`;

const Profile = styled.div`
  ${center}
  width: 25px;
  height: 25px;
  border-radius: 15px;
  background-color: #65558f;
  img {
    width: 15px;
  }
`;
