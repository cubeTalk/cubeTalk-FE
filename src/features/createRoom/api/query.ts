import { useMutation } from "@tanstack/react-query";
import { axios } from "../../../shared/axiosApi";
import { DebateRoomUrl } from "../../../shared/axiosApi/lib/api.type";
import { DebateRoomBase } from "../../../shared/type";
import { useNavigate } from "react-router-dom";
import { useRoomInfoStore } from "../../../entities/user";
import { useContext } from "react";
import { AlertContext } from "../../../entities/alertDialog/model/context";
import { AxiosResponse } from "axios";

type PostDebateRoomRequest = DebateRoomBase;
type PostDebateRoomResponse = {
  id: string; // 토론방 ID
  memberId: string; // 사용자 UUID
};

export const CreateRoomKey = "/createRoom"

export const useCreateRoomQuery = () => {
  const updateRoomInfo = useRoomInfoStore((state) => state.updateInfo);
  const postCreateRoom = (data: PostDebateRoomRequest): Promise<AxiosResponse<PostDebateRoomResponse>> => 
    axios.post(DebateRoomUrl(), data);
  const { alert } = useContext(AlertContext);
  const navigate = useNavigate();
  return useMutation({
    mutationKey: [CreateRoomKey],
    mutationFn: (data: PostDebateRoomRequest) => postCreateRoom(data),
    onSuccess: (data: AxiosResponse<PostDebateRoomResponse>) => {
      updateRoomInfo(data.data);
      navigate(`/debate/${data.data.id}`);
    },
    onError: async () => {
      await alert("방생성에 실패했습니다. 나중에 다시 시도해주세요", "확인");
    }
  });
};
