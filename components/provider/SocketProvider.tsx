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
    socket.on("users", (users: User[] | undefined) => {
      if (!users) return;
      setUsers(users);
      const userName = users.find((user) => user.id === socket.id)?.name;
      setName(userName || "");
    });
    socket.on("estimates", (estimates: Estimate[]) => setEstimates(estimates));
    socket.on("reveal", (average: number) => setAverage(average));
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
