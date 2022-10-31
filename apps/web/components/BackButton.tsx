import { UserIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React from "react";
import { useSockets } from "./Provider/SocketProvider";

export default function BackButton() {
  const { removeUser } = useSockets();
  const router = useRouter();

  function goBack() {
    if (router.query.room) {
      router.push(`/login/${router.query.room}`);
    } else {
      router.push("/");
    }
    removeUser();
  }

  return (
    <button
      className="flex flex-col items-center px-2 text-base text-black hover:text-black"
      onClick={goBack}
    >
      <UserIcon className="w-9 h-9" />
      <span>Rename</span>
    </button>
  );
}
