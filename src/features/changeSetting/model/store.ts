import { create } from "zustand";
import { createRoomSettingStore } from "../../../entities/debateSetting/model/store";
import { createModalStore } from "../../../shared/components/modal/model/store";

export const useSettingChangeModalStore = createModalStore(false);

const changeSettingStore = createRoomSettingStore();

export const useChangeSettingStore = create(changeSettingStore);