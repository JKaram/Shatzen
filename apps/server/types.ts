import { UserColour } from "./utils/chooseUserColour";

export type UserPayload = { name: string; colour: string; pattern: number };

export type SocketIncomingEvents = {
  changeStatus: (args: { status: Status }) => void;
  estimate: (args: { estimate: number }) => void;
  removeUser: () => void;
  userJoin: (args: {
    user: UserPayload;
    room: string;
    config: Config | undefined;
  }) => void;
  updateConfig: (args: { possibleEstimates: number[] }) => void;
};

export type SocketOutgoingEvents = {
  calculations: (calculations: Calculations) => void;
  firstConnect: (roomId: string) => void;
  roomStatus: (status: Status) => void;
  users: (users: Record<string, User>) => void;
  config: (config: { possibleEstimates: number[] }) => void;
};

export type EmitFunction = <T extends keyof SocketOutgoingEvents>(
  message: T,
  data: Parameters<SocketOutgoingEvents[T]>,
  toSelf?: boolean
) => void;

export type Estimate = number | null;
export type Average = number | null;
export type Status = "estimating" | "revealing";

export type User = {
  colour: string;
  pattern: number;
  estimate: Estimate;
  id: string;
  name: string;
};

export type Calculations = {
  average: number | null;
  mode: number[] | null;
};

export type Room = {
  calculations: Calculations;
  id: string;
  status: Status;
  possibleEstimates: number[];
};

export type Config = {
  possibleEstimates: number[];
};
