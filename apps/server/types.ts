import { UserColour } from "./utils/chooseUserColour";

export type SocketIncomingEvents = {
  changeStatus: (args: { status: Status }) => void;
  estimate: (args: { estimate: number }) => void;
  removeUser: () => void;
  userJoin: (args: { name: string; room: string }) => void;
  updateRoomOptions: (args: { possibleEstimates: number[] }) => void;
};

export type SocketOutgoingEvents = {
  average: (average: number) => void;
  firstConnect: (roomId: string) => void;
  roomStatus: (status: Status) => void;
  users: (users: Record<string, User>) => void;
  roomOptions: (options: { possibleEstimates: number[] }) => void;
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
  colour: UserColour;
  estimate: Estimate;
  id: string;
  name: string;
};

export type Room = {
  average: number | null;
  id: string;
  status: Status;
  possibleEstimates: number[];
};

export type RoomOptions = {
  possibleEstimates: number[];
};
