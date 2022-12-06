import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CogIcon, ShareIcon, ArrowUpIcon } from "@heroicons/react/solid";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import { useSockets } from "../providers/SocketProvider";
import { motion } from "framer-motion";
import { useModal } from "../providers/ModalProvider";

export const Nav = () => {
  const { removeUser } = useSockets();
  const { open } = useModal();
  const router = useRouter();

  function goHome() {
    if (router.route.includes("/room/")) {
      removeUser();
    }
    router.push("/");
  }

  const roomPage = !router.pathname.includes("/room/");

  return (
    <nav
      className={classNames(
        "flex z-20 justify-between bg-transparent text-2xl fixed h-12 left-0 top-0 w-full p-2"
      )}
    >
      <h1 className="text-3xl font-bold cursor-pointer" onClick={goHome}>
        Shatzën
      </h1>

      {!roomPage && (
        <>
          <motion.div
            className="flex gap-2"
            key={router.route}
            initial="initial"
            animate="animate"
            variants={{
              initial: {
                opacity: 0,
                x: 100,
              },
              animate: {
                opacity: 1,
                x: 0,
              },
            }}
            exit={{ opacity: 0, x: 100 }}
          >
            <NavButton type="options" onClick={open} />
            <NavButton type="share" />
          </motion.div>
        </>
      )}
    </nav>
  );
};

const NavButtonTypes = {
  options: { icon: <CogIcon className="w-6 h-6" />, title: "Options" },
  share: { icon: <ShareIcon className="w-6 h-6" />, title: "Copy room link." },
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
  const { users } = useSockets();
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
      <div className="relative">
        {users.length <= 1 && (
          <div className="absolute flex text-center -bottom-20 right-16">
            <span className="text-lg leading-tight whitespace-nowrap">
              You look lonely
              <br />
              Invite your team
            </span>
            <ArrowUpIcon className="absolute w-6 h-6 rotate-45 -right-5 -top-5 animate-arrow-anim" />
          </div>
        )}
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
          <span className="absolute text-sm text-center right-1 top-12">
            {copied ? (
              <>
                Link
                <br />
                Copied!
              </>
            ) : null}
          </span>
        ) : null}
      </div>
    );

  return (
    <button
      onClick={onClick}
      title={NavButtonTypes[type].title}
      className="inline-flex items-center justify-center w-10 h-10 bg-white border-2 border-black rounded-full"
    >
      {NavButtonTypes[type].icon}
    </button>
  );
}

export default Nav;
