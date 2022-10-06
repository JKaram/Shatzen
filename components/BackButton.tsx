import { ArrowLeftIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React from "react";
import { useSockets } from "./provider/SocketProvider";

export default function BackButton() {
  const { removeUser } = useSockets();
  const router = useRouter();

  function goHome() {
    router.push("/");
    removeUser();
  }

  return (
    <button className="flex items-center px-2 text-base text-gray-500 hover:text-black" onClick={goHome}>
      <ArrowLeftIcon className="w-5 h-5" />
      Back
    </button>
  );
}
