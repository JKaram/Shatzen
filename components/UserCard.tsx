import React, { useContext } from "react";
import { User } from "../types/aliases";
import { userEstimate } from "../utils/helpers";
import { SocketContext } from "./provider/SocketProvider";

type Props = {
  user: User;
};

export const UserCard = ({ user }: Props) => {
  const { status, estimates, user: appUser } = useContext(SocketContext);
  const estimate = userEstimate(user.id, estimates);

  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-10 h-16 rounded flex justify-center items-center ${
          estimate !== false ? "bg-cyan-600" : "shadow-inner"
        } ${appUser?.id === user.id && estimate !== false ? "bg-green-200" : ""}`}
      >
        <span className={`${status === "estimating" ? "hidden" : ""}`}>{estimate ? estimate : null}</span>
      </div>
      <span title={`User ID: ${user.id}`}>{appUser?.id === user.id ? "Me" : user.name}</span>
    </div>
  );
};
