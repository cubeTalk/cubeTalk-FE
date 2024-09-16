import { useEffect } from "react";

type AlertProps = {
  message: string;
  ok?: string;
  cancel?: string;
  onClickOK: () => void;
  onClickCancel: () => void;
};

const Alert = ({ message, ok, cancel, onClickCancel, onClickOK }: AlertProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClickCancel();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClickCancel]);

  return (
    <div className="flex items-center justify-center">
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-40"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="z-50 fixed top-5 bg-white p-6 rounded-lg max-w-sm w-90vh min-w-64 min-h-50">
        <h3 className="mb-4 break-words">{message}</h3>
        <div className="flex justify-end">
          {ok && (
            <button onClick={onClickOK} className="px-4 py-1 bg-green text-white rounded" autoFocus>
              {ok}
            </button>
          )}
          {cancel && (
            <button onClick={onClickCancel} className="ml-2 px-4 py-1 bg-lightgray rounded">
              {cancel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;
