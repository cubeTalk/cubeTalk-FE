import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import { UserInfo } from "../../../shared/type";

export const useRoomInfoStore = create(
  persist(
    combine(
      {
        id: "",
        memberId: "",
        nickName: "",
        channelId: "",
        subChannelId: "",
        severTimeStamp: "",
      },
      (set) => ({
        updateInfo: (data: Partial<UserInfo>) =>
          set((state) => ({
            ...state,
            ...data,
          })),
      })
    ),
    { name: "RoomInfo" }
  )
);
