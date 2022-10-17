import React, { useContext } from "react";
import { SocketContext } from "./provider/SocketProvider";
import { UserCard } from "./UserCard";

export const EstimatesBox = () => {
  const { users } = useContext(SocketContext);

  // Estimates that are "?".
  // const actualEstimates = users.filter((user) => user.estimate !== null && user.estimate > 0);

  // If there are at least 3 actual estimates. Check for, and return the id of the user who guessed differently than everyone else.
  const oddManOut = () => {
    // if (actualEstimates.length < 2) return undefined;

    // let list: {
    //   [key: string | number]: string[];
    // } = {};

    // actualEstimates.forEach((user) => {
    //   const userEstimate = user.estimate;
    //   if (userEstimate in list) {
    //     list[userEstimate] = [...list[userEstimate], user.id];
    //   } else {
    //     list[userEstimate] = [user.id];
    //   }
    // });

    // const listKeys = Object.keys(list);

    // if (listKeys.length === 2) {
    //   if (list[listKeys[0]].length === 1) return list[listKeys[0]][0];
    //   if (list[listKeys[1]].length === 1) return list[listKeys[1]][0];
    // }
    return undefined;
  };

  return (
    <div className="flex flex-wrap items-center justify-center space-x-4 p-7 ">
      {users.map((user) => {
        return (
          <UserCard
            key={user.id}
            user={user}
            oddManOut={oddManOut() === user.id}
          />
        );
      })}
    </div>
  );
};
