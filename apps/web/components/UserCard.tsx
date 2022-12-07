import { numberToNewValue, USER_CARD_PATTERNS } from "../types/constants";
import { useSockets } from "../providers/SocketProvider";
import { User } from "../types/aliases";
import React from "react";
import classNames from "classnames";

type Props = {
  user: User;
};

export const UserCard = ({ user }: Props) => {
  const { roomStatus } = useSockets();
  const { estimate } = user;

  const userHasEstimated = estimate !== null;

  return (
    <div className="flex flex-col items-center">
      {userHasEstimated ? (
        <div
          className={classNames("card", "w-10 h-16 bg-transparent")}
          style={{ perspective: 1000 }}
        >
          <div
            className={classNames(
              "card-inner",
              "relative w-full h-full",
              "transition transform duration-500",
            )}
            style={{ transformStyle: "preserve-3d", transform: roomStatus === 'revealing' ? 'rotateY(180deg)' : undefined }}
          >
            <div
              className={classNames(
                "card-back",
                "absolute w-full h-full bg-white rounded flex justify-center items-center",
                estimate ? "border-2 border-black" : "shadow-inset bg-[#d0d0d0]"
              )}
              style={{
                backgroundImage:
                  user.pattern >= 0 &&
                  `url("${USER_CARD_PATTERNS[user.pattern]}")`,
                backgroundColor: user?.colour,
                backfaceVisibility: "hidden"
              }}
            />
            <div
              className={classNames(
                "card-front",
                "absolute w-full h-full bg-white rounded flex justify-center items-center border-2 border-black"
              )}
              style={{
                borderColor: user?.colour,
                backfaceVisibility: "hidden",
                transform: 'rotateY(180deg)'
              }}
            >
              <span className={classNames("text-center font-bold text-xl")}>
                {estimate ? numberToNewValue(estimate) : null}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={classNames(
            "no-card",
            "w-10 h-16 bg-[#d0d0d0] shadow-inset rounded flex justify-center items-center"
          )}
        />
      )}
      <span className={classNames("px-2 mt-2")} title={`User ID: ${user.id}`}>
        {user.name}
      </span>
    </div>
  );
};
