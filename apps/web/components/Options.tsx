import { useSockets } from "./provider/SocketProvider";
import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const Options = () => {
  const [, setName] = useLocalStorage("name", "");
  const { reset } = useSockets();

  const handleChange = (type: string) => {
    if (type === "reset-user") {
      setName("");
      window.location.reload();
    }
  };

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
