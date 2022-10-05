import { USER_COLOURS } from "./constants";

export type User = {
  colour: string;
  estimate: Estimate;
  id: string;
  name: string;
  room: string;
};

export type Status = "estimating" | "revealing";

export type AppStatus = "loading" | "ready";

export type UserColor = typeof USER_COLOURS[number];

export type Estimate = number | null;
export type Average = number | null;
