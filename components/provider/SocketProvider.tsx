import { Status, User } from "../../types/aliases";
import { io } from "socket.io-client";
import React, { createContext, useContext, useEffect, useState } from "react";

type Values = {
  users: User[];
  user: User | undefined;
  roomStatus: Status;
};
const initalValues: Values = {
  users: [],
  user: undefined,
  roomStatus: "estimating",
};

export const SocketContext = createContext<Values>(initalValues);

type Props = {
  children: React.ReactNode;
};

const socket = io(`${process.env.NEXT_PUBLIC_SERVER}`);

export default function AppProvider(props: Props) {
  const { children } = props;
  const [status, setStatus] = useState<Status>("estimating");
  const [user, setUser] = useState<User>();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    socket.on("users", (users: User[]) => {
      const sortedUsers = users.filter((estimate) => estimate.id !== socket.id).sort((a, b) => (a.id === b.id ? 1 : 0));
      const currentUser = users.find((user) => user.id === socket.id);
      if (currentUser) sortedUsers.unshift(currentUser);
      setUser(currentUser);
      setUsers(sortedUsers);
    });

    socket.on("status", ({ status }) => setStatus(status));
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        roomStatus: status,
        user: user,
        users: users,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const useSockets = () => {
  const changeStatus = (status: string) => socket.emit("changeStatus", { status });
  const disconnect = () => socket.disconnect();
  const estimate = (estimate: number) => socket.emit("estimate", { estimate });
  const reset = () => socket.emit("reset");
  const userJoin = (name: string, room: string) => socket.emit("userJoin", { name, room });

  return { userJoin, disconnect, estimate, reset, changeStatus };
};
