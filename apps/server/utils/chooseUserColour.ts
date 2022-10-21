const USER_COLOURS = [
  "#F0D95F",
  "#D8FFCA",
  "#CAFCFF",
  "#F09C5F",
  "#FFCAEA",
  "#CBCAFF",
  "#FF5B5B",
  "#5B93FF",
] as const;

export type UserColour = typeof USER_COLOURS[number];

export const chooseUserColour = () => {
  const randomIndex = Math.floor(Math.random() * USER_COLOURS.length);
  return USER_COLOURS[randomIndex];
};
