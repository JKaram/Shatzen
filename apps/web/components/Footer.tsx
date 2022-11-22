import React from "react";

export default function Footer() {
  return (
    <footer className="h-12 flex p-1 justify-end items-end fixed w-full bottom-0 left-0 text-gray-500">
      <span>
        Contact me at&nbsp;
        <a
          className="hover:text-black transition"
          href="mailto:hello@jamiekaram.dev"
        >
          hello@jamiekaram.dev
        </a>
      </span>
    </footer>
  );
}
