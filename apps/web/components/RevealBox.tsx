import { SocketContext, useSockets } from "./Provider/SocketProvider";
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
    <div className="relative flex flex-col w-full my-8 transition-all">
      {roomStatus === "revealing" && (
        <>
          <span className="absolute m-auto text-2xl translate-x-1/2 right-1/2 -top-10">
            {average}
          </span>
          <Button onClick={estimating}>Estimate Again</Button>
        </>
      )}
      {roomStatus === "estimating" && (
        <Button disabled={!atLeastOneEstimate} onClick={reveal}>
          Reveal
        </Button>
      )}
    </div>
  );
};
