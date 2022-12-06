import classNames from "classnames";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Container = (props: Props) => {
  return (
    <div
      className={classNames(
        "p-8 bg-white border-2 border-black rounded-lg shadow-base",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export default Container;
