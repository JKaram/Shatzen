import { USER_COLOURS, POSSIBLE_ESTIMATES } from "./constants";

export type User = {
  id: string;
  name: string;
  colour: string;
  estimate: Estimate;
};

export type PossibleEstimate = typeof POSSIBLE_ESTIMATES[number];
export type PossibleEstimates = PossibleEstimate[];

export type AppStatus = "loading" | "ready";
export type Estimate = number | null;
export type Average = number | null;
export type Status = "estimating" | "revealing";
export type UserColor = typeof USER_COLOURS[number];

export type SocketIncomingEvents = {
  userJoin: (args: { name: string; room: string }) => void;
  changeStatus: (args: { status: Status }) => void;
  removeUser: () => void;
  estimate: (args: { estimate: number }) => void;
  updateRoomOptions: (args: RoomOptions) => void;
};

export type SocketOutgoingEvents = {
  users: (users: Record<string, User>) => void;
  roomStatus: (status: Status) => void;
  average: (average: number) => void;
  firstConnect: (roomId: string) => void;
};

export type RoomOptions = {
  possibleEstimates: PossibleEstimates;
};
