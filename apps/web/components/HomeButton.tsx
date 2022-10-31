import { HomeIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React from "react";
import { useSockets } from "./Provider/SocketProvider";

export default function HomeButton() {
  const { removeUser } = useSockets();
  const router = useRouter();

  function goHome() {
    router.push("/");
    if (router.route.includes("/room/")) {
      removeUser();
    }
  }

  return (
    <button
      className="flex flex-col items-center px-2 text-base text-black hover:text-black"
      onClick={goHome}
    >
      <HomeIcon className="h-9 w-9" />
      Home
    </button>
  );
}
