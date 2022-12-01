import { useState } from "react";
import { useSockets } from "../components/provider/SocketProvider";
import { USER_COLOURS } from "../types/constants";

export const useCardBuilder = () => {
  const { user } = useSockets();
  const [selected, setSelected] = useState({
    colour: user?.colour || USER_COLOURS[0],
    pattern: user?.pattern || -1,
  });

  return { selected, setSelected };
};
