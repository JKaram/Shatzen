import React, { useContext } from "react";
import { SocketContext } from "./provider/SocketProvider";
import { UserCard } from "./UserCard";

export const EstimatesBox = () => {
  const { users } = useContext(SocketContext);

  return (
    <div className="flex justify-center space-x-4 items-center">
      {users.map((user) => {
        return <UserCard key={user.id} user={user} />;
      })}
    </div>
  );
};
