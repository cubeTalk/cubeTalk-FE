import { ReactNode } from "react";
import ReactDOM from "react-dom";

const portalElement = document.getElementById('modal') as HTMLElement;

export const ModalPortal = ({ children }: { children: ReactNode }) => {
  return ReactDOM.createPortal(children, portalElement);
};