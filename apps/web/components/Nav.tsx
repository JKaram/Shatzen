import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import HomeButton from "./HomeButton";
import OptionsModal from "./Options/OptionsModal";
import OptionsButton from "./OptionsButton";
import RoomLink from "./RoomLink";
import { CogIcon, ShareIcon } from "@heroicons/react/solid";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import { useSockets } from "./provider/SocketProvider";

export const Nav = () => {
  const { removeUser } = useSockets();
  const router = useRouter();
  const [show, setShow] = React.useState(false);

  function closeOptions() {
    setShow(false);
  }
  function openOptions() {
    setShow(true);
  }

  function goHome() {
    if (router.route.includes("/room/")) {
      removeUser();
    }
    router.push("/");
  }

  const roomLogin = router.pathname.includes("/login/");
  const roomPage = !router.pathname.includes("/room/");

  return (
    <>
      <OptionsModal show={show} close={closeOptions} />
      <nav
        className={classNames(
          "flex justify-between text-2xl min-h-[100px] p-2"
        )}
      >
        <h1 className="cursor-pointer" onClick={goHome}>
          Shatzën
        </h1>

        {!roomPage && (
          <>
            <div className="flex gap-2">
              <NavButton type="options" onClick={openOptions} />
              <NavButton type="share" />
            </div>
          </>
        )}
      </nav>
    </>
  );
};

const NavButtonTypes = {
  options: { icon: <CogIcon className="h-6 w-6" />, title: "Options" },
  share: { icon: <ShareIcon className="h-6 w-6" />, title: "Copy room link." },
};

type ButtonTypes = keyof typeof NavButtonTypes;

function NavButton({
  onClick,
  type,
}: {
  onClick?: () => void;
  type: ButtonTypes;
}) {
  const router = useRouter();
  const [, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) setCopied(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [copied]);

  if (type === "share")
    return (
      <div className="flex flex-col items-center">
        <button
          onClick={() => {
            setCopied(true);
            copy(
              `https://${window.location.hostname}/login/${router.query.room}`
            );
          }}
          title={NavButtonTypes[type].title}
          className={classNames(
            "inline-flex h-10 w-10 items-center justify-center rounded-full bg-white border-2 border-black transition-all",
            copied ? " bg-green-500" : undefined
          )}
        >
          {NavButtonTypes[type].icon}
        </button>
        {type === "share" ? (
          <span className="text-sm absolute top-12">
            {copied ? "Link Copied!" : null}
          </span>
        ) : null}
      </div>
    );

  return (
    <button
      onClick={onClick}
      title={NavButtonTypes[type].title}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white border-2 border-black"
    >
      {NavButtonTypes[type].icon}
    </button>
  );
}

export default Nav;
