export type User = {
  colour: UserColour;
  estimate: Estimate;
  id: string;
  name: string;
  room: string;
};

export type Estimate = number | null;
export type Average = number | null;

export type Status = "estimating" | "revealing";

export type Room = {
  average: number | null;
  id: string;
  status: Status;
};

export const USER_COLOURS = [
  "#F0D95F",
  "#D8FFCA",
  "#CAFCFF",
  "#F09C5F",
  "#FFCAEA",
  "#CBCAFF",
  "#FF5B5B",
  "#5B93FF",
] as const;
type UserColour = typeof USER_COLOURS[number];
