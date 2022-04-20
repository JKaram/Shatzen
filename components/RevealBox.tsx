import React, { useContext } from "react";
import { SocketContext, useSockets } from "./provider/SocketProvider";

export const RevealBox = () => {
  const { estimates, average, status } = useContext(SocketContext);
  const { reveal, estimateMode } = useSockets();

  return (
    <div className="flex flex-col items-center my-6">
      {status === "estimating" ? (
        <button disabled={estimates.length === 0} className="border-2 disabled:opacity-50" onClick={reveal}>
          Reveal
        </button>
      ) : (
        <>
          <h1 className="text-xl">{average}</h1>
          <span className="text-xs text-gray-600 cursor-pointer hover:text-black" onClick={estimateMode}>
            Estimate again
          </span>
        </>
      )}
    </div>
  );
};
