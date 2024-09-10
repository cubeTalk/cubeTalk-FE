import { useMutation } from "@tanstack/react-query";
import { axios } from "../../../shared/axiosApi";
import { DebateRoomUrl } from "../../../shared/axiosApi/lib/api.type";
import { DebateRoomBase } from "../../../shared/type";
import { redirect } from "react-router-dom";
import { useRoomInfoStore } from "../../../entities/user";

type PostDebateRoomRequest = DebateRoomBase;
type PostDebateRoomResponse = {
  id: string; // 토론방 ID
  memberId: string; // 사용자 UUID
};

export const CreateRoomKey = "/createRoom"

export const useCreateRoomQuery = () => {
  const updateRoomInfo = useRoomInfoStore((state) => state.updateInfo);
  const postCreateRoom = (data: PostDebateRoomRequest): Promise<PostDebateRoomResponse> => 
    axios.post(DebateRoomUrl(), data);

  return useMutation({
    mutationKey: [CreateRoomKey],
    mutationFn: (data: PostDebateRoomRequest) => postCreateRoom(data),
    onSuccess: (data: PostDebateRoomResponse) => {
      updateRoomInfo(data);
      redirect(`/debate/${data.id}`);
    },
    onError: () => {
      console.error("fail");
    }
  });
};
