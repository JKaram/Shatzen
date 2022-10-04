import { SocketContext, useSockets } from "./provider/SocketProvider";
import React, { useContext } from "react";

export const RevealBox = () => {
  const { users, roomStatus } = useContext(SocketContext);
  const { changeStatus } = useSockets();

  // Typescript not picking up that null values will be filtered
  const average =
    users
      .filter((user) => user.estimate !== null && user.estimate >= 0)
      .map((user) => user.estimate!)
      .reduce((p, c) => p + c, 0) / users.length;

  function reveal() {
    changeStatus("revealing");
  }

  function estimating() {
    changeStatus("estimating");
  }

  return (
    <div className="relative flex flex-col items-center my-6">
      {roomStatus === "revealing" && (
        <>
          <span>{average}</span>
          <button onClick={estimating}>Estimate</button>
        </>
      )}
      {roomStatus === "estimating" && <button onClick={reveal}>Reveal</button>}
    </div>
  );
};
