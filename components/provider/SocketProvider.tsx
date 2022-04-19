import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Estimate, Status, User } from "../../types/aliases";

type Values = {
  users: User[];
  estimates: Estimate[];
  average: undefined | number;
  user: User | undefined;
  status: Status | undefined;
};
const initalValues: Values = {
  users: [],
  estimates: [],
  average: undefined,
  user: undefined,

  status: "estimating",
};

export const SocketContext = createContext<Values>(initalValues);

type Props = {
  children: React.ReactNode;
};

const socket = io(`${process.env.NEXT_PUBLIC_SERVER}`);

export default function SocketProvider(props: Props) {
  const { children } = props;
  const [users, setUsers] = useState<User[]>([]);
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [average, setAverage] = useState<number | undefined>(undefined);
  const [status, setStatus] = useState<Status | undefined>(undefined);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    // Return list of users. Sort users by id, add current user to front
    socket.on("users", (users: User[] | undefined) => {
      if (!users) return;
      const sortedUsers = users.filter((estimate) => estimate.id !== socket.id).sort((a, b) => (a.id === b.id ? 1 : 0));
      const currentUser = users.find((user) => user.id === socket.id);
      if (currentUser) sortedUsers.unshift(currentUser);
      setUsers(sortedUsers);
      setName(currentUser?.name || "");
    });

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
        status: status,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const useSockets = () => {
  const [, setStorageName] = useLocalStorage("name", "");
  const addUser = (name: string) => {
    socket.emit("add user", name);
    setStorageName(name);
  };
  const disconnect = () => socket.emit("remove");
  const addEstimate = (estimate: number) => socket.emit("add estimate", estimate);
  const reveal = () => socket.emit("reveal");
  const estimateMode = () => socket.emit("estimate");
  const reset = () => socket.emit("reset");

  return { addUser, disconnect, addEstimate, reveal, estimateMode, reset };
};
