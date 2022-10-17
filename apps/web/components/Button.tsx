import React from "react";
import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  className?: string | undefined;
  disabled?: boolean;
  onClick?: () => void;
  [x: string]: any;
};

export default function Button({
  children,
  className = undefined,
  disabled = false,
  onClick,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={classNames(
        "py-2 bg-white border-2 border-black rounded-md w-full max-w-[13rem] transition active:translate-y-0 hover:-translate-y-0.5 mx-auto",
        disabled ? "opacity-50 hover:translate-y-0 " : "",
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
