import { SocketContext } from "./provider/SocketProvider";
import classNames from "classnames";
import React, { useContext } from "react";

type Props = {
  children: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
};

export const EstimateCard = ({ children, isSelected, onClick }: Props) => {
  const { roomStatus, user } = useContext(SocketContext);
  const isDisabled = roomStatus === "revealing";
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={classNames(
        "bg-white h-16 w-10 rounded-lg border-2 active:translate-x-0 active:translate-y-0 active:shadow-none border-black hover:shadow-base transition hover:-translate-x-1 hover:-translate-y-1 ",
        isSelected ? "bg-green-100 hover:bg-green-100" : "",
        isDisabled && "opacity-50 hover:shadow-none hover:translate-x-0 hover:translate-y-0 "
      )}
      style={{ background: user?.colour }}
    >
      {children}
    </button>
  );
};
