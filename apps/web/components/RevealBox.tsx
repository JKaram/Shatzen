import { SocketContext, useSockets } from "./provider/SocketProvider";
import React, { useContext } from "react";
import Button from "./Button";
import { motion } from "framer-motion";

export const RevealBox = () => {
  const { calculations, roomStatus, users } = useContext(SocketContext);
  const { changeStatus } = useSockets();
  const atLeastOneEstimate = users.filter((user) => user.estimate).length > 0;

  function reveal() {
    changeStatus("revealing");
  }

  function estimating() {
    changeStatus("estimating");
  }

  return (
    <div className="flex  flex-col items-center justify-center w-full my-8 ">
      {roomStatus === "revealing" && (
        <motion.div
          className="flex gap-6 items-center justify-center w-full"
          initial="initial"
          animate="animate"
          variants={{
            initial: {
              height: 0,
            },
            animate: {
              height: 100,
            },
          }}
        >
          <div className="flex flex-col justify-center items-center">
            <span className="">Average</span>
            <span className="text-4xl  font-bold">
              {Math.round(calculations.average * 100) / 100}
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="">Mode</span>
            <span className="flex text-4xl text-center font-bold">
              {calculations.mode.map((mode, index) => (
                <p key={index}>
                  {mode}
                  {index < calculations.mode.length - 1 ? ", " : ""}
                </p>
              ))}
            </span>
          </div>
        </motion.div>
      )}

      {roomStatus === "estimating" ? (
        <Button
          className="w-32"
          disabled={!atLeastOneEstimate}
          onClick={reveal}
        >
          Reveal
        </Button>
      ) : (
        <Button className="w-32" onClick={estimating}>
          Estimate Again
        </Button>
      )}
    </div>
  );
};
