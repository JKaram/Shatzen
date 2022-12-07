import { useState } from "react";
import { useSockets } from "../providers/SocketProvider";
import { UserStorage } from "../types/aliases";
import { USER_COLOURS } from "../types/constants";
import useLocalStorage from "./useLocalStorage";

export const useCardBuilder = () => {
  const { user } = useSockets();
  const [previous] = useLocalStorage<UserStorage | undefined>(
    "user",
    undefined
  );
  const [selected, setSelected] = useState({
    colour: previous?.colour || user?.colour || USER_COLOURS[0],
    pattern: previous?.pattern || user?.pattern || -1,
    name: "",
  });

  return { selected, setSelected };
};
