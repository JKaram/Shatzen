import { CogIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import React from "react";

export default function OptionsButton(props: { onClick: () => void }) {
  return (
    <button
      className={classNames(
        "flex flex-col w-28  items-center px-2 text-base text-black"
      )}
      onClick={props.onClick}
    >
      <CogIcon className={`relative h-9 w-9 text-black}`} />
      Options
    </button>
  );
}
