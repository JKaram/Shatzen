import { ArrowLeftIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { SocketContext, useSockets } from "./provider/SocketProvider";

export default function BackButton() {
  const { user } = useContext(SocketContext);

  const { removeUser } = useSockets();
  const router = useRouter();

  function goBack() {
    if (user?.room) {
      router.push(`/login/${user.room}`);
    } else {
      router.push("/");
    }
    removeUser();
  }

  return (
    <button className="flex items-center px-2 text-base text-gray-500 hover:text-black" onClick={goBack}>
      <ArrowLeftIcon className="w-5 h-5" />
      Back
    </button>
  );
}
