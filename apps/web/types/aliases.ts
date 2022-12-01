import { USER_COLOURS, POSSIBLE_ESTIMATES } from "./constants";

export type User = {
  id: string;
  name: string;
  colour: string;
  pattern: number;
  estimate: Estimate;
};

export type PossibleEstimate = typeof POSSIBLE_ESTIMATES[number];
export type PossibleEstimates = PossibleEstimate[];

export type AppStatus = "loading" | "ready";
export type Estimate = number | null;
export type Average = number | null;
export type Calculations = {
  average: Average;
  mode: number[] | null;
};
export type Status = "estimating" | "revealing";
export type UserColor = typeof USER_COLOURS[number];

export type UserPayload = { name: string; colour: string; pattern: number };

export type SocketIncomingEvents = {
  userJoin: (args: {
    user: UserPayload;
    room: string;
    config: Config | undefined;
  }) => void;
  changeStatus: (args: { status: Status }) => void;
  removeUser: () => void;
  estimate: (args: { estimate: number }) => void;
  updateConfig: (args: Config) => void;
};

export type SocketOutgoingEvents = {
  users: (users: Record<string, User>) => void;
  roomStatus: (status: Status) => void;
  average: (average: number) => void;
  firstConnect: (roomId: string) => void;
};

type KeyValue<T> = {
  [P in keyof T]: {
    key: P;
    value: T[P];
  };
}[keyof T];

export type Config = {
  possibleEstimates: PossibleEstimates;
};

export type RoomOption = KeyValue<Config>;
