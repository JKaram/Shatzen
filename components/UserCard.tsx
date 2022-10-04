import { numberToNewValue } from "../types/constants";
import { SocketContext } from "./provider/SocketProvider";
import { User } from "../types/aliases";
import React, { useContext } from "react";
import classNames from "classnames";

type Props = {
  user: User;
  oddManOut: boolean;
};

const shameEmojis = ["🤥", "🤮", "🙊", "💩"];

export const UserCard = ({ user, oddManOut }: Props) => {
  const { roomStatus, users } = useContext(SocketContext);
  const { estimate } = user;

  const randomIndex = () => Math.floor(Math.random() * shameEmojis.length);

  return (
    <div className="flex flex-col items-center">
      {roomStatus === "revealing" && oddManOut && shameEmojis[randomIndex()]}
      <div
        className={classNames(
          "w-10 h-16 rounded flex justify-center items-center",
          !!estimate ? "bg-cyan-600" : "shadow-inner",
          users[0].id === user.id && estimate !== null ? "bg-green-200" : ""
        )}
      >
        <span className={`${roomStatus === "estimating" ? "hidden" : ""}`}>
          {estimate ? numberToNewValue(estimate) || estimate : null}
        </span>
      </div>
      <span title={`User ID: ${user.id}`}>{users[0].id === user.id ? "Me" : user.name}</span>
    </div>
  );
};
