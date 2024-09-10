import { createInputStore } from "../../../shared/hook/createInputStore";

export const useMessageStore = createInputStore({
  message: "",
});
