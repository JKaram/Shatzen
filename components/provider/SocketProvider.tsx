import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Estimate, User } from "../../types/aliases";

type Values = {
  users: User[];
  estimates: Estimate[];
  average: undefined | number;
  id: string | undefined;
};
const initalValues: Values = { users: [], estimates: [], average: undefined, id: undefined };

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

  useEffect(() => {
    socket.on("users", (users) => setUsers(users));
    socket.on("estimates", (estimates) => setEstimates(estimates));
    socket.on("reveal", (average) => setAverage(average));
  }, [socket]);

  return (
    <SocketContext.Provider value={{ users: users, estimates: estimates, average: average, id: socket.id }}>
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

  return { addUser, disconnect, addEstimate, reveal };
};
