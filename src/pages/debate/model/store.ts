import { create } from "zustand";
import { combine } from "zustand/middleware";

export type MenuType = "Home" | "MainChat" | "TeamChat" | "Memo";

const initialMenuState = {
  menu: "MainChat" as MenuType,
};

export const useMenuStore = create(
  combine(initialMenuState, (set) => ({
    action: {
      changeMenu: (newMenu: MenuType) => set(() => ({ menu: newMenu })),
    },
  }))
);

export const useParticipantsErrorStore = create(
  combine(
    {
      error: "",
    },
    (set) => ({
      setError: (error: string) => set({ error }),
    })
  )
);
