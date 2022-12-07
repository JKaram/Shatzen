import { numberToNewValue, USER_CARD_PATTERNS } from "../types/constants";
import { useSockets } from "../providers/SocketProvider";
import { User } from "../types/aliases";
import React from "react";
import classNames from "classnames";

type Props = {
  user: User;
};

export const UserCard = ({ user }: Props) => {
  const { roomStatus, user: currentUser } = useSockets();
  const { estimate } = user;

  const userHasEstimated = estimate !== null;

  return (
    <div className="flex flex-col items-center">
      <div
        className={classNames(
          "w-10 h-16 bg-white rounded flex justify-center items-center",
          estimate ? "border-2 border-black" : "shadow-inset bg-[#d0d0d0]"
        )}
        style={{
          backgroundImage:
            user.pattern >= 0 && userHasEstimated && roomStatus === 'estimating'
              ? `url("${USER_CARD_PATTERNS[user.pattern]}")`
              : undefined,
          backgroundColor: userHasEstimated && roomStatus === 'estimating' ? user?.colour : undefined,
          borderColor: roomStatus === 'revealing' ? user?.colour : undefined
        }}
      >
        <span
          className={classNames(
            "text-center font-bold text-xl",
            roomStatus === "estimating"
              ? "hidden"
              : "block"
          )}
        >
          {estimate ? numberToNewValue(estimate) : null}
        </span>
      </div>
      <span
        className={classNames("px-2 mt-2")}
        title={`User ID: ${user.id}`}
      >
        {user.name}
      </span>
    </div>
  );
};
