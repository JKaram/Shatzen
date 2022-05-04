import { Estimate, Status, User } from "../../types/aliases";
import { io } from "socket.io-client";
import React, { createContext, useContext, useEffect, useState } from "react";

type Values = {
  users: User[];
  estimates: Estimate[];
  average: undefined | number;
  user: User | undefined;
  roomStatus: Status | undefined;
  room: string;
};
const initalValues: Values = {
  users: [],
  estimates: [],
  average: undefined,
  user: undefined,
  roomStatus: "estimating",
  room: "",
};

export const SocketContext = createContext<Values>(initalValues);

type Props = {
  children: React.ReactNode;
};

const socket = io(`${process.env.NEXT_PUBLIC_SERVER}`);

export default function AppProvider(props: Props) {
  const { children } = props;
  const [users, setUsers] = useState<User[]>([]);
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [average, setAverage] = useState<number | undefined>(undefined);
  const [status, setStatus] = useState<Status>("estimating");
  const [name, setName] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");

  useEffect(() => {
    // Return list of users. Sort users by id, add current user to front
    socket.on("users", (users: User[]) => {
      if (!users) return;
      const sortedUsers = users.filter((estimate) => estimate.id !== socket.id).sort((a, b) => (a.id === b.id ? 1 : 0));
      const currentUser = users.find((user) => user.id === socket.id);
      if (currentUser) sortedUsers.unshift(currentUser);
      setUsers(sortedUsers);
      setName(currentUser?.name || "");
    });

    socket.on("join_room", (room) => setRoomName(room));

    socket.on("estimates", (estimates: Estimate[]) => setEstimates(estimates));

    // Check if average is returned. If yes; check if whole number, if not round to first decimal point
    socket.on("reveal", (average: number | null) => {
      if (!average) return setAverage(undefined);
      const roundAverage = !!(average % 1) ? parseFloat(average.toFixed(1)) : average;
      setAverage(roundAverage);
    });

    socket.on("status", (status: Status) => setStatus(status));
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        users: users,
        estimates: estimates,
        average: average,
        user: { id: socket.id, name: name },
        roomStatus: status,
        room: roomName,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const useSockets = () => {
  const addUser = (name: string, roomName: string) => socket.emit("add_user", [name, roomName]);
  const addEstimate = (estimate: number) => socket.emit("add_estimate", estimate);
  const disconnect = () => socket.emit("remove");
  const reveal = () => socket.emit("change_room_status", "revealing");
  const estimateMode = () => socket.emit("change_room_status", "estimating");
  const reset = () => socket.emit("reset");

  return { addUser, disconnect, addEstimate, reveal, estimateMode, reset };
};
