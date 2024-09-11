import { create } from "zustand";
import { combine } from "zustand/middleware";

export type MenuType = "Home" | "Chat" | "TeamChat" | "Memo";

const initialMenuState = {
  menu: "Chat" as MenuType,
};

export const useMenuStore = create(
  combine(initialMenuState, (set) => ({
    action: {
      changeMenu: (newMenu: MenuType) => set(() => ({ menu: newMenu })),
    },
  }))
);
