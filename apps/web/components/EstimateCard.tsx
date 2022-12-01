import { useSockets } from "./provider/SocketProvider";
import classNames from "classnames";
import React from "react";
import { USER_CARD_PATTERNS } from "../types/constants";

type Props = {
  children: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
};

export const EstimateCard = ({ children, isSelected, onClick }: Props) => {
  const { roomStatus, user } = useSockets();
  const isDisabled = roomStatus === "revealing";
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      style={{
        backgroundImage:
          user.pattern >= 0
            ? `url("${USER_CARD_PATTERNS[user.pattern]}")`
            : undefined,
        backgroundColor: user?.colour,
      }}
      className={classNames(
        "bg-slate-500 h-16 w-10 rounded-lg border-2 active:translate-x-0 active:translate-y-0 active:shadow-none border-black hover:shadow-base transition hover:-translate-x-1 hover:-translate-y-1 ",
        isSelected ? "bg-green-100 hover:bg-green-100" : undefined,
        isDisabled
          ? "opacity-50 hover:shadow-none hover:translate-x-0 hover:translate-y-0 "
          : undefined
      )}
    >
      <span className="w-10 h-10 font-bold text-center bg-white rounded-full">
        {children}
      </span>
    </button>
  );
};
