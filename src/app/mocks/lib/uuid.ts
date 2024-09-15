export const generateUUID = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0;
    const value = char === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
};

export const generateUserID = (): string => {
  return "user-" + Math.random().toString(10).substring(0, 9);
};

export const generateChannelID = (): string => {
  return "channel-" + Math.random().toString(10).substring(0, 9);
};
