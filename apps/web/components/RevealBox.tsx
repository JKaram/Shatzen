import { SocketContext, useSockets } from "./provider/SocketProvider";
import React, { useContext } from "react";
import Button from "./Button";
import { AnimatePresence, motion } from "framer-motion";

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
    <div className="flex flex-col items-center justify-center w-full my-8">
      <AnimatePresence>
        {roomStatus === "revealing" && (
          <motion.div
            className="inline-flex gap-4 mb-4 overflow-hidden "
            initial="initial"
            animate="animate"
            key="calculations"
            transition={{ ease: "easeInOut" }}
            variants={{
              initial: {
                height: 0,
              },
              animate: {
                height: "auto",
              },
            }}
            exit={{ height: 0, transition: { duration: 0.1 } }}
          >
            <div className="flex flex-col items-center">
              <span className="">Average</span>
              <span className="text-4xl font-bold">
                {Math.round(calculations.average * 10) / 10}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="">Mode</span>
              <span className="flex text-4xl font-bold text-center">
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
      </AnimatePresence>

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
