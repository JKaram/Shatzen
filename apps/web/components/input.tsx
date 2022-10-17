import React from "react";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  [x: string]: any;
};

export default function Input({
  onChange,
  placeholder = undefined,
  ...rest
}: Props) {
  return (
    <input
      {...rest}
      className="p-2 border-2 border-black rounded-lg w-full max-w-[13rem] mx-auto focus:border-red-500 focus:outline-none"
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
