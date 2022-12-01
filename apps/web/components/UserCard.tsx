import { numberToNewValue, USER_CARD_PATTERNS } from "../types/constants";
import { useSockets } from "./provider/SocketProvider";
import { User } from "../types/aliases";
import React from "react";
import classNames from "classnames";

type Props = {
  user: User;
  oddManOut: boolean;
};

const shameEmojis = ["🤥", "🤮", "🙊", "💩"];

export const UserCard = ({ user, oddManOut }: Props) => {
  const { roomStatus } = useSockets();
  const { estimate } = user;

  const randomIndex = () => Math.floor(Math.random() * shameEmojis.length);

  const userHasEstimated = estimate !== null;

  return (
    <div className="flex flex-col items-center">
      {roomStatus === "revealing" && oddManOut && shameEmojis[randomIndex()]}
      <div
        className={classNames(
          "w-10 h-16 rounded flex justify-center items-center",
          estimate ? "border-2 border-black" : "shadow-inset bg-[#d0d0d0]"
        )}
        style={{
          backgroundImage:
            user.pattern >= 0 && userHasEstimated
              ? `url("${USER_CARD_PATTERNS[user.pattern]}")`
              : undefined,
          backgroundColor: userHasEstimated ? user?.colour : undefined,
        }}
      >
        <span
          className={classNames(
            roomStatus === "estimating" && estimate !== -4 ? "hidden" : "block"
          )}
        >
          {estimate ? numberToNewValue(estimate) : null}
        </span>
      </div>
      <span
        style={{ background: user.colour }}
        className={classNames("px-2 mt-2")}
        title={`User ID: ${user.id}`}
      >
        {user.name}
      </span>
    </div>
  );
};
