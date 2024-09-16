export const calculateRemainingTime = (chatDuration: string, createdAt: string): string => {
  const createdTime = new Date(createdAt).getTime();
  const currentTime = Date.now();
  
  const elapsedMinutes = Math.floor((currentTime - createdTime) / (1000 * 60));

  const remainingMinutes = Number(chatDuration) - elapsedMinutes;

  // Ensure it doesn't go negative
  return remainingMinutes > 2 ? `${remainingMinutes}분 남음` : "곧 끝남";
};