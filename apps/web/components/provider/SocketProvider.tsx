import {
  Calculations,
  Config,
  PossibleEstimates,
  SocketIncomingEvents,
  SocketOutgoingEvents,
  Status,
  User,
  UserCustoms,
  UserPayload,
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
import useLocalStorage from "../../hooks/useLocalStorage";

type Values = {
  calculations: Calculations;
  changeStatus: (status: string) => void;
  disconnect: () => void;
  estimate: (estimate: number) => void;
  estimateOptions: PossibleEstimates;
  removeUser: () => void;
  roomStatus: Status;
  setRoomId: Dispatch<SetStateAction<string>>;
  updateRoomOptions: (args: Config) => void;
  user: User | undefined;
  userJoin: (user: UserPayload, room: string) => void;
  users: User[];
};
const initialValues: Values = {
  calculations: {
    average: null,
    mode: null,
  },
  changeStatus: () => undefined,
  disconnect: () => undefined,
  estimate: () => undefined,
  estimateOptions: [],
  removeUser: () => undefined,
  roomStatus: "estimating",
  setRoomId: () => undefined,
  updateRoomOptions: () => undefined,
  user: undefined,
  userJoin: () => undefined,
  users: [],
};

export const SocketContext = createContext<Values>(initialValues);

type Props = {
  children: React.ReactNode;
};

export default function AppProvider({ children }: Props) {
  const router = useRouter();
  const [config, setConfig] = useLocalStorage<Config | undefined>(
    "config",
    undefined
  );
  const [, setUserStorage] = useLocalStorage<UserCustoms | undefined>(
    "user",
    undefined
  );

  const [socket, setSocket] =
    useState<Socket<SocketOutgoingEvents, SocketIncomingEvents>>();
  const [calculations, setCalculations] = useState<Calculations>({
    average: null,
    mode: null,
  });
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
      if (currentUser) sortedUsers.unshift({ ...currentUser });
      setUser({ ...currentUser });
      setUserStorage({
        colour: currentUser.colour,
        pattern: currentUser.pattern,
      });
      setUsers(sortedUsers);
    });

    newSocket.on("firstConnect", (roomId) => router.push(`/room/${roomId}`));

    newSocket.on("calculations", (updatedCalculations: Calculations) => {
      setCalculations((prev) => ({ ...prev, ...updatedCalculations }));
    });
    newSocket.on("roomStatus", (status: Status) => setStatus(status));

    newSocket.on("config", (config: Config) => {
      setRoomEstimateOptions(config.possibleEstimates.sort((a, b) => a - b));
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

  const updateRoomOptions = (config: Config) => {
    setConfig(config);
    socket.emit("updateConfig", config);
  };

  const userJoin = (user: UserPayload, room: string) => {
    socket.emit("userJoin", { user, room, config });
  };

  return (
    <SocketContext.Provider
      value={{
        calculations,
        changeStatus,
        disconnect,
        estimate,
        estimateOptions: roomEstimateOptions,
        removeUser,
        roomStatus: status,
        setRoomId,
        updateRoomOptions,
        user,
        userJoin,
        users,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const useSockets = () => React.useContext(SocketContext);
