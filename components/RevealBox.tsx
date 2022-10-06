import { SocketContext, useSockets } from "./provider/SocketProvider";
import React, { useContext } from "react";
import Button from "./Button";

export const RevealBox = () => {
  const { average, roomStatus, users } = useContext(SocketContext);
  const { changeStatus } = useSockets();

  const atLeastOneEstimate = users.filter((user) => user.estimate).length > 0;

  function reveal() {
    changeStatus("revealing");
  }

  function estimating() {
    changeStatus("estimating");
  }

  return (
    <div className="relative flex flex-col items-center my-8 transition-all">
      {roomStatus === "revealing" && (
        <div className="flex flex-col items-center">
          <span className="absolute m-auto text-2xl -top-10">{average}</span>
          <Button onClick={estimating}>Estimate Again</Button>
        </div>
      )}
      {roomStatus === "estimating" && (
        <Button disabled={!atLeastOneEstimate} onClick={reveal}>
          Reveal
        </Button>
      )}
    </div>
  );
};
