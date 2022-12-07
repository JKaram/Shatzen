import { useState } from "react";
import { useSockets } from "../providers/SocketProvider";
import { UserStorage } from "../types/aliases";
import { USER_CARD_PATTERNS, USER_COLOURS } from "../types/constants";

import useLocalStorage from "./useLocalStorage";

export const useCardBuilder = () => {
  const { user } = useSockets();
  const [previous] = useLocalStorage<UserStorage | undefined>(
    "user",
    undefined
  );
  const [selected, setSelected] = useState({
    colour: previous?.colour || user?.colour || USER_COLOURS[Math.floor(Math.random() * USER_COLOURS.length)],
    pattern: previous?.pattern || user?.pattern || Math.floor(Math.random() * (USER_CARD_PATTERNS.length + 1)) - 1,
    name: "",
  });

  return { selected, setSelected };
};
