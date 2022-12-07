import classNames from "classnames";
import React from "react";
import { HeroIconOutline } from "./HeroIcon";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  icon?: string;
  [x: string]: any;
};

export default function Input({
  onChange,
  placeholder = undefined,
  className = undefined,
  label = undefined,
  icon = undefined,
  ...rest
}: Props) {
  return (
    <div>
      {label && (
        <label
          htmlFor={label}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="relative mt-1">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
            <HeroIconOutline icon={icon} className="w-5 h-5" />
          </div>
        )}
        <input
          {...rest}
          name={label}
          className={classNames(
            "text-center py-2 border-2 border-black rounded-lg focus:border-red-500 focus:outline-none",
            className
          )}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
