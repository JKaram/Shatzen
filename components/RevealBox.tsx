import { SocketContext, useSockets } from "./provider/SocketProvider";
import React, { useContext } from "react";
import Button from "./Button";

export const RevealBox = () => {
  const { average, roomStatus } = useContext(SocketContext);
  const { changeStatus } = useSockets();

  function reveal() {
    changeStatus("revealing");
  }

  function estimating() {
    changeStatus("estimating");
  }

  return (
    <div className="relative flex flex-col items-center my-6 transition-all">
      {roomStatus === "revealing" && (
        <>
          <span>{average}</span>
          <Button onClick={estimating}>Estimate Again</Button>
        </>
      )}
      {roomStatus === "estimating" && <Button onClick={reveal}>Reveal</Button>}
    </div>
  );
};
