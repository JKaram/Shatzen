import classNames from "classnames";
import React, { useContext } from "react";
import { numberToNewValue, possibleEstimates } from "../types/constants";
import { EstimateCard } from "./EstimateCard";
import { SocketContext, useSockets } from "./provider/SocketProvider";

export const UserPanel = () => {
  const { user } = useContext(SocketContext);
  const { estimate } = useSockets();

  if (!user) return <p>Loading...</p>;

  return (
    <div className={classNames("flex flex-wrap my-2 space-x-1 w-full justify-center")}>
      {possibleEstimates.map((possibleEstimate) => {
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
