// https://velog.io/@foreknowledge/React-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EB%A1%9C-alert-confirm-prompt-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0#%ED%99%94%EB%A9%B4-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%A7%89%EA%B8%B0
import { ReactNode, useCallback, useRef, useState } from "react";
import { AlertContext } from "./model/context";
import ReactDOM from "react-dom";
import Alert from "./ui/Alert";

interface AlertDialogProps {
  children: ReactNode;
}

type ConfirmState = {
  message: string;
  ok: string;
  cancel: string;
  onClickOK: () => void;
  onClickCancel: () => void;
};

const alertElement = document.getElementById("alert") as HTMLElement;

const AlertDialog = ({ children }: AlertDialogProps) => {
  const [state, setState] = useState<ConfirmState>();
  const resolveRef = useRef<(value: boolean) => void>();

  const alert = useCallback(
    (
      message?: string,
      ok?: string,
      cancel?: string,
      onClickOK?: () => void,
      onClickCancel?: () => void
    ): Promise<boolean> => {
      return new Promise((resolve) => {
        resolveRef.current = resolve;
        setState({
          message: message ?? "",
          ok: ok ?? "",
          cancel: cancel ?? "",
          onClickOK: () => {
            onClickOK?.();
            setState(undefined);
            resolveRef.current?.(true);
          },
          onClickCancel: () => {
            onClickCancel?.();
            setState(undefined);
            resolveRef.current?.(false);
          },
        });
      });
    },
    []
  );

  return (
    <AlertContext.Provider value={{ alert }}>
      {children}
      {state && ReactDOM.createPortal(<Alert {...state} />, alertElement)}
    </AlertContext.Provider>
  );
};

export default AlertDialog;
