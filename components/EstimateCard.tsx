import React, { useContext } from "react";
import { SocketContext } from "./provider/SocketProvider";

type Props = {
  isSelected: boolean;
  onClick: () => void;
  children: any;
};

export const EstimateCard = ({ isSelected, onClick, children }: Props) => {
  const { status } = useContext(SocketContext);

  return (
    <button
      disabled={status === "revealing"}
      onClick={onClick}
      className={` ${isSelected ? "bg-green-100 hover:bg-green-100" : "bg-gray-100"}`}
    >
      {children}
    </button>
  );
};
