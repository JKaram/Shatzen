import classNames from "classnames";
import React from "react";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  [x: string]: any;
};

export default function Input({
  onChange,
  placeholder = undefined,
  className = undefined,
  ...rest
}: Props) {
  return (
    <input
      {...rest}
      className={classNames(
        "p-2 text-center border-2 border-black rounded-lg focus:border-red-500 focus:outline-none",
        className
      )}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
