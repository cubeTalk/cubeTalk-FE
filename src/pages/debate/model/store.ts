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

export const useWebSocketErrorStore = create(
  combine(
    {
      error: "",
    },
    (set) => ({
      setError: (error: string) => set({ error }),
    })
  )
);

export const useWebSocketTimeOutStore = create(
  combine(
    {
      error: "",
    },
    (set) => ({
      setError: (error: string) => set({ error }),
    })
  )
);
