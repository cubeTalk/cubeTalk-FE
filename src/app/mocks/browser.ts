import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const enableMocking = async () => {
  if (process.env.NODE_ENV === "development") {
    return;
  }

  const worker = setupWorker(...handlers);
  return worker.start({
    onUnhandledRequest: "bypass",
  });
};
