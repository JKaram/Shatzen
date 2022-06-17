import { SocketContext, useSockets } from "./provider/SocketProvider";
import React, { useContext, useEffect } from "react";
import { useReward } from "react-rewards";

export const RevealBox = () => {
  const { estimates, average, roomStatus } = useContext(SocketContext);
  const { reveal, estimateMode } = useSockets();
  const { reward } = useReward("rewardId", "confetti");

  const actualEstimates = estimates.filter((user) => user.estimate > 0);

  const areAllEstimatesTheSame = () =>
    actualEstimates.length > 2 && actualEstimates.every((user) => user.estimate === estimates[0].estimate);

  useEffect(() => {
    if (roomStatus === "revealing" && areAllEstimatesTheSame()) {
      reward();
    }
  }, [roomStatus]);

  return (
    <div className="relative flex flex-col items-center my-6">
      <span id="rewardId" />
      {roomStatus === "estimating" ? (
        <div>
          <button disabled={estimates.length === 0} className="border-2 disabled:opacity-50" onClick={() => reveal()}>
            Reveal
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-xl">{average}</h1>
          <span className="text-xs text-gray-600 cursor-pointer hover:text-black" onClick={() => estimateMode()}>
            Estimate again
          </span>
        </>
      )}
    </div>
  );
};
