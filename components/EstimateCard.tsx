import { SocketContext } from "./provider/SocketProvider";
import React, { useContext } from "react";

type Props = {
  isSelected: boolean;
  onClick: () => void;
  children: any;
};

export const EstimateCard = ({ isSelected, onClick, children }: Props) => {
  const { roomStatus } = useContext(SocketContext);

  return (
    <button
      disabled={roomStatus === "revealing"}
      onClick={onClick}
      className={` ${isSelected ? "bg-green-100 hover:bg-green-100" : "bg-gray-100"}`}
    >
      {children}
    </button>
  );
};
