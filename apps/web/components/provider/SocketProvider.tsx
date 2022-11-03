import {
  Average,
  PossibleEstimates,
  RoomOptions,
  SocketIncomingEvents,
  SocketOutgoingEvents,
  Status,
  User,
} from "../../types/aliases";
import { io, Socket } from "socket.io-client";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";

type Values = {
  average: Average;
  changeStatus: (status: string) => void;
  disconnect: () => void;
  estimate: (estimate: number) => void;
  estimateOptions: PossibleEstimates;
  removeUser: () => void;
  reset: () => void;
  roomStatus: Status;
  setRoomId: Dispatch<SetStateAction<string>>;
  updateRoomOptions: (args: RoomOptions) => void;
  user: User | undefined;
  userJoin: (name: string, room: string) => void;
  users: User[];
};
const initalValues: Values = {
  average: null,
  changeStatus: () => undefined,
  disconnect: () => undefined,
  estimate: () => undefined,
  estimateOptions: [],
  removeUser: () => undefined,
  reset: () => undefined,
  roomStatus: "estimating",
  setRoomId: () => undefined,
  updateRoomOptions: () => undefined,
  user: undefined,
  userJoin: () => undefined,
  users: [],
};

export const SocketContext = createContext<Values>(initalValues);

type Props = {
  children: React.ReactNode;
};

export default function AppProvider({ children }: Props) {
  const router = useRouter();
  const [socket, setSocket] =
    useState<Socket<SocketOutgoingEvents, SocketIncomingEvents>>();
  const [average, setAverage] = useState<Average>(null);
  const [roomEstimateOptions, setRoomEstimateOptions] =
    useState<PossibleEstimates>([]);
  const [status, setStatus] = useState<Status>("estimating");
  const [user, setUser] = useState<User>();
  const [users, setUsers] = useState<User[]>([]);
  const [roomId, setRoomId] = useState<string>();

  useEffect(() => {
    if (!roomId) {
      return;
    }
    const newSocket = io(`${process.env.NEXT_PUBLIC_SERVER}`);
    newSocket.on("connect_error", (err) => console.warn("err", err));

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

    newSocket.on("average", (average: Average) => {
      setAverage(average);
    });
    newSocket.on("roomStatus", (status: Status) => setStatus(status));

    newSocket.on("roomOptions", (options: RoomOptions) => {
      setRoomEstimateOptions(options.possibleEstimates.sort((a, b) => a - b));
    });

    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [roomId]);

  const changeStatus = (status: Status) => {
    socket.emit("changeStatus", { status });
  };
  const disconnect = () => {
    socket.disconnect();
  };
  const estimate = (estimate: number) => {
    socket.emit("estimate", { estimate });
  };
  const removeUser = () => {
    socket.emit("removeUser");
    setRoomId(null);
  };

  const updateRoomOptions = (options: RoomOptions) => {
    socket.emit("updateRoomOptions", options);
  };

  const reset = () => {
    // TODO socket event doesn't exists yet
    // socket.emit("reset");
  };
  const userJoin = (name: string, room: string) => {
    socket.emit("userJoin", { name, room });
  };

  return (
    <SocketContext.Provider
      value={{
        average: average,
        changeStatus,
        disconnect,
        estimate,
        estimateOptions: roomEstimateOptions,
        removeUser,
        reset,
        roomStatus: status,
        setRoomId,
        updateRoomOptions,
        user: user,
        userJoin,
        users: users,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const useSockets = () => React.useContext(SocketContext);
