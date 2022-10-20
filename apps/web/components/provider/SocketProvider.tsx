import { Average, Status, User } from "../../types/aliases";
import { io, Socket } from "socket.io-client";
import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

type Values = {
  average: Average;
  roomStatus: Status;
  serverReady: boolean;
  user: User | undefined;
  users: User[];
  changeStatus: (status: string) => void;
  disconnect: () => void;
  estimate: (estimate: number) => void;
  removeUser: () => void;
  reset: () => void;
  userJoin: (name: string, room: string) => void;
};
const initalValues: Values = {
  average: null,
  roomStatus: "estimating",
  serverReady: false,
  user: undefined,
  users: [],
  changeStatus: () => undefined,
  disconnect: () => undefined,
  estimate: () => undefined,
  removeUser: () => undefined,
  reset: () => undefined,
  userJoin: () => undefined,
};

export const SocketContext = createContext<Values>(initalValues);

type Props = {
  children: React.ReactNode;
};

export default function AppProvider({ children }: Props) {
  const router = useRouter();
  const [socket, setSocket] = useState<Socket>();
  const [average, setAverage] = useState<Average>(null);
  // Server goes to sleep and may take a few seconds to wake up.
  const [serverReady, setServerReady] = useState(false);
  const [status, setStatus] = useState<Status>("estimating");
  const [user, setUser] = useState<User>();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!serverReady) return;
    const newSocket = io(`${process.env.NEXT_PUBLIC_SERVER}`);
    newSocket.on("connect", () => console.log("hello"));
    newSocket.on("connect_error", (err) => console.log("err", err));

    newSocket.on("users", (users: User[]) => {
      const sortedUsers = Object.values(users)
        .filter((estimate) => estimate.id !== newSocket.id)
        .sort((a, b) => (a.id === b.id ? 1 : 0));
      const currentUser = users[newSocket.id];
      if (currentUser) sortedUsers.unshift(currentUser);
      setUser(currentUser);
      setUsers(sortedUsers);
    });

    newSocket.on("firstConnect", (roomId) => router.push(`/room/${roomId}`));

    newSocket.on("average", (average: Average) => setAverage(average));
    newSocket.on("roomStatus", (status: Status) => setStatus(status));
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [serverReady]);

  const changeStatus = (status: string) => {
    socket.emit("changeStatus", { status });
  };
  const disconnect = () => {
    socket.disconnect();
  };
  const estimate = (estimate: number) => {
    socket.emit("estimate", { estimate });
  };
  const removeUser = () => {
    socket.emit("removeUser", {});
  };
  const reset = () => {
    socket.emit("reset");
  };
  const userJoin = (name: string, room: string) => {
    socket.emit("userJoin", { name, room });
  };

  const checkHealth = async () => {
    const healthUrl = `${process.env.NEXT_PUBLIC_SERVER}/health`;
    try {
      await axios.get(healthUrl);
      setServerReady(true);
      return null;
    } catch (error) {
      let tries = 5;
      const interval = setInterval(async () => {
        try {
          await axios.get(healthUrl);
          setServerReady(true);
          clearInterval(interval);
        } catch (error) {
          console.log("error", error);
        }
        tries -= 1;
        if (tries < 1) clearInterval(interval);
      }, 2000);
      return interval;
    }
  };

  useEffect(() => {
    const interval = checkHealth();

    return () => {
      interval.then((inv) => clearInterval(inv));
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        average: average,
        roomStatus: status,
        serverReady: serverReady,
        user: user,
        users: users,
        changeStatus,
        disconnect,
        estimate,
        removeUser,
        reset,
        userJoin,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const useSockets = () => React.useContext(SocketContext);
