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
      className={classNames("flex text-slate-600 text-lg px-2 items-center")}
      onClick={() => {
        setCopied(true);
        copy(`${window.location.hostname}${router.asPath}`);
      }}
    >
      <ClipboardCopyIcon className={`h-4 w-4 text-black}`} />
      {copied && <span className="text-spacepink">copied</span>}
      {!copied && <span>share room</span>}
    </button>
  );
}
