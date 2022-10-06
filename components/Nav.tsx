import classNames from "classnames";
import { useRouter } from "next/router";
import React from "react";
import BackButton from "./BackButton";
import Button from "./Button";
import RoomLink from "./RoomLink";

export const Nav = () => {
  const router = useRouter();

  const hidden = !router.pathname.includes("/room/");

  return (
    <nav className={classNames("flex justify-between text-2xl min-h-[50px]")}>
      {!hidden && (
        <>
          <BackButton />
          <RoomLink />
        </>
      )}
    </nav>
  );
};
