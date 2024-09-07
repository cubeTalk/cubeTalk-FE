const httpUrl = import.meta.env.VITE_http;
const socketUrl = import.meta.env.VITE_SOCKET;

// socket
export const ConnectUrl = () => `${socketUrl}ws`;
// 채팅 전송, 수신
export const SubChatUrl = (channelId : string) => `${socketUrl}topic/${channelId}`;
export const PubChatUrl = (roomId : string) => `${socketUrl}pub/message/${roomId}`;
// 토론 진행
export const SubProgressUrl = (roomId : string) => `${socketUrl}pub/message/${roomId}`;
export const PubVoteUrl = (roomId : string) => `${socketUrl}pub/vote/${roomId}`;


// http
// 메세지 목록
export const MessagesUrl = () => `${httpUrl}chat/messages`;
// 토론 참가
export const JoinChatUrl = (roomId : string) => `${httpUrl}chat/${roomId}/participants`;
// 팀 변경
export const ChangeTeamUrl = (roomId : string, userId: string) => `${httpUrl}chat/${roomId}/role/${userId}`;
// 토론방 생성, 목록
export const ChatRoomUrl = () => `${httpUrl}chat`;
// 토론방 설정
export const ChatRoomSettingUrl = (roomId : string) => `${httpUrl}chat/${roomId}/setting`;
// 토론 시작
export const ChatStartUrl = (roomId : string) => `${httpUrl}chat/${roomId}/actions`;
// 소켓 에러
export const ErrorUrl = (roomId : string) => `${httpUrl}chat/${roomId}/subscription/error`;