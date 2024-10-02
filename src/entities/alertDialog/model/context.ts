import { createContext } from "react";

type AlertContextType = {
  alert: (
    message?: string,
    ok?: string,
    cancel?: string,
    onClickOK?: () => void,
    onClickCancel?: () => void
  ) => Promise<boolean>;
};

export const AlertContext = createContext<AlertContextType>({
  alert: () => new Promise((_, reject) => reject()),
});
