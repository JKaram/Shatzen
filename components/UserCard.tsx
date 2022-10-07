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

  const userHasEstimated = users[0].id === user.id && estimate !== null;

  return (
    <div className="flex flex-col items-center">
      {roomStatus === "revealing" && oddManOut && shameEmojis[randomIndex()]}
      <div
        style={{ background: userHasEstimated ? user.colour : !!estimate ? user.colour : undefined }}
        className={classNames(
          "w-10 h-16 rounded flex justify-center items-center",
          !!estimate ? "border-2 border-black" : "shadow-inset bg-[#beb470]",
          userHasEstimated ? "bg-green-200" : undefined
        )}
      >
        <span className={classNames(roomStatus === "estimating" ? "hidden" : "")}>
          {estimate ? numberToNewValue(estimate) || estimate : null}
        </span>
      </div>
      <span style={{ background: user.colour }} className={classNames("px-2 mt-2")} title={`User ID: ${user.id}`}>
        {user.name}
      </span>
    </div>
  );
};
