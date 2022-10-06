import React, { useEffect, useState } from "react";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import { ClipboardCopyIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import classNames from "classnames";

export default function RoomLink() {
  const router = useRouter();
  const [, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) setCopied(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <button
      className={classNames("flex flex-col w-28  items-center px-2 text-base text-gray-500 hover:text-black")}
      onClick={() => {
        setCopied(true);
        copy(`https://${window.location.hostname}${router.asPath}`);
      }}
    >
      <ClipboardCopyIcon className={`relative h-9 w-9 text-black}`} />
      {copied && <span className="min-w-full">Copied!</span>}
      {!copied && <span className="min-w-full">Share room</span>}
    </button>
  );
}
