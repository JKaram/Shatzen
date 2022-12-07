import classNames from "classnames";
import React from "react";
import { UserStorage } from "../types/aliases";
import { USER_CARD_PATTERNS, USER_COLOURS } from "../types/constants";

type Props = {
  selected: UserStorage;
  setSelected: (User) => void;
};

export default function CardBuilder(props: Props) {
  const { selected, setSelected } = props;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="block text-sm font-medium text-gray-700">
        Customize your card back
      </h1>
      <div
        style={{
          backgroundColor: selected.colour,
          backgroundImage: `url("${USER_CARD_PATTERNS[selected.pattern]}")`,
        }}
        className={classNames(
          "w-10 m-auto h-16 border-2 border-black rounded-lg"
        )}
      />
      <div className="flex justify-evenly">
        {USER_COLOURS.map((colour) => (
          <div
            key={colour}
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
        <div
          onClick={() => setSelected({ ...selected, pattern: -1 })}
          className={classNames(
            "w-10 h-16 border-2 bg-white rounded-lg",
            selected.pattern === -1 ? "border-black" : "border-gray"
          )}
        />

        {USER_CARD_PATTERNS.map((pattern, index) => (
          <div
            onClick={() => setSelected({ ...selected, pattern: index })}
            style={{ backgroundImage: `url("${USER_CARD_PATTERNS[index]}")` }}
            key={pattern}
            className={classNames(
              "w-10 h-16 border-2 bg-white rounded-lg",
              selected.pattern === index ? "border-black" : "border-gray"
            )}
          />
        ))}
      </div>
    </div>
  );
}
