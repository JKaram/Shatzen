import classNames from "classnames";
import React from "react";
import { USER_CARD_PATTERNS, USER_COLOURS } from "../types/constants";

type Props = {
  selected: any;
  setSelected: any;
};

export default function CardBuilder(props: Props) {
  const { selected, setSelected } = props;

  return (
    <div>
      <div
        style={{
          backgroundColor: selected.colour,
          backgroundImage: `url("${USER_CARD_PATTERNS[selected.pattern]}")`,
        }}
        className={classNames("w-10 h-16 border-2 border-black rounded-lg")}
      />
      <div className="flex justify-evenly">
        {USER_COLOURS.map((colour) => (
          <div
            onClick={() => setSelected({ ...selected, colour })}
            style={{ backgroundColor: colour }}
            className={classNames(
              "w-10 h-10 rounded-full border-2",
              selected.colour === colour ? " border-black" : "border-white"
            )}
          />
        ))}
      </div>
      <div className="flex justify-evenly">
        {USER_CARD_PATTERNS.map((pattern, index) => (
          <div
            onClick={() => setSelected({ ...selected, pattern: index })}
            style={{ backgroundImage: `url("${USER_CARD_PATTERNS[index]}")` }}
            key={pattern}
            className={classNames(
              "w-10 h-16 border-2 bg-white rounded-lg",
              selected.pattern === pattern ? " border-black" : "border-white"
            )}
          />
        ))}
      </div>
    </div>
  );
}
