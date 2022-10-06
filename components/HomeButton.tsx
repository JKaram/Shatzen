import { HomeIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React from "react";

export default function HomeButton() {
  const router = useRouter();

  function goHome() {
    router.push("/");
  }

  return (
    <button className="flex flex-col items-center px-2 text-base text-gray-500 hover:text-black" onClick={goHome}>
      <HomeIcon className="h-9 w-9" />
      Home
    </button>
  );
}
