import { useState } from "react";
import { useSockets } from "../components/provider/SocketProvider";
import { USER_COLOURS } from "../types/constants";
import useLocalStorage from "./useLocalStorage";

export const useCardBuilder = () => {
  const { user } = useSockets();
  const [previous] = useLocalStorage("user", undefined);
  const [selected, setSelected] = useState({
    colour: previous?.colour || user?.colour || USER_COLOURS[0],
    pattern: previous?.pattern || user?.pattern || -1,
  });

  return { selected, setSelected };
};
