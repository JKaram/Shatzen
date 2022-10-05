import React from "react";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export default function Input({ onChange, placeholder = undefined }: Props) {
  return (
    <input
      className="p-2 border-2 border-black rounded-lg w-44 focus:border-red-500 focus:outline-none"
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
