import React from "react";
import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
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
  variant,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={classNames(
        "base-button",
        disabled && "disabled-button",
        variant === "secondary"
          ? "border-0 hover:translate-y-0 hover:bg-slate-100"
          : undefined,
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
