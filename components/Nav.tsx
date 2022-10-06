import React from "react";
import RoomLink from "./RoomLink";

export const Nav = () => {
  return (
    <nav className="flex justify-end text-2xl min-h-[50px]">
      <RoomLink />
    </nav>
  );
};
