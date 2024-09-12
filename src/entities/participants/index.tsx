import styled from "styled-components";
import { center, commonButton } from "../../shared/style/commonStyle";
import { useParticipantsModalStore, useParticipantsStore } from "./model/store";
import { ModalImage } from "./ui/ModalImage";
import { useRoomSettingStore } from "../roomSetting/model/store";

const ParticipantButton = () => {
  const { modalVisible, closeModal, clickModal } = useParticipantsModalStore((state) => state);
  const maxParitipants = useRoomSettingStore((state) => state.maxParticipants);
  const participants = useParticipantsStore((state) => state.list);
  return (
    <>
      <ShowParticipants onClick={clickModal}>
        <h3>{`${participants.length === 0 && participants.filter((item) => item.role !== "관전").length}/${maxParitipants}`}</h3>
        <Profile>
          <img alt="profile" src="/Icon/profile.png" />
        </Profile>
      </ShowParticipants>
      {modalVisible && <ModalImage closeModal={closeModal} />}
    </>
  );
};

export default ParticipantButton;

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
