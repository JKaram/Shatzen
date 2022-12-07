import classNames from "classnames";
import React from "react";

type Props = {
  size?: "small" | "medium" | "large";
};

export const Spacer = (props: Props) => {
  return (
    <div
      className={classNames(
        "w-full h-10",
        props.size === "small" && "h-6",
        props.size === "medium" && "h-10",
        props.size === "large" && "h-12"
      )}
    />
  );
};
