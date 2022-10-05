import { Average, Status, User } from "../../types/aliases";
import { io } from "socket.io-client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

type Values = {
  average: Average;
  roomStatus: Status;
  user: User | undefined;
  users: User[];
};
const initalValues: Values = {
  average: null,
  roomStatus: "estimating",
  user: undefined,
  users: [],
};

export const SocketContext = createContext<Values>(initalValues);

type Props = {
  children: React.ReactNode;
};

const socket = io(`${process.env.NEXT_PUBLIC_SERVER}`);

export default function AppProvider(props: Props) {
  const { children } = props;
  const router = useRouter();
  const [average, setAverage] = useState<Average>(null);
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

    socket.on("firstConnect", (roomId) => router.push(`/room/${roomId}`));

    socket.on("average", (average: Average) => setAverage(average));
    socket.on("roomStatus", (status: Status) => setStatus(status));
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        average: average,
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
