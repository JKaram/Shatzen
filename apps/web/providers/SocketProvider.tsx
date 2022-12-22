import {
  Calculations,
  Config,
  SocketIncomingEvents,
  SocketOutgoingEvents,
  Status,
  User,
  UserStorage,
  UserPayload,
} from "../types/aliases";
import { io, Socket } from "socket.io-client";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import useLocalStorage from "../hooks/useLocalStorage";
import useAppReducer from "../hooks/useAppReducer";
import { AppState, APP_STATE } from "../reducers/appReducer";

type Values = {
  changeStatus: (status: string) => void;
  disconnect: () => void;
  estimate: (estimate: number) => void;
  removeUser: () => void;
  setRoomId: Dispatch<SetStateAction<string>>;
  updateRoomOptions: (args: Config) => void;
  userJoin: (user: UserPayload, room: string) => void;
} & AppState;

const initialValues: Values = {
  changeStatus: () => undefined,
  disconnect: () => undefined,
  estimate: () => undefined,
  removeUser: () => undefined,
  setRoomId: () => undefined,
  updateRoomOptions: () => undefined,
  userJoin: () => undefined,
  ...APP_STATE,
};

export const SocketContext = createContext<Values>(initialValues);

type Props = {
  children: React.ReactNode;
};

export default function AppProvider({ children }: Props) {
  const router = useRouter();
  const [appState, appDispatch] = useAppReducer();
  const { calculations, roomStatus, roomId, user, users, estimateOptions } =
    appState;

  const [config, setConfig] = useLocalStorage<Config | undefined>(
    "config",
    undefined
  );

  const [, setUserStorage] = useLocalStorage<UserStorage | undefined>(
    "user",
    undefined
  );

  const [socket, setSocket] =
    useState<Socket<SocketOutgoingEvents, SocketIncomingEvents>>();

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

      appDispatch({ type: "UPDATE_USER", payload: currentUser });

      setUserStorage({
        colour: currentUser.colour,
        pattern: currentUser.pattern,
        name: currentUser.name,
      });

      appDispatch({ type: "UPDATE_USERS", payload: sortedUsers });
    });

    newSocket.on("firstConnect", (roomId) => router.push(`/room/${roomId}`));

    newSocket.on("calculations", (updatedCalculations: Calculations) => {
      appDispatch({
        type: "UPDATE_CALCULATIONS",
        payload: updatedCalculations,
      });
    });
    newSocket.on("roomStatus", (status: Status) => {
      appDispatch({ type: "UPDATE_STATUS", payload: status });
    });

    newSocket.on("config", (config: Config) => {
      appDispatch({
        type: "UPDATE_ESTIMATE_OPTIONS",
        payload: config.possibleEstimates.sort((a, b) => a - b),
      });
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
    appDispatch({ type: "RESET" });
  };
  const estimate = (estimate: number) => {
    socket.emit("estimate", { estimate });
  };
  const removeUser = () => {
    socket.emit("removeUser");
    appDispatch({ type: "SET_ROOM_ID", payload: null });
  };

  const updateRoomOptions = (config: Config) => {
    setConfig(config);
    socket.emit("updateConfig", config);
  };

  const userJoin = async (user: UserPayload, room: string) => {
    socket.emit("userJoin", { user, room, config });
  };

  const setRoomId = (roomId: string) => {
    appDispatch({ type: "SET_ROOM_ID", payload: roomId });
  };

  return (
    <SocketContext.Provider
      value={{
        calculations,
        changeStatus,
        disconnect,
        estimate,
        estimateOptions,
        removeUser,
        roomId,
        roomStatus,
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
