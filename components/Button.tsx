import React from "react";
import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
};

export default function Button({ children, disabled = false, onClick }: Props) {
  return (
    <button
      className={classNames(
        "py-2 bg-white border-2 border-black rounded-md w-44 transition active:translate-y-0 hover:-translate-y-0.5",
        disabled ? "opacity-75 hover:translate-y-0 " : ""
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
