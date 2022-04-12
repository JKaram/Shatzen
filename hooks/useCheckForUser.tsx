import { useEffect, useState } from "react";
import { useSockets } from "../components/provider/SocketProvider";
import useLocalStorage from "./useLocalStorage";

export const useCheckUser = () => {
  const [name] = useLocalStorage("name", "");
  const { addUser } = useSockets();
  const [userExsits, setUserExsits] = useState(!!name);

  useEffect(() => {
    if (name) {
      addUser(name);
      setUserExsits(true);
    } else {
      setUserExsits(false);
    }
  }, []);

  return userExsits;
};
