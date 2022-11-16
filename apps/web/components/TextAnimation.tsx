import React, { useEffect } from "react";
import { USER_COLOURS } from "../types/constants";

export default function TextAnimation() {
  const [text, setText] = React.useState("Fun.");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setText((text) => {
        if (text === "Fun.") return "Simple.";
        if (text === "Simple.") return "Fun.";
        return "Fun.";
      });
    }, 6000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const textArray = text.split("");

  return (
    <span
      style={{
        background:
          USER_COLOURS[Math.floor(Math.random() * USER_COLOURS.length)],
      }}
      className="animate-text-anim bg-red-500 px-1 rounded"
    >
      {textArray.map((item, index) => (
        <span key={index}>{item}</span>
      ))}
    </span>
  );
}
