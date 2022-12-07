import { useSockets } from "../providers/SocketProvider";
import classNames from "classnames";
import React from "react";
import { UpArrow } from "./UpArrow";

type Props = {
  children: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
};

export const EstimateCard = ({ children, isSelected, onClick }: Props) => {
  const { roomStatus, user } = useSockets();
  const isDisabled = roomStatus === "revealing";
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
    <button
      disabled={isDisabled}
      onClick={onClick}
      style={{
        borderColor: user?.colour,
      }}
      className={classNames(
        'bg-white font-bold text-lg h-16 w-10 rounded-lg border-2',
        'active:translate-x-0 active:translate-y-0 active:shadow-none',
        'hover:shadow-base transition hover:-translate-x-1 hover:-translate-y-1',
        isSelected ? "-translate-y-3 hover:-translate-y-3" : undefined,
        isDisabled
          ? "opacity-50 hover:shadow-none hover:translate-x-0 hover:translate-y-0 "
          : undefined
      )}
    >
      {children}
    </button>
    {isSelected && <UpArrow />}
    </div>
  );
};
