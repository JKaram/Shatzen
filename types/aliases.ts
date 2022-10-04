export type User = {
  estimate: number | null;
  id: string;
  name: string;
  room: string;
};

export type Status = "estimating" | "revealing";

export type AppStatus = "loading" | "ready";
