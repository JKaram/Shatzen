import classNames from "classnames";
import React, { useContext } from "react";
import { numberToNewValue } from "../types/constants";
import { EstimateCard } from "./EstimateCard";
import { SocketContext, useSockets } from "./provider/SocketProvider";

export const UserPanel = () => {
  const { user, estimateOptions } = useContext(SocketContext);
  const { estimate } = useSockets();

  if (!user) return <p>Loading...</p>;

  return (
    <div
      className={classNames(
        "flex flex-wrap my-2 space-x-1 w-full justify-center"
      )}
    >
      {estimateOptions.map((possibleEstimate) => {
        return (
          <EstimateCard
            isSelected={user.estimate === possibleEstimate}
            onClick={() => estimate(possibleEstimate)}
            key={possibleEstimate}
          >
            {numberToNewValue(possibleEstimate) || possibleEstimate}
          </EstimateCard>
        );
      })}
    </div>
  );
};
