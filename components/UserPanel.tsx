import React, { useContext } from "react";
import { possibleEstimates } from "../types/constants";
import { userEstimate } from "../utils/helpers";
import { EstimateCard } from "./EstimateCard";
import { SocketContext, useSockets } from "./provider/SocketProvider";

export const UserPanel = () => {
  const { estimates, user } = useContext(SocketContext);
  const { addEstimate } = useSockets();

  if (!user) return <p>loading</p>;

  return (
    <div className="flex flex-col items-center">
      <h1 title={`Socket id : ${user.id}`}>{user.name}</h1>
      <div className="flex flex-col items-center">
        <span>Make an estimate</span>
        <div className="flex flex-wrap my-2 space-x-1">
          {possibleEstimates.map((estimate) => {
            const hasEstimated = userEstimate(user.id, estimates);
            const whichNumber = hasEstimated !== false ? hasEstimated : undefined;
            return (
              <EstimateCard isSelected={whichNumber === estimate} onClick={() => addEstimate(estimate)} key={estimate}>
                {estimate}
              </EstimateCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};
