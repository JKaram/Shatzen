import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import OptionsModal from "./Options/OptionsModal";
import { CogIcon, ShareIcon } from "@heroicons/react/solid";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import { useSockets } from "./provider/SocketProvider";
import { motion } from "framer-motion";

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

  const roomPage = !router.pathname.includes("/room/");

  return (
    <>
      <OptionsModal show={show} close={closeOptions} />

      <nav
        className={classNames(
          "flex justify-between text-2xl fixed h-12 left-0 top-0 w-full p-2"
        )}
      >
        <h1 className="cursor-pointer font-bold text-3xl" onClick={goHome}>
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
              <NavButton type="options" onClick={openOptions} />
              <NavButton type="share" />
            </motion.div>
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
      <div className="">
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
          <span className="text-sm text-center absolute right-1 top-12">
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
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white border-2 border-black"
    >
      {NavButtonTypes[type].icon}
    </button>
  );
}

export default Nav;
