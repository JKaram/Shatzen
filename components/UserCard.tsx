import { numberToNewValue } from "../types/constants";
import { SocketContext } from "./provider/SocketProvider";
import { User } from "../types/aliases";
import { userEstimate } from "../utils/helpers";
import React, { useContext } from "react";

type Props = {
  user: User;
  oddManOut: boolean;
};

const shameEmojis = ["🤥", "🤮", "🙊", "💩"];

export const UserCard = ({ user, oddManOut }: Props) => {
  const { roomStatus, estimates, user: appUser } = useContext(SocketContext);
  const estimate = userEstimate(user.id, estimates);

  const randomIndex = () => Math.floor(Math.random() * shameEmojis.length);

  return (
    <div className="flex flex-col items-center">
      {roomStatus === "revealing" && oddManOut && shameEmojis[randomIndex()]}
      <div
        className={`w-10 h-16 rounded flex justify-center items-center ${
          estimate !== false ? "bg-cyan-600" : "shadow-inner"
        } ${appUser?.id === user.id && estimate !== false ? "bg-green-200" : ""}`}
      >
        <span className={`${roomStatus === "estimating" ? "hidden" : ""}`}>
          {estimate ? numberToNewValue(estimate) || estimate : null}
        </span>
      </div>
      <span title={`User ID: ${user.id}`}>{appUser?.id === user.id ? "Me" : user.name}</span>
    </div>
  );
};
