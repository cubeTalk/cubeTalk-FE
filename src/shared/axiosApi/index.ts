import { ChatRoomUrl } from "./lib/api.config"
import { instance as axios } from "./model/axiosInstance"

export const createChatRoom = () => {
  axios.post(ChatRoomUrl(), )
}