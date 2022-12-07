import React from "react";

export default function Footer() {
  return (
    <footer className="bottom-0 left-0 flex items-end justify-end w-full h-12 p-1 text-gray-500">
      <span>
        Contact me at&nbsp;
        <a
          className="transition hover:text-black"
          href="mailto:hello@jamiekaram.dev"
        >
          hello@jamiekaram.dev
        </a>
      </span>
    </footer>
  );
}
