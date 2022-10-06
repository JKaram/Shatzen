import { HomeIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { useRouter } from "next/router";
import React from "react";
import BackButton from "./BackButton";
import HomeButton from "./HomeButton";
import RoomLink from "./RoomLink";

export const Nav = () => {
  const router = useRouter();

  const roomLogin = router.pathname.includes("/login/");
  const roomPage = !router.pathname.includes("/room/");

  return (
    <nav className={classNames("flex justify-between text-2xl min-h-[100px]")}>
      {roomLogin && <HomeButton />}
      {!roomPage && (
        <>
          <BackButton />
          <RoomLink />
        </>
      )}
    </nav>
  );
};
