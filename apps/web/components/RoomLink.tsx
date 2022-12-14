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
      className={classNames(
        "flex flex-col w-28 items-center px-2 text-base text-black"
      )}
      onClick={() => {
        setCopied(true);
        copy(`https://${window.location.hostname}/login/${router.query.room}`);
      }}
    >
      <ClipboardCopyIcon className="relative text-black h-9 w-9" />
      {copied && <span className="min-w-full">Copied!</span>}
      {!copied && <span className="min-w-full">Share room</span>}
    </button>
  );
}
