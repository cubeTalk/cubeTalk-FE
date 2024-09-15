import { useInfoStore } from "../../../entities/debateInfo";
import { createInputStore } from "../../../entities/messageInput/model/store";

export const useDescriptionStore = createInputStore(useInfoStore.getState().debateInfo.description);