import React from "react";

type Props = {
  children: React.ReactNode;
  disabled: boolean;
  onClick: () => void;
};

export default function Button({ children, disabled, onClick }: Props) {
  return (
    <button
      className="py-2 bg-white border-2 border-black rounded-lg w-44 transition active:translate-y-0 hover:-translate-y-0.5 "
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
