export type Estimate = {
  id: string;
  estimate: number;
};

export type User = {
  id: string;
  name: string;
};

export type Status = "estimating" | "revealing";

export type AppStatus = "loading" | "ready";
