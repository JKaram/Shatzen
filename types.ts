export type User = {
  estimate: number | null;
  id: string;
  name: string;
  room: string;
};

export type Status = "estimating" | "revealing";

export type Room = {
  id: string;
  status: Status;
};
