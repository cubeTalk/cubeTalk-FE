import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../shared/axiosApi";
import { useUserInfoStore } from "../../../entities/debateInfo";
import { ChatMessage } from "../../../shared/type";

export type GetMessagesResponse = {
  mainChat: ChatMessage[];
};

const getMessages = async (id: string, channelId: string): Promise<ChatMessage[]> => {
  const response = await axios.get(`/chat/${id}/messages`, {
    params: { channelId },
  });
  return response.data.mainChat;
};

export const useGetMessagesQuery = () => {
  const id = useUserInfoStore((state) => state.id);
  const channelId = useUserInfoStore((state) => state.channelId);
  return useQuery({
    queryKey: ["getMessageList"],
    queryFn: () => getMessages(id, channelId),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
