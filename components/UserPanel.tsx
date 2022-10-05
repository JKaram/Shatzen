import classNames from "classnames";
import React, { useContext } from "react";
import { numberToNewValue, possibleEstimates } from "../types/constants";
import { EstimateCard } from "./EstimateCard";
import { SocketContext, useSockets } from "./provider/SocketProvider";

export const UserPanel = () => {
  const { user, roomStatus } = useContext(SocketContext);
  const { estimate } = useSockets();

  if (!user) return <p>loading</p>;

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        <div className={classNames("flex flex-wrap my-2 space-x-1")}>
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
      </div>
    </div>
  );
};
