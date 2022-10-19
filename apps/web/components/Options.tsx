import { useSockets } from "./provider/SocketProvider";
import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";



export const Options = () => {
  const [, setName] = useLocalStorage("name", "");
  const { reset } = useSockets();


  return (
    <select name="options" id="options">
      <option value="" disabled selected>
        🧯 Break in case of emergency
      </option>
      <option
        value="reset-user"
        onChange={() => {
          setName("");
          window.location.reload();
        }}
      >
        🥸 Edit name
      </option>
      <option
        value="reset-all"
        onChange={() => {
          setName("");
          reset();
          window.location.reload();
        }}
      >
        💀 Reset All
      </option>
      <option value="wake-up-server">😴 Wake Server</option>
    </select>
  );
};
